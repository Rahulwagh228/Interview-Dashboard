'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/sidebar/Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/useDebounce";
// import { fetchUsers } from "@/lib/api";
import { User, UsersResponse } from "@/app/students/types/user";

const StudentsPage = () => {
  const router = useRouter();
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

   async function fetchUsers(limit: number = 30, skip: number = 0): Promise<UsersResponse> {
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    
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
      const response = await fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`);
      
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
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6">
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
            {/* Mobile View */}
            <div className="block md:hidden">
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg shadow p-4 border border-gray-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-lg">
                        {`${user.firstName} ${user.lastName}`}
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {user.id}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Username:</span> {user.username}</div>
                      <div><span className="font-medium">Email:</span> {user.email}</div>
                      <div><span className="font-medium">Phone:</span> {user.phone}</div>
                      <div><span className="font-medium">Blood Group:</span> {user.bloodGroup}</div>
                    </div>
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/students/${user.id}`)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="border border-gray-300">
                  <TableHeader>
                    <TableRow className="border-b border-gray-300">
                      <TableHead className="border-r border-gray-300 min-w-[60px]">ID</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[150px]">Full Name</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[120px]">Username</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[200px]">Email</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[130px]">Phone</TableHead>
                      <TableHead className="border-r border-gray-300 min-w-[100px]">Blood Group</TableHead>
                      <TableHead className="min-w-[120px]">View Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-b border-gray-300">
                        <TableCell className="font-medium border-r border-gray-300">
                          {user.id}
                        </TableCell>
                        <TableCell className="font-medium border-r border-gray-300">
                          {`${user.firstName} ${user.lastName}`}
                        </TableCell>
                        <TableCell className="border-r border-gray-300">{user.username}</TableCell>
                        <TableCell className="border-r border-gray-300">{user.email}</TableCell>
                        <TableCell className="border-r border-gray-300">{user.phone}</TableCell>
                        <TableCell className="border-r border-gray-300">{user.bloodGroup}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push(`/students/${user.id}`)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination - only show for non-search results */}
            {!isSearching && totalPages > 1 && (
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-sm text-gray-700 text-center md:text-left">
                  Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} students
                </div>
                
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="text-xs md:text-sm"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {getVisiblePages().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-2 md:px-3 py-2 text-gray-500 text-xs md:text-sm">...</span>
                        ) : (
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageClick(page as number)}
                            className="text-xs md:text-sm min-w-[32px] md:min-w-[36px]"
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
                    className="text-xs md:text-sm"
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