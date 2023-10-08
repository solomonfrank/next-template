import { z } from "zod";
import { passwordValidator } from "./validator";

export const signupSchema = z.object({
  password: z
    .string()
    .trim()
    .superRefine((password, ctx) => {
      const passwordTestResult = passwordValidator(password);
      Object.keys(passwordTestResult).map((rule) => {
        const ruleCtx =
          passwordTestResult[rule as keyof typeof passwordTestResult];
        if (!ruleCtx.validator) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: ruleCtx?.message,
            path: [rule],
          });
        }
      });
    }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});
