import type { Level } from './Level';

export interface Developer {
    id: number;
    name: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    level_id: number;
    level?: Level;
    created_at?: string;
    updated_at?: string;
}

export interface CreateDeveloperRequest {
    name: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    level_id: number;
}

export interface UpdateDeveloperRequest {
    name: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    level_id: number;
}