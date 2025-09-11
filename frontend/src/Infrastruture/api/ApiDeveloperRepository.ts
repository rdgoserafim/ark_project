import apiClient from './apiClient';
import type { Developer } from '../../Core/Models/Developer';
import type { DeveloperRepository } from '../../Core/Repositories/DeveloperRepository';
import type { PaginatedResponse } from '../../Core/Models/Common';

export class ApiDeveloperRepository implements DeveloperRepository {
    async getAll(): Promise<Developer[]> {
        const response = await apiClient.get('/developer/index');
        return response.data.data;
    }

    async getAllPaginated(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Developer>> {
        const response = await apiClient.get(`/developer/index?page=${page}&per_page=${perPage}`);
        return response.data;
    }

    async getById(id: number): Promise<Developer> {
        const response = await apiClient.get(`/developer/show/${id}`);
        return response.data.data;
    }

    async create(data: Omit<Developer, 'id'>): Promise<Developer> {
        const response = await apiClient.post('/developer/store', data);
        return response.data.data;
    }

    async update(id: number, data: Partial<Developer>): Promise<Developer> {
        const response = await apiClient.put(`/developer/update/${id}`, data);
        return response.data.data;
    }

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/developer/destroy/${id}`);
    }
}
