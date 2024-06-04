import z from "zod";

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: Address;
//   phone: string;
//   website: string;
//   company: Company;
// }

// interface Address {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: {
//     lat: string;
//     lng: string;
//   };
// }

// interface Company {
//   name: string;
//   catchPhrase: string;
//   bs: string;
// }

const addressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
});

export type Address = z.infer<typeof addressSchema>;

const companySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export type Company = z.infer<typeof companySchema>;

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: addressSchema,
  phone: z.string(),
  website: z.string(),
  company: companySchema,
});

export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);

export type Response = z.infer<typeof userListSchema>;
