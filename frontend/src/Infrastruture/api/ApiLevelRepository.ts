import apiClient from './apiClient';
import type { Level } from '../../Core/Models/Level';
import type { LevelRepository } from '../../Core/Repositories/LevelRepository';
import type { PaginatedResponse } from '../../Core/Models/Common';

export class ApiLevelRepository implements LevelRepository {
    async getAll(): Promise<Level[]> {
        const response = await apiClient.get('/level/index');
        return response.data.data;
    }

    async getAllPaginated(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Level>> {
        const response = await apiClient.get(`/level/index?page=${page}&per_page=${perPage}`);
        return response.data;
    }

    async getById(id: number): Promise<Level> {
        const response = await apiClient.get(`/level/show/${id}`);
        return response.data.data;
    }

    async create(data: Omit<Level, 'id'>): Promise<Level> {
        const response = await apiClient.post('/level/store', data);
        return response.data.data;
    }

    async update(id: number, data: Partial<Level>): Promise<Level> {
        const response = await apiClient.put(`/level/update/${id}`, data);
        return response.data.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/level/destroy/${id}`);
    }
}
