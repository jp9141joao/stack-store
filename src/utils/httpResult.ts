export class HttpResult<T> {

    public success: boolean;
    public data: T | null;
    public error: string;

    private constructor(success: boolean, data: T | null, error: string) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    public static Success<T>(data: T | null): HttpResult<T> {
        return new HttpResult(true, data, "");
    }

    public static Fail(error: string): HttpResult<any> {
        return new HttpResult(false, null, error);
    }
} 