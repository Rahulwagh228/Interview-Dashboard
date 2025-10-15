'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/app/students/types/user";
import { useAuth } from "@/lib/useAuth";
import { toast } from "sonner";
import Link from 'next/link';
import InfoCard, { InfoRow } from "@/components/common/InfoCard";
import cardStyles from "@/components/common/InfoCard.module.scss";
import FeedbackForm from "./FeedbackForm/FeedbackForm";
import styles from './studentDetails.module.scss';

const StudentDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;
  const [student, setStudent] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRestricting, setIsRestricting] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  
  const { getUserRole, hasValidToken, isLoading } = useAuth();
  const userRole = getUserRole();
  const isAdmin = userRole === 'ta_admin';
  const isPanelist = userRole === 'panelist';

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !hasValidToken()) {
      router.push('/login');
    }
  }, [isLoading, hasValidToken, router]);

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/users";
        const response = await fetch(`${apiUrl}/${studentId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: User = await response.json();
        // Add demo restriction status based on student ID
        data.isRestricted = data.id % 5 === 0; // Every 5th student is restricted for demo
        setStudent(data);
      } catch (err) {
        setError('Failed to fetch student details. Please try again.');
        console.error('Error loading student:', err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (redirect is in progress)
  if (!hasValidToken()) {
    return null;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleRestrictStudent = async () => {
    if (!student || !isAdmin) return;
    
    try {
      setIsRestricting(true);
      
      // Simulate a brief loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show toast notification instead of making API call
      toast.info("Feature Coming Soon", {
        description: "Student restriction functionality will be implemented in a future update.",
        duration: 4000,
      });
      
      setDialogOpen(false);
    } catch (error) {
      console.error('Restriction error:', error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsRestricting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingText}>Loading student details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Link href="/students">
            <Button variant="outline" className={styles.backButton}>
              ← Back to Students
            </Button>
          </Link>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <div className={styles.errorMessage}>
              {error || 'Student not found'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        {/* Back Button */}
        <Link href="/students">
          <Button variant="outline" className={styles.backButton}>
            ← Back to Students
          </Button>
        </Link>

        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.profileImageContainer}>
            {student.image ? (
              <Image 
                src={student.image} 
                alt={`${student.firstName} ${student.lastName}`}
                className={styles.profileImage}
                width={120}
                height={120}
                priority
              />
            ) : (
              <div className={styles.profileImagePlaceholder}>
                {getInitials(student.firstName, student.lastName)}
              </div>
            )}
            <div className={styles.onlineIndicator}></div>
          </div>
          
          <h1 className={styles.heroTitle}>
            {student.firstName} {student.lastName}
          </h1>
          <p className={styles.heroSubtitle}>{student.university}</p>
          <p className={styles.heroId}>Student ID: {student.id}</p>
          
          {/* Restriction Status */}
          {student.isRestricted && (
            <div className={styles.restrictionBadge}>
              🚫 Restricted Student
            </div>
          )}
          
          {/* Admin Controls */}
          {isAdmin && (
            <div className={styles.adminControls}>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant={student.isRestricted ? "default" : "destructive"}
                    className={styles.restrictButton}
                  >
                    {student.isRestricted ? "🔓 Unrestrict Student" : "🚫 Restrict Student"}
                  </Button>
                </DialogTrigger>
                <DialogContent className={styles.dialogContent}>
                  <DialogHeader>
                    <DialogTitle>
                      {student.isRestricted ? "Unrestrict Student" : "Restrict Student"}
                    </DialogTitle>
                    <DialogDescription>
                      {student.isRestricted 
                        ? `This is a demo feature. In the actual implementation, this would unrestrict ${student.firstName} ${student.lastName} and restore their system access.`
                        : `This is a demo feature. In the actual implementation, this would restrict ${student.firstName} ${student.lastName} and limit their system access.`
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setDialogOpen(false)}
                      disabled={isRestricting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant={student.isRestricted ? "default" : "destructive"}
                      onClick={handleRestrictStudent}
                      disabled={isRestricting}
                    >
                      {isRestricting 
                        ? "Loading..." 
                        : "Restrict"
                      }
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Main Content - Single Column */}
        <div className={styles.mainContent}>
          {/* Basic Information */}
          <InfoCard icon="👤" title="Basic Information">
            <InfoRow
              icon="👤"
              label="Full Name"
              value={`${student.firstName} ${student.maidenName} ${student.lastName}`}
            />
            <InfoRow
              icon="🏷️"
              label="Username"
              value={student.username}
            />
            <InfoRow
              icon="🎂"
              label="Age"
              value={`${student.age} years`}
            />
            <InfoRow
              icon="⚧️"
              label="Gender"
              value={student.gender}
            />
            <InfoRow
              icon="📅"
              label="Birth Date"
              value={new Date(student.birthDate).toLocaleDateString()}
            />
            <InfoRow
              icon="🩸"
              label="Blood Group"
              value={student.bloodGroup}
            />
            <InfoRow
              icon="🚫"
              label="Account Status"
              value={student.isRestricted ? "Restricted" : "Active"}
              className={student.isRestricted ? cardStyles.restrictedStatus : cardStyles.activeStatus}
            />
          </InfoCard>

          {/* Physical Attributes */}
          <InfoCard icon="🏃‍♂️" title="Physical Attributes">
            <InfoRow
              icon="📏"
              label="Height"
              value={`${student.height} cm`}
            />
            <InfoRow
              icon="⚖️"
              label="Weight"
              value={`${student.weight} kg`}
            />
            <InfoRow
              icon="👁️"
              label="Eye Color"
              value={student.eyeColor}
            />
            <InfoRow
              icon="💇‍♂️"
              label="Hair"
              value={`${student.hair.color} ${student.hair.type}`}
            />
          </InfoCard>

          {/* Contact Information */}
          <InfoCard icon="📧" title="Contact Information">
            <InfoRow
              icon="✉️"
              label="Email"
              value={student.email}
            />
            <InfoRow
              icon="📞"
              label="Phone"
              value={student.phone}
            />
          </InfoCard>

          {/* Address */}
          <InfoCard icon="🏠" title="Address">
            <InfoRow
              icon="🏠"
              label="Street"
              value={student.address.address}
            />
            <InfoRow
              icon="🏙️"
              label="City"
              value={student.address.city}
            />
            <InfoRow
              icon="🗺️"
              label="State"
              value={student.address.state}
            />
            <InfoRow
              icon="📮"
              label="Postal Code"
              value={student.address.postalCode}
            />
            <InfoRow
              icon="🌍"
              label="Country"
              value={student.address.country}
            />
          </InfoCard>

          {/* Academic Information */}
          <InfoCard icon="🎓" title="Academic Information">
            <InfoRow
              icon="🏫"
              label="University"
              value={student.university}
            />
            <InfoRow
              icon="🎭"
              label="Role"
              value={student.role}
            />
          </InfoCard>

          {/* Company Information */}
          {student.company && (
            <InfoCard icon="🏢" title="Company Information">
              <InfoRow
                icon="🏢"
                label="Company"
                value={student.company.name}
              />
              <InfoRow
                icon="🏬"
                label="Department"
                value={student.company.department}
              />
              <InfoRow
                icon="💼"
                label="Title"
                value={student.company.title}
              />
            </InfoCard>
          )}
        </div>

        {/* Feedback Form - Only visible to panelists */}
        {isPanelist && (
          <FeedbackForm 
            studentId={studentId}
            studentName={`${student.firstName} ${student.lastName}`}
            onSubmissionSuccess={() => {
              // Optional: Add any additional logic after successful submission
              console.log('Feedback submitted successfully');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDetailsPage;