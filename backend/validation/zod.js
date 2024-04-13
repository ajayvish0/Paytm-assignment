const z = require("zod");

const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6).max(255),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
});

const SignSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6).max(255),
});

const updateSchema = z.object({
  password: z.string().min(6).max(255),
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
});

module.exports = { userSchema, SignSchema, updateSchema };
