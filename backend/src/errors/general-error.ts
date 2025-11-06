class GeneralError extends Error {
    message: string;
    status: number;
    name: string;
    constructor(message: string, status: number, name: string) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = name;
    }
}

export default GeneralError;
