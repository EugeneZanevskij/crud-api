import { v4 as uuidv4 } from 'uuid';
import { IUser } from './user.model';

export const data : Required<IUser>[] = [];

class User {
  create(user: IUser): Required<IUser> {
    const id = uuidv4();
    const newUser = { id, ...user };
    data.push(newUser);
    return newUser;
  }

  getAll(): Required<IUser>[] {
    return data;
  }

  findUserById(id: string): Required<IUser> {
    const user = data.find((user) => user.id === id);
    return user as Required<IUser>;
  }

  update(id: string, user: IUser): Required<IUser> {
    const index = data.findIndex((user) => user.id === id);
    data[index] = { id, ...user };
    return data[index] as Required<IUser>;
  }
}

export const user = new User();
