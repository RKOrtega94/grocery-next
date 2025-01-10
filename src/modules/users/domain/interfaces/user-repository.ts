import { User } from "../entity/user";

/**
 * @summary Interface for the user repository
 */
export interface UserRepository {
  /**
   * @summary Create or update a user
   *
   * @param user The user to save
   *
   * @returns The saved user
   */
  create(user: User): Promise<User>;

  /**
   * @summary Retrieve all users
   *
   * @returns All users
   */
  retrieveAllUsers(): Promise<User[]>;

  /**
   * @summary Retrieve a user by their ID
   *
   * @param id
   *
   * @returns The user with the given ID, or null if not found
   */
  retrieveUserById(id: string): Promise<User | null>;

  /**
   * @summary Retrieve a user by their email
   *
   * @param user
   *
   * @returns The user with the given email, or null if not found
   */
  update(user: User): Promise<User>;

  delete(id: string): Promise<void>;
}
