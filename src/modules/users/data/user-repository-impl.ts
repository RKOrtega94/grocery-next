import { User } from "../domain/entity/user";
import { UserRepository } from "../domain/interfaces/user-repository";
import { Status } from "@/core/constants/status";

import { buildPrismaPaginationOptions, prisma } from "@/core/lib/prisma";

export class UserRepositoryImpl implements UserRepository {
  async delete(id: string): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    });
  }

  async update(user: User): Promise<User> {
    const { id } = user;
    const updateUser = await prisma.users.update({
      where: { id },
      data: { email: user.email, password: user.password!, phone: user.phone, status: user.status },
    });

    return new User(
      updateUser.id,
      updateUser.email,
      updateUser.password,
      updateUser.phone,
      updateUser.status as Status,
      updateUser.createdAt,
      updateUser.updatedAt,
      updateUser.deletedAt
    );
  }

  async retrieveUserById(id: string): Promise<User | null> {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) return null;
    return user as User;
  }

  async retrieveAllUsers(): Promise<User[]> {
    const pagination = buildPrismaPaginationOptions({});
    const users = await prisma.users.findMany({
      skip: pagination.skip,
      take: pagination.take,
      where: { status: { not: Status.DELETED } },
    });
    return users as User[];
  }

  async create(user: User): Promise<User> {
    const saveUser = await prisma.users.create({
      data: { email: user.email, password: user.password!, phone: user.phone },
    });

    return new User(
      saveUser.id,
      saveUser.email,
      saveUser.password,
      saveUser.phone,
      saveUser.status as Status,
      saveUser.createdAt,
      saveUser.updatedAt,
      saveUser.deletedAt
    );
  }
}
