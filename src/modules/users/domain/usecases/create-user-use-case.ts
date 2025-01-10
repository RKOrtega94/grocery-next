import { User } from "../entity/user";
import { UserRepository } from "../interfaces/user-repository";

interface CreateUserUseCaseProps {
  email: string;
  password: string;
  phone: string;
}

/**
 * Create User Use Case
 */
export class CreateUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(data: CreateUserUseCaseProps) {
    const user = new User(
      undefined,
      data.email,
      data.password,
      data.phone,
      undefined,
      new Date(),
      new Date(),
      null
    );
    return this.repository.create(user);
  }
}
