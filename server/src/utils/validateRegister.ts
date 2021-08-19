import { REGEXP } from "../constants";
import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!REGEXP.test(options.email)) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Cannot include @ in username",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }
  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 3",
      },
    ];
  }
  return null;
};
