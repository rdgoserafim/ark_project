import type { Developer } from '../Models/Developer';

export interface DeveloperRepository {
  getAll(): Promise<Developer[]>;
  getById(id: number): Promise<Developer>;
  create(data: Omit<Developer, 'id'>): Promise<Developer>;
  update(id: number, data: Partial<Developer>): Promise<Developer>;
  delete(id: number): Promise<void>;
}
