"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface UserData {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role: 'ta_member' | 'ta_admin' | 'panelist';
  token?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage on component mount
    const getUserData = () => {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUser(parsedData);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('userData'); // Clear corrupted data
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  const getUserRole = (): string => {
    return user?.role || 'ta_member'; // Default to ta_member if no role found
  };

  const isAuthenticated = (): boolean => {
    return !!user;
  };


  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    router.push('/login');
  };

  const getRoleDisplayName = (): string => {
    const role = getUserRole();
    switch (role) {
      case 'ta_admin':
        return 'TA Admin';
      case 'ta_member':
        return 'TA Member';
      case 'panelist':
        return 'Panelist';
      default:
        return 'User';
    }
  };

  const getUserDisplayName = (): string => {
    if (!user) return 'User';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    return user.username || 'User';
  };

  return {
    user,
    isLoading,
    getUserRole,
    isAuthenticated,
    logout,
    getRoleDisplayName,
    getUserDisplayName
  };
};