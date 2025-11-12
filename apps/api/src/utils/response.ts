export type ModelResponse<T = undefined> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string | Record<string, unknown>;
    errors?: Record<string, string[]>;
};
