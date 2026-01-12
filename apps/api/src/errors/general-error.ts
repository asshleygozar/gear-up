class GeneralError extends Error {
    message: string;
    status: number;
    error: string;
    success: boolean;
    constructor(error: string, message: string, status: number) {
        super(message);
        this.success = false;
        this.message = message;
        this.status = status;
        this.error = error;
    }
}

export default GeneralError;
