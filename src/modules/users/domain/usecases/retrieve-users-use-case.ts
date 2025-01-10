import { UserRepository } from "../interfaces/user-repository";

export class RetrieveUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.retrieveAllUsers();
  }
}
