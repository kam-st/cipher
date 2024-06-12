"use server";

import { error } from "console";

import { z } from "zod";

import { getUserbyEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/lib/validations/auth";

export const resetPasswordAction = async (
  values: z.infer<typeof ResetSchema>
) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserbyEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  if (existingUser.name === null) {
    existingUser.name = "";
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
    existingUser.name
  );

  return { success: "Reset email sent!" };
};
