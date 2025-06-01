export class HttpResult<T> {
    public success: boolean;         // Indicates whether the operation was successful (true) or failed (false)
    public data: T | null;           // Holds the payload data when the operation succeeds; null if there's no data or on failure
    public error: string;            // Contains an error message when the operation fails; empty string on success

    private constructor(success: boolean, data: T | null, error: string) {
        this.success = success;      // Set the success flag based on constructor parameters
        this.data = data;            // Set the data payload (or null)
        this.error = error;          // Set the error message (or empty string)
    }

    // Static method to create a successful HttpResult instance
    public static Success<T>(data: T | null): HttpResult<T> {
        // Returns an HttpResult with success=true, the provided data, and an empty error
        return new HttpResult(true, data, "");
    }

    // Static method to create a failed HttpResult instance
    public static Fail(error: string): HttpResult<any> {
        // Returns an HttpResult with success=false, data=null, and the provided error message
        return new HttpResult(false, null, error);
    }
}
