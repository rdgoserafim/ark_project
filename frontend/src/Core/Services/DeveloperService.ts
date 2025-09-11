import type { Developer } from '../Models/Developer';
import type { DeveloperRepository } from '../Repositories/DeveloperRepository';

export class DeveloperService {
  private developerRepository: DeveloperRepository;
  
  constructor(developerRepository: DeveloperRepository) {
    this.developerRepository = developerRepository;
  }
  
  async getAllDevelopers(): Promise<Developer[]> {
    return this.developerRepository.getAll();
  }
  
  async getDeveloperById(id: number): Promise<Developer> {
    if (id <= 0) {
      throw new Error('ID do desenvolvedor deve ser um número positivo');
    }
    
    return this.developerRepository.getById(id);
  }
  
  async createDeveloper(developerData: Omit<Developer, 'id'>): Promise<Developer> {
    // Validações de negócio
    this.validateDeveloperData(developerData);
    
    return this.developerRepository.create(developerData);
  }
  
  async updateDeveloper(id: number, updates: Partial<Developer>): Promise<Developer> {
    if (id <= 0) {
      throw new Error('ID do desenvolvedor deve ser um número positivo');
    }
    
    // Validações apenas para os campos que estão sendo atualizados
    if (updates.name !== undefined) {
      this.validateName(updates.name);
    }
    
    if (updates.data_nascimento !== undefined) {
      this.validateBirthDate(updates.data_nascimento);
    }
    
    if (updates.sexo !== undefined) {
      this.validateGender(updates.sexo);
    }
    
    if (updates.level_id !== undefined) {
      this.validateLevelId(updates.level_id);
    }
    
    return this.developerRepository.update(id, updates);
  }
  
  async deleteDeveloper(id: number): Promise<void> {
    if (id <= 0) {
      throw new Error('ID do desenvolvedor deve ser um número positivo');
    }
    
    return this.developerRepository.delete(id);
  }
  
  async searchDevelopers(query: string): Promise<Developer[]> {
    if (!query || query.trim().length < 2) {
      throw new Error('Termo de busca deve ter pelo menos 2 caracteres');
    }
    
    // Se o repositório tem método de busca, use-o, senão implemente aqui
    const allDevelopers = await this.developerRepository.getAll();
    return allDevelopers.filter(developer => 
      developer.name.toLowerCase().includes(query.toLowerCase()) ||
      developer.hobby.toLowerCase().includes(query.toLowerCase()) ||
      developer.sexo.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  async getDevelopersByLevel(levelId: number): Promise<Developer[]> {
    if (levelId <= 0) {
      throw new Error('ID do nível deve ser um número positivo');
    }
    
    const allDevelopers = await this.developerRepository.getAll();
    return allDevelopers.filter(developer => developer.level_id === levelId);
  }
  
  private validateDeveloperData(data: Omit<Developer, 'id'>): void {
    this.validateName(data.name);
    this.validateBirthDate(data.data_nascimento);
    this.validateGender(data.sexo);
    this.validateLevelId(data.level_id);
    this.validateHobby(data.hobby);
  }
  
  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (name.trim().length > 100) {
      throw new Error('Nome não pode ter mais de 100 caracteres');
    }
  }
  
  private validateBirthDate(birthDate: string): void {
    if (!birthDate) {
      throw new Error('Data de nascimento é obrigatória');
    }
    
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      throw new Error('Data de nascimento inválida');
    }
    
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const maxAge = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    
    if (date < minAge || date > maxAge) {
      throw new Error('Desenvolvedor deve ter entre 16 e 100 anos');
    }
  }
  
  private validateGender(gender: string): void {
    const validGenders = ['M', 'F', 'O', 'N/A'];
    if (!validGenders.includes(gender)) {
      throw new Error('Sexo deve ser M (Masculino), F (Feminino), O (Outro) ou N/A (Não informado)');
    }
  }
  
  private validateLevelId(levelId: number): void {
    if (!Number.isInteger(levelId) || levelId <= 0) {
      throw new Error('ID do nível deve ser um número inteiro positivo');
    }
  }
  
  private validateHobby(hobby: string): void {
    if (!hobby || hobby.trim().length < 2) {
      throw new Error('Hobby deve ter pelo menos 2 caracteres');
    }
    
    if (hobby.trim().length > 200) {
      throw new Error('Hobby não pode ter mais de 200 caracteres');
    }
  }
}
