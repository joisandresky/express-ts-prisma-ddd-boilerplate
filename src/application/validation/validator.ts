import { ZodType } from "zod";

export class Validator {
  static validate<T>(data: T, schema: ZodType): T {
    return schema.parse(data);
  }
}
