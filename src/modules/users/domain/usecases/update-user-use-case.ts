import { User } from "../entity/user";
import { UserRepository } from "../interfaces/user-repository";
import { Status } from "@/core/constants/status";

interface UpdateUserUseCaseProps {
  id: string;
  email: string;
  password: string;
  phone: string;
  status?: Status;
}

export class UpdateUserUseCase {
  constructor(private repository: UserRepository) { }

  async execute(data: UpdateUserUseCaseProps) {
    const user = new User(
      data.id,
      data.email,
      data.password,
      data.phone,
      data.status,
      undefined,
      undefined,
      null
    );
    return this.repository.update(user);
  }
}
