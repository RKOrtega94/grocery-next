import { Pagination } from "@/core/interfaces/pagination.interface";
import { UserModel } from "../../domain/model/user-model";

export class UserService {
  constructor() {}

  async retrieveUsers(
    search: string,
    pagination: Pagination
  ): Promise<UserModel[]> {
    console.log("Retrieving users...");
    console.log("Filters: ", search);
    console.log("Pagination: ", pagination);
    return [];
  }
}
