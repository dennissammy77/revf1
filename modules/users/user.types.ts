export interface User {
  id: string;
  name: string;
  username?: string | null;
  email: string;
  phone: string;
  age: number;
  avatar: string;
  gender: string;
  role: string;
  password: string;
  lastLogin: string; // ISO timestamp string
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  isSuspended: boolean;
  isLocked: boolean;
  createdAt: string; // ISO timestamp string
  updatedAt: string; // ISO timestamp string
}
