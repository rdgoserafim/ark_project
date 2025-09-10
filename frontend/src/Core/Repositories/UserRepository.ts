import type { User } from '../Models/User';

export interface UserRepository {
  getCurrentUser(): Promise<User>;
  updateUser(user: Partial<User>): Promise<User>;
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(data: Omit<User, 'id'>): Promise<User>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}