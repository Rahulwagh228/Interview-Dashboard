'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/sidebar/Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/useDebounce";
import { useAuth } from "@/lib/useAuth";
// import { fetchUsers } from "@/lib/api";
import { User, UsersResponse } from "@/app/students/types/user";

const StudentsPage = () => {
  const router = useRouter();
  const { hasValidToken, isLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const usersPerPage = 10;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !hasValidToken()) {
      router.push('/login');
    }
  }, [isLoading, hasValidToken, router]);

  async function fetchUsers(limit: number = 30, skip: number = 0): Promise<UsersResponse> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/users";
      const response = await fetch(`${apiUrl}?limit=${limit}&skip=${skip}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: UsersResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async function searchUsers(query: string): Promise<UsersResponse> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/search" ;
      const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: UsersResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  const loadUsers = useCallback(async (page: number, query?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let response: UsersResponse;
      
      if (query && query.trim() !== '') {
        setIsSearching(true);
        response = await searchUsers(query.trim());
        // For search results, reset pagination
        setCurrentPage(1);
      } else {
        setIsSearching(false);
        const skip = (page - 1) * usersPerPage;
        response = await fetchUsers(usersPerPage, skip);
      }
      
      setUsers(response.users);
      setTotalUsers(response.total);
      setTotalPages(Math.ceil(response.total / usersPerPage));
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, [usersPerPage]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      loadUsers(1, debouncedSearchQuery);
    } else {
      loadUsers(currentPage);
    }
  }, [debouncedSearchQuery, currentPage, loadUsers]);

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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-3 md:p-6 pb-20 md:pb-6">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm md:text-base text-gray-600">Manage and view all students</p>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="max-w-md">
            <Input
              type="text"
              placeholder="Search students by name, email, username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {isSearching && (
            <p className="text-sm text-blue-600 mt-2">
              Search results for &ldquo;{debouncedSearchQuery}&rdquo;
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading students...</div>
          </div>
        ) : (
          <>
            {/* Unified Table View with horizontal scroll on mobile */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch'
              }}>
                <Table className="border border-gray-300 min-w-full">
                  <TableHeader>
                    <TableRow className="border-b border-gray-300 bg-gray-50">
                      <TableHead className="border-r border-gray-300 min-w-[60px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">ID</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[140px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">Full Name</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[110px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">Username</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[180px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">Email</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[120px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">Phone</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[80px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">Blood Group</TableHead>
                      <TableHead className="min-w-[100px] text-xs md:text-sm font-semibold text-gray-700 px-2 py-3">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium border-r border-gray-300 text-xs md:text-sm px-2 py-3">
                          {user.id}
                        </TableCell>
                        <TableCell className="font-medium border-r border-gray-300 text-xs md:text-sm px-2 py-3">
                          {`${user.firstName} ${user.lastName}`}
                        </TableCell>
                        <TableCell className="border-r border-gray-300 text-xs md:text-sm px-2 py-3">{user.username}</TableCell>
                        <TableCell className="border-r border-gray-300 text-xs md:text-sm px-2 py-3">{user.email}</TableCell>
                        <TableCell className="border-r border-gray-300 text-xs md:text-sm px-2 py-3">{user.phone}</TableCell>
                        <TableCell className="border-r border-gray-300 text-xs md:text-sm px-2 py-3">{user.bloodGroup}</TableCell>
                        <TableCell className="px-2 py-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push(`/students/${user.id}`)}
                            className="text-xs px-2 py-1 h-7 md:text-sm md:px-3 md:py-2 md:h-8 whitespace-nowrap"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Mobile scroll hint */}
              <div className="block md:hidden p-2 text-center bg-gray-50 border-t">
                <p className="text-xs text-gray-500">← Scroll horizontally to see more columns →</p>
              </div>
            </div>

            {/* Pagination - only show for non-search results */}
            {!isSearching && totalPages > 1 && (
              <div className="mt-6 flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 bg-white p-4 rounded-lg shadow">
                <div className="text-xs md:text-sm text-gray-700 text-center md:text-left">
                  Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} students
                </div>
                
                <div className="flex items-center justify-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="text-xs px-2 py-1 h-8 md:text-sm md:px-3 md:py-2 md:h-9"
                  >
                    Prev
                  </Button>
                  
                  <div className="flex items-center space-x-1 overflow-x-auto max-w-[200px] md:max-w-none">
                    {getVisiblePages().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-1 md:px-2 py-1 text-gray-500 text-xs md:text-sm">...</span>
                        ) : (
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageClick(page as number)}
                            className="text-xs px-2 py-1 h-8 min-w-[28px] md:text-sm md:px-3 md:py-2 md:h-9 md:min-w-[36px] flex-shrink-0"
                          >
                            {page}
                          </Button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="text-xs px-2 py-1 h-8 md:text-sm md:px-3 md:py-2 md:h-9"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Show search results count */}
            {isSearching && (
              <div className="mt-6 text-center">
                <div className="text-sm text-gray-700">
                  Found {totalUsers} student{totalUsers !== 1 ? 's' : ''} matching &ldquo;{debouncedSearchQuery}&rdquo;
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;