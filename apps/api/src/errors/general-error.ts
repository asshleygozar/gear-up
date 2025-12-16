class GeneralError extends Error {
    message: string;
    status: number;
    name: string;
    constructor(name: string, message: string, status: number) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = name;
    }
}

export default GeneralError;
