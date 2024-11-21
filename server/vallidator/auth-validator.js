// const { z } = require("zod");

// const loginSchema = z.object({
//   email: z
//   .string({ required_error: "Email is required" })
//   .trim()
//   .email({message: "Invalid email address" })
//   .min(3, { message: "Emailmust be at 3 charecters" })
//   .max(235, { message: "Email must not be more than  255 letters" }),

//   password: z
//   .string({ required_error: "Password is required" })
//   .trim()
//   .min(7, { message: "Password must be at 6 letters" })
//   .max(1024, { message: "Password can't be greater than 1024 charecters" }),
// })

// // create object schema 

// const signupSchema = loginSchema.extend({
//   username: z
//     .string({ required_error: "Name is required" })
//     .trim()
//     .min(3, { message: "Name must be at 3 char." })
//     .max(235, { message: "Name must not be more than  255 charecters" }),

  

//     phone: z
//     .string({ required_error: "Phone no is required" })
//     .trim()
//     .min(10, { message: "phone must be at 10 letters" })
//     .max(20, { message: "phone must not be more than  20 letters" }),

// });

// module.exports = {signupSchema, loginSchema};