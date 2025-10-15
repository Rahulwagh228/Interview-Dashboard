"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import TestCredentialsCard from '@/components/loginPageComponent/TestCredentialsCard'
import { testCredentials, type Credential } from '@/components/loginPageComponent/testCredentials'
import { useAuth } from '@/lib/useAuth'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'


// Form validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
  role: Yup.string()
    .required('Role selection is required')
    .oneOf(['ta_member', 'ta_admin', 'panelist'], 'Please select a valid role')
});

// Define form values interface
interface LoginFormValues {
  username: string;
  password: string;
  role: string;
}

const LoginPage = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formikSetFieldValue, setFormikSetFieldValue] = useState<((field: string, value: string) => void) | null>(null);

  const router = useRouter();
  const { hasValidToken, isLoading } = useAuth();

  // Initial form values
  const initialValues: LoginFormValues = {
    username: '',
    password: '',
    role: ''
  };

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (!isLoading && hasValidToken()) {
      toast.info('You are already logged in. Redirecting to dashboard...');
      router.push('/dashboard');
    }
  }, [isLoading, hasValidToken, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const handleCredentialSelect = (credential: Credential) => {
    if (formikSetFieldValue) {
      formikSetFieldValue('username', credential.username);
      formikSetFieldValue('password', credential.password);
      formikSetFieldValue('role', 'ta_member'); // Default role since the credentials don't have role info
      toast.success(`Credentials filled for ${credential.name}`);
    }
  };

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          role: values.role,
          expiresInMins: 30,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const userData = {
        ...data,
        role: values.role 
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      toast.success('Login successful! Redirecting...');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text ">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => {
              // Store setFieldValue function for use by TestCredentialsCard
              if (!formikSetFieldValue) {
                setFormikSetFieldValue(() => setFieldValue);
              }
              
              return (
                <Form>
                  <CardContent className="space-y-4">
                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Username Field */}
                    <div className="space-y-2">
                      <Label htmlFor="username">Username *</Label>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className={`h-11 ${errors.username && touched.username ? 'border-red-500' : ''}`}
                      />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                    </div>
                    
                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`h-11 pr-10 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>
                    
                    {/* Role Field */}
                    <div className="space-y-2">
                      <Label htmlFor="role">Role *</Label>
                      <Select 
                        value={values.role} 
                        onValueChange={(value) => setFieldValue('role', value)}
                      >
                        <SelectTrigger className={`h-11 ${errors.role && touched.role ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ta_member">TA Member</SelectItem>
                          <SelectItem value="ta_admin">TA Admin</SelectItem>
                          <SelectItem value="panelist">Panelist</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-white">Signing In...</span>
                        </div>
                      ) : (
                        <span className="text-white">Sign In</span>
                      )}
                    </Button>
                  </CardFooter>
                </Form>
              );
            }}
          </Formik>
        </Card>

        {/* Test Credentials Section */}
        <TestCredentialsCard 
          credentials={testCredentials}
          onCredentialSelect={handleCredentialSelect}
        />
      </div>
    </div>
  )
}

export default LoginPage