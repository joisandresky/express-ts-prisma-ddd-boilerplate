export class ResponseError extends Error {
  public error_detail?: Error;

  constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
  }

  public set_error(error: Error) {
    this.error_detail = error;
  }
}
