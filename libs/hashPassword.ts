import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  return await hash(password, 12);
};

export const verifyPassword = async (
  storedPassword: string,
  currentPassword: string
) => {
  return await compare(currentPassword, storedPassword);
};
