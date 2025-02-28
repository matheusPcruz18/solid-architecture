import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@email.com',
      name: 'Matheus',
      password: '1234567',
      ...override,
    },
    id,
  );
};
