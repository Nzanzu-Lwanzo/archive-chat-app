/**@type {import("express-validator").Schema} */
export const user_schema = {
  name: {
    isLength: {
      options: {
        min: 2,
        max: 16,
      },
      errorMessage:
        "Your username should be at least 2 characters and at most 16 characters long.",
    },
    notEmpty: {
      errorMessage: "You must provide a username.",
    },
  },

  email: {
    isEmail: {
      errorMessage: "Your email doesn't respect the pattern.",
    },
    optional: true,
  },

  password: {
    isLength: {
      options: {
        min: 6,
        max: 12,
      },
      errorMessage:
        "Your password should be at least 6 charcters and at most 12 characters long.",
    },
    notEmpty: {
      errorMessage: "You must provide a password.",
    },
  },
};
