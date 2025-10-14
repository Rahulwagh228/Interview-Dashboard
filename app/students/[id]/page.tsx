'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/app/students/types/user";
import Link from 'next/link';
import styles from './studentDetails.module.scss';

const StudentDetailsPage = () => {
  const params = useParams();
  const studentId = params.id as string;
  const [student, setStudent] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
              <img 
                src={student.image} 
                alt={`${student.firstName} ${student.lastName}`}
                className={styles.profileImage}
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
        </div>

        {/* Main Content - Single Column */}
        <div className={styles.mainContent}>
          {/* Basic Information */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>👤</div>
              <h3 className={styles.cardTitle}>Basic Information</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>👤</span>
                  Full Name
                </span>
                <span className={styles.value}>
                  {student.firstName} {student.maidenName} {student.lastName}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🏷️</span>
                  Username
                </span>
                <span className={styles.value}>{student.username}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🎂</span>
                  Age
                </span>
                <span className={styles.value}>{student.age} years</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>⚧️</span>
                  Gender
                </span>
                <span className={styles.value}>{student.gender}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>📅</span>
                  Birth Date
                </span>
                <span className={styles.value}>
                  {new Date(student.birthDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🩸</span>
                  Blood Group
                </span>
                <span className={styles.value}>{student.bloodGroup}</span>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🏃‍♂️</div>
              <h3 className={styles.cardTitle}>Physical Attributes</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>📏</span>
                  Height
                </span>
                <span className={styles.value}>{student.height} cm</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>⚖️</span>
                  Weight
                </span>
                <span className={styles.value}>{student.weight} kg</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>👁️</span>
                  Eye Color
                </span>
                <span className={styles.value}>{student.eyeColor}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>💇‍♂️</span>
                  Hair
                </span>
                <span className={styles.value}>
                  {student.hair.color} {student.hair.type}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📧</div>
              <h3 className={styles.cardTitle}>Contact Information</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>✉️</span>
                  Email
                </span>
                <span className={styles.value}>{student.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>�</span>
                  Phone
                </span>
                <span className={styles.value}>{student.phone}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🏠</div>
              <h3 className={styles.cardTitle}>Address</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🏠</span>
                  Street
                </span>
                <span className={styles.value}>{student.address.address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🏙️</span>
                  City
                </span>
                <span className={styles.value}>{student.address.city}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🗺️</span>
                  State
                </span>
                <span className={styles.value}>{student.address.state}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>📮</span>
                  Postal Code
                </span>
                <span className={styles.value}>{student.address.postalCode}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🌍</span>
                  Country
                </span>
                <span className={styles.value}>{student.address.country}</span>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🎓</div>
              <h3 className={styles.cardTitle}>Academic Information</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>�</span>
                  University
                </span>
                <span className={styles.value}>{student.university}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>
                  <span className={styles.labelIcon}>🎭</span>
                  Role
                </span>
                <span className={styles.value}>{student.role}</span>
              </div>
            </div>
          </div>

          {/* Company Information */}
          {student.company && (
            <div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🏢</div>
                <h3 className={styles.cardTitle}>Company Information</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>
                    <span className={styles.labelIcon}>🏢</span>
                    Company
                  </span>
                  <span className={styles.value}>{student.company.name}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>
                    <span className={styles.labelIcon}>🏬</span>
                    Department
                  </span>
                  <span className={styles.value}>{student.company.department}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.label}>
                    <span className={styles.labelIcon}>💼</span>
                    Title
                  </span>
                  <span className={styles.value}>{student.company.title}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;