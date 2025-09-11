import type { Level } from '../Models/Level';
import type { LevelRepository } from '../Repositories/LevelRepository';

export class LevelService {
  private levelRepository: LevelRepository;
  
  constructor(levelRepository: LevelRepository) {
    this.levelRepository = levelRepository;
  }
  
  async getAllLevels(): Promise<Level[]> {
    return this.levelRepository.getAll();
  }
  
  async getLevelById(id: number): Promise<Level> {
    if (id <= 0) {
      throw new Error('ID do nível deve ser um número positivo');
    }
    
    return this.levelRepository.getById(id);
  }
  
  async createLevel(levelData: Omit<Level, 'id'>): Promise<Level> {
    // Validações de negócio
    this.validateLevelData(levelData);
    
    // Verificar se já existe um nível com o mesmo nome
    const existingLevels = await this.levelRepository.getAll();
    const duplicateName = existingLevels.find(
      level => level.name.toLowerCase() === levelData.name.toLowerCase()
    );
    
    if (duplicateName) {
      throw new Error('Já existe um nível com este nome');
    }
    
    return this.levelRepository.create(levelData);
  }
  
  async updateLevel(id: number, updates: Partial<Level>): Promise<Level> {
    if (id <= 0) {
      throw new Error('ID do nível deve ser um número positivo');
    }
    
    // Validações apenas para os campos que estão sendo atualizados
    if (updates.name !== undefined) {
      this.validateName(updates.name);
      
      // Verificar se já existe outro nível com o mesmo nome
      const existingLevels = await this.levelRepository.getAll();
      const duplicateName = existingLevels.find(
        level => level.id !== id && level.name.toLowerCase() === updates.name!.toLowerCase()
      );
      
      if (duplicateName) {
        throw new Error('Já existe um nível com este nome');
      }
    }
    
    return this.levelRepository.update(id, updates);
  }
  
  async deleteLevel(id: number): Promise<void> {
    if (id <= 0) {
      throw new Error('ID do nível deve ser um número positivo');
    }
    
    // Aqui você poderia adicionar validação para verificar se há desenvolvedores
    // associados a este nível antes de permitir a exclusão
    // Para isso, seria necessário ter acesso ao DeveloperRepository ou um método específico
    
    return this.levelRepository.delete(id);
  }
  
  async searchLevels(query: string): Promise<Level[]> {
    if (!query || query.trim().length < 1) {
      throw new Error('Termo de busca deve ter pelo menos 1 caractere');
    }
    
    const allLevels = await this.levelRepository.getAll();
    return allLevels.filter(level => 
      level.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  async getLevelsSortedByName(): Promise<Level[]> {
    const levels = await this.levelRepository.getAll();
    return levels.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  async checkLevelExists(id: number): Promise<boolean> {
    try {
      await this.levelRepository.getById(id);
      return true;
    } catch {
      return false;
    }
  }
  
  async getLevelChoices(): Promise<{ value: number; label: string }[]> {
    const levels = await this.getLevelsSortedByName();
    return levels.map(level => ({
      value: level.id,
      label: level.name
    }));
  }
  
  private validateLevelData(data: Omit<Level, 'id'>): void {
    this.validateName(data.name);
  }
  
  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Nome do nível deve ter pelo menos 2 caracteres');
    }
    
    if (name.trim().length > 50) {
      throw new Error('Nome do nível não pode ter mais de 50 caracteres');
    }
    
    // Validar se contém apenas caracteres alfanuméricos, espaços e alguns caracteres especiais
    const validNameRegex = /^[a-zA-Z0-9\s\-_.]+$/;
    if (!validNameRegex.test(name.trim())) {
      throw new Error('Nome do nível contém caracteres inválidos');
    }
  }
}
