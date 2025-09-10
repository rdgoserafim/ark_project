import type { User } from '../Models/User';
import type { UserRepository } from '../Repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;
  
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  
  async getCurrentUser(): Promise<User> {
    return this.userRepository.getCurrentUser();
  }
  
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    // Lógica de negócio pode ser adicionada aqui
    if (updates.email && !this.isValidEmail(updates.email)) {
      throw new Error('Email inválido');
    }
    
    return this.userRepository.updateUser(updates);
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}