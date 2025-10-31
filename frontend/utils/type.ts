export type APIResponse = {
    success: boolean;
    message: string;
    error?: string;
    errors? :Record<string, string[]>;
}