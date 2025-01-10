import { CreateUserUseCase } from "../domain/usecases/create-user-use-case";
import {
  ApiResponse,
  ErrorResponse,
} from "@/core/interfaces/api-response.interface";
import { RetrieveUsersUseCase } from "../domain/usecases/retrieve-users-use-case";
import { UserResponse } from "./dto/user-response";
import { User } from "../domain/entity/user";
import { RetrieveUserByIdUseCase } from "../domain/usecases/retrieve-use-by-id-use-case";
import { UpdateUserUseCase } from "../domain/usecases/update-user-use-case";
import { Status } from "@/core/constants/status";
import { UserRepositoryImpl } from "../data/user-repository-impl";
import { DeleteUserUseCase } from "../domain/usecases/delete-user-use-case";

const _repository = new UserRepositoryImpl();

const createUserUseCase = new CreateUserUseCase(_repository);
const retrieveUsersUseCase = new RetrieveUsersUseCase(_repository);
const retrieveUserByIdUseCase = new RetrieveUserByIdUseCase(
  _repository
);
const updateUserUseCase = new UpdateUserUseCase(_repository);
const deleteUserUseCase = new DeleteUserUseCase(_repository);

export class UserController {
  async createUser(
    email: string,
    password: string,
    phone: string
  ): Promise<ApiResponse<UserResponse> | ErrorResponse> {
    const user = await createUserUseCase.execute({
      email,
      password,
      phone,
    });
    try {
      return {
        status: 201,
        message: "User created successfully",
        data: user.toResponse(),
      };
    } catch {
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  async retrieveAllUsers(): Promise<
    ApiResponse<UserResponse[]> | ErrorResponse
  > {
    const users: User[] = await retrieveUsersUseCase.execute();
    try {
      return {
        status: 200,
        message: "Users retrieved successfully",
        data: users.map((user: User) =>
          new User(
            user.id,
            user.email,
            user.password,
            user.phone,
            user.status,
            user.createdAt,
            user.updatedAt,
            user.deletedAt
          ).toResponse()
        ),
      };
    } catch {
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  async retrieveUserById(
    id: string
  ): Promise<ApiResponse<UserResponse> | ErrorResponse> {
    const user = await retrieveUserByIdUseCase.execute(id);
    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }
    try {
      return {
        status: 200,
        message: "User retrieved successfully",
        data: {
          id: user.id!,
          email: user.email,
          phone: user.phone,
          status: user.status!,
          createdAt: user.createdAt!,
          updatedAt: user.updatedAt!,
        },
      };
    } catch {
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  async updateUser(
    {
      id,
      email,
      password,
      phone,
      status
    }:
      {
        id: string,
        email: string,
        password: string,
        phone: string,
        status?: Status
      }
  ): Promise<ApiResponse<UserResponse> | ErrorResponse> {
    const user = await updateUserUseCase.execute({
      id,
      email,
      password,
      phone,
      status,
    });
    try {
      return {
        status: 200,
        message: "User updated successfully",
        data: user.toResponse(),
      };
    } catch {
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }

  async deleteUser(
    id: string
  ): Promise<object | ErrorResponse> {
    await deleteUserUseCase.execute(id);
    try {
      return {
        status: 204,
        message: "User deleted successfully",
        data: null,
      };
    } catch {
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
