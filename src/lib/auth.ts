import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { query } from "./db";
import { AdminRow } from "../types/analysis";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        try {
          const admins = await query<AdminRow[]>(
            "SELECT id, email, password_sha256 FROM admins WHERE email = ?",
            [email]
          );

          if (!admins || admins.length === 0) {
            return null;
          }

          const admin = admins[0];
          const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

          if (hashedPassword !== admin.password_sha256) {
            return null;
          }

          return {
            id: admin.id.toString(),
            email: admin.email,
          };
        } catch (error) {
          console.error("Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
});
