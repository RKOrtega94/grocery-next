import { UserRepository } from "../interfaces/user-repository";

export class RetrieveUserByIdUseCase {
  constructor(private repository: UserRepository) {}

  async execute(id: string) {
    return this.repository.retrieveUserById(id);
  }
}
