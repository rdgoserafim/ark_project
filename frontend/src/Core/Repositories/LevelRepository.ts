import type { Level } from '../Models/Level';

export interface LevelRepository {
  getAll(): Promise<Level[]>;
  getById(id: number): Promise<Level>;
  create(data: Omit<Level, 'id'>): Promise<Level>;
  update(id: number, data: Partial<Level>): Promise<Level>;
  delete(id: number): Promise<void>;
}
