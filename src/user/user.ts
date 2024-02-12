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
}

export const user = new User();
