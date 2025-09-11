export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: boolean;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
}
