import axios, { type AxiosInstance } from 'axios';
import type { Level } from '../../Core/Models/Level';
import type { LevelRepository } from '../../Core/Repositories/LevelRepository';

export class HttpLevelRepository implements LevelRepository {
  private api: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Estrutura para interceptors - pode ser configurada posteriormente
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - exemplo para adicionar token de autenticação
    this.api.interceptors.request.use(
      (config: any): any => {
        // Adicionar lógica aqui, ex: config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    // Response interceptor - exemplo para tratar erros globais
    this.api.interceptors.response.use(
      (response: any): any => response,
      (error: any) => {
        // Tratar erros aqui, ex: redirecionar para login se 401
        return Promise.reject(error);
      }
    );
  }

  async getAll(): Promise<Level[]> {
    const response = await this.api.get<Level[]>('/level/index');
    return response.data;
  }

  async getById(id: number): Promise<Level> {
    const response = await this.api.get<Level>(`/level/show/${id}`);
    return response.data;
  }

  async create(data: Omit<Level, 'id'>): Promise<Level> {
    const response = await this.api.post<Level>('/level/store', data);
    return response.data;
  }

  async update(id: number, data: Partial<Level>): Promise<Level> {
    const response = await this.api.put<Level>(`/level/update/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.api.delete(`/level/destroy/${id}`);
  }
}
