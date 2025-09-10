import type { Level } from './Level';

export interface Developer {
    id: number;
    name: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    level_id: number;
    level?: Level;
}