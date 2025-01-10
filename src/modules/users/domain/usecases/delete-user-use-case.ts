import { UserRepository } from "../interfaces/user-repository";

export class DeleteUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(id: string) {
    return this.repository.delete(id);
  }
}
