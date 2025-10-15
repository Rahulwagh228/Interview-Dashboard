import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import styles from './FeedbackForm.module.scss';

// Define the shape of our form values using TypeScript interface
interface FeedbackFormValues {
  overallScore: number | '';
  strengths: string;
  areasForImprovement: string;
}

// Props interface for the component
interface FeedbackFormProps {
  studentId: string;
  studentName: string;
  onSubmissionSuccess?: () => void;
}

// Yup validation schema - this defines all our form validation rules
const validationSchema = Yup.object({
  overallScore: Yup.number()
    .required('Overall score is required')
    .min(1, 'Score must be at least 1')
    .max(10, 'Score must be at most 10')
    .integer('Score must be a whole number'),
  strengths: Yup.string()
    .required('Strengths field is required')
    .min(10, 'Please provide at least 10 characters')
    .max(500, 'Strengths should not exceed 500 characters'),
  areasForImprovement: Yup.string()
    .required('Areas for improvement field is required')
    .min(10, 'Please provide at least 10 characters')
    .max(500, 'Areas for improvement should not exceed 500 characters'),
});

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  studentId, 
  studentName, 
  onSubmissionSuccess 
}) => {
  // Initial form values
  const initialValues: FeedbackFormValues = {
    overallScore: '',
    strengths: '',
    areasForImprovement: '',
  };

  // Form submission handler
  const handleSubmit = async (
    values: FeedbackFormValues,
    { setSubmitting, resetForm }: FormikHelpers<FeedbackFormValues>
  ) => {
    try {
      // Get API base URL from environment variables
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      // Prepare the feedback data for submission
      const feedbackData = {
        title: `Feedback for ${studentName} (ID: ${studentId})`,
        // body: `Overall Score: ${values.overallScore}/10\n\nStrengths:\n${values.strengths}\n\nAreas for Improvement:\n${values.areasForImprovement}`,
        userId: parseInt(studentId), // Use studentId as userId
        overallScore: values.overallScore,
        strengths: values.strengths,
        areasForImprovement: values.areasForImprovement,
        submittedAt: new Date().toISOString(),
      };

      // Make API call to submit feedback
      const response = await fetch(`${apiBaseUrl}/posts/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(feedbackData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Feedback submission successful:', result);

      // Show success message
      toast.success("Feedback Submitted Successfully!", {
        description: `Feedback for ${studentName} has been saved with ID: ${result.id}`,
        duration: 4000,
      });

      // Reset form after successful submission
      resetForm();
      
      // Call success callback if provided
      onSubmissionSuccess?.();
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "Please try again later.",
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.feedbackFormContainer}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>📝 Student Feedback Form</h3>
        <p className={styles.formSubtitle}>
          Provide feedback for <strong>{studentName}</strong>
        </p>
      </div>

      {/* 
        Formik component wraps our entire form and provides:
        - initialValues: Starting values for form fields
        - validationSchema: Yup schema for validation
        - onSubmit: Function called when form is submitted
        - All form state management (touched, errors, values, etc.)
      */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ 
          isSubmitting, 
          errors, 
          touched, 
          values, 
          isValid, 
          dirty,
          resetForm 
        }) => (
          <Form className={styles.form}>
            {/* Overall Score Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="overallScore" className={styles.label}>
                <span className={styles.labelIcon}>⭐</span>
                Overall Score (1-10)
                <span className={styles.required}>*</span>
              </label>
              
              {/* 
                Field component automatically connects to Formik state
                - name: must match the property in initialValues
                - type: input type
                - className: CSS classes (conditional based on validation state)
              */}
              <Field
                id="overallScore"
                name="overallScore"
                type="number"
                min="1"
                max="10"
                placeholder="Enter score from 1 to 10"
                className={`${styles.input} ${
                  errors.overallScore && touched.overallScore ? styles.inputError : ''
                }`}
              />
              
              {/* 
                ErrorMessage component automatically shows validation errors
                - component: HTML element to wrap the error in
                - className: CSS class for styling
              */}
              <ErrorMessage 
                name="overallScore" 
                component="div" 
                className={styles.errorMessage} 
              />
            </div>

            {/* Strengths Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="strengths" className={styles.label}>
                <span className={styles.labelIcon}>💪</span>
                Strengths
                <span className={styles.required}>*</span>
              </label>
              
              {/* 
                Field with 'as' prop renders as textarea instead of input
                - rows: number of visible text lines
                - placeholder: hint text
              */}
              <Field
                id="strengths"
                name="strengths"
                as="textarea"
                rows={4}
                placeholder="Describe the student's key strengths and positive qualities..."
                className={`${styles.textarea} ${
                  errors.strengths && touched.strengths ? styles.inputError : ''
                }`}
              />
              
              <ErrorMessage 
                name="strengths" 
                component="div" 
                className={styles.errorMessage} 
              />
              
              {/* Character counter */}
              <div className={styles.characterCount}>
                {values.strengths.length}/500 characters
              </div>
            </div>

            {/* Areas for Improvement Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="areasForImprovement" className={styles.label}>
                <span className={styles.labelIcon}>📈</span>
                Areas for Improvement
                <span className={styles.required}>*</span>
              </label>
              
              <Field
                id="areasForImprovement"
                name="areasForImprovement"
                as="textarea"
                rows={4}
                placeholder="Suggest areas where the student can improve..."
                className={`${styles.textarea} ${
                  errors.areasForImprovement && touched.areasForImprovement ? styles.inputError : ''
                }`}
              />
              
              <ErrorMessage 
                name="areasForImprovement" 
                component="div" 
                className={styles.errorMessage} 
              />
              
              {/* Character counter */}
              <div className={styles.characterCount}>
                {values.areasForImprovement.length}/500 characters
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.formActions}>
              {/* 
                Submit button with conditional properties:
                - disabled: prevents submission if form is invalid or currently submitting
                - type="submit": makes this button trigger form submission
                - isSubmitting: Formik provides this to show loading state
              */}
              <Button 
                type="submit" 
                disabled={!isValid || !dirty || isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </Button>
              
              {/* Reset button to clear form */}
              <Button 
                type="button" 
                variant="outline"
                onClick={() => resetForm()}
                disabled={isSubmitting}
                className={styles.cancelButton}
              >
                Cancel
              </Button>
            </div>

            {/* Form validation status indicator */}
            {!isValid && dirty && (
              <div className={styles.validationSummary}>
                <span className={styles.validationIcon}>⚠️</span>
                Please fix the errors above before submitting
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedbackForm;