import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path
// import { Role } from "../../generated/prisma/client/enums"; // Adjust the path as needed

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "PATIENT", // Default role for new users
      },
      status: {
        type: "string",
        required: true,
        defaultValue: "ACTIVE", // Default status for new users
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false, // Default value for password change requirement
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false, // Default value for soft deletion
      },
      deletedAt: {
        type: "date",
        required: false,
      },
    },
  },
});
