'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/app/students/types/user";
import Link from 'next/link';

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
        const response = await fetch(`https://dummyjson.com/users/${studentId}`);
        
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

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading student details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <Link href="/students">
              <Button variant="outline">← Back to Students</Button>
            </Link>
          </div>
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error || 'Student not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <Link href="/students">
            <Button variant="outline">← Back to Students</Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-gray-600">Student ID: {student.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Full Name:</span>
                <span>{student.firstName} {student.maidenName} {student.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Username:</span>
                <span>{student.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{student.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Gender:</span>
                <span>{student.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Birth Date:</span>
                <span>{new Date(student.birthDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Blood Group:</span>
                <span>{student.bloodGroup}</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{student.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{student.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span className="text-right">
                  {student.address.address}, {student.address.city}<br />
                  {student.address.state} {student.address.postalCode}<br />
                  {student.address.country}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Physical Attributes */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span>{student.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Weight:</span>
                <span>{student.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Eye Color:</span>
                <span>{student.eyeColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hair:</span>
                <span>{student.hair.color} {student.hair.type}</span>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">University:</span>
                <span>{student.university}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Role:</span>
                <span>{student.role}</span>
              </div>
              {student.company && (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium">Company:</span>
                    <span>{student.company.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Department:</span>
                    <span>{student.company.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Title:</span>
                    <span>{student.company.title}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Image */}
        {student.image && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={student.image} 
                alt={`${student.firstName} ${student.lastName}`}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsPage;