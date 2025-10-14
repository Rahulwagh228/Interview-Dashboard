import { UsersResponse } from '@/app/students/types/user';

export async function fetchUsers(limit: number = 30, skip: number = 0): Promise<UsersResponse> {
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