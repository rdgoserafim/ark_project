// src/infrastructure/storage/LocalDeveloperRepository.ts
import type { Developer } from '../../Core/Models/Developer';
import type { DeveloperRepository } from '../../Core/Repositories/DeveloperRepository';

export class LocalDeveloperRepository implements DeveloperRepository {
  private storageKey = 'developers';
  
  async getAll(): Promise<Developer[]> {
    const developersJson = localStorage.getItem(this.storageKey);
    return developersJson ? JSON.parse(developersJson) : [];
  }
  
  async getById(id: number): Promise<Developer> {
    const developers = await this.getAll();
    const developer = developers.find(d => d.id === id);
    
    if (!developer) {
      throw new Error('Desenvolvedor não encontrado');
    }
    
    return developer;
  }
  
  async create(data: Omit<Developer, 'id'>): Promise<Developer> {
    const developers = await this.getAll();
    const newId = developers.length > 0 ? Math.max(...developers.map(d => d.id)) + 1 : 1;
    const newDeveloper: Developer = { ...data, id: newId };
    
    developers.push(newDeveloper);
    await this.saveDevelopers(developers);
    
    return newDeveloper;
  }
  
  async update(id: number, data: Partial<Developer>): Promise<Developer> {
    const developers = await this.getAll();
    const index = developers.findIndex(d => d.id === id);
    
    if (index === -1) {
      throw new Error('Desenvolvedor não encontrado');
    }
    
    const updatedDeveloper = { ...developers[index], ...data, id };
    developers[index] = updatedDeveloper;
    
    await this.saveDevelopers(developers);
    
    return updatedDeveloper;
  }
  
  async delete(id: number): Promise<void> {
    const developers = await this.getAll();
    const filteredDevelopers = developers.filter(d => d.id !== id);
    
    if (filteredDevelopers.length === developers.length) {
      throw new Error('Desenvolvedor não encontrado');
    }
    
    await this.saveDevelopers(filteredDevelopers);
  }
  
  async searchDevelopers(query: string): Promise<Developer[]> {
    const developers = await this.getAll();
    return developers.filter(developer => 
      developer.name.toLowerCase().includes(query.toLowerCase()) ||
      developer.hobby.toLowerCase().includes(query.toLowerCase()) ||
      developer.sexo.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  private async saveDevelopers(developers: Developer[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(developers));
  }
}