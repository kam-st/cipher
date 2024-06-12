"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { db } from "@/lib/db";

import { RegisterSchema } from "@/lib/validations/auth";
import { getUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { UserTable } from "@/drizzle/schema";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidated fields!" };
  }

  const { email, password, name, lastName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserbyEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.insert(UserTable).values({
    name,
    lastName,
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    name
  );

  return { success: "Confirmation email has been sent!" };
};
