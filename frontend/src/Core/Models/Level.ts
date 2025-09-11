export interface Level {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateLevelRequest {
    name: string;
}

export interface UpdateLevelRequest {
    name: string;
}