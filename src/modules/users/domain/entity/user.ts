import { Status } from "@/core/constants/status";
import { UserResponse } from "../../infrastructure/dto/user-response";

export class User {
  constructor(
    public id: string | undefined,
    public email: string,
    public password: string | undefined,
    public phone: string,
    public status: Status | undefined,
    public createdAt: Date | undefined,
    public updatedAt: Date | undefined,
    public deletedAt: Date | null
  ) {}

  public toResponse(): UserResponse {
    return {
      id: this.id!,
      email: this.email,
      phone: this.phone,
      status: this.status!,
      createdAt: this.createdAt!,
      updatedAt: this.updatedAt!,
    };
  }
}
