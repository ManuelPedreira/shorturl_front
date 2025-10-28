import { z } from "zod";

const urlSchema = z.object({
  url: z.preprocess((maybeUrl) => {
    if (typeof maybeUrl === "string") {
      const s = maybeUrl.trim();
      if (!/^https?:\/\//i.test(s)) return `https://${s}`;
      return s;
    }
    return maybeUrl;
  },
  z.string()
    .min(12, { message: "URL too short" })
    .regex(/^[^.]+(\.[^.]+)+(\/.*)?$/, {
      message: "Please insert a valid URL",
    })
    .refine((s) => {
      try {
        new URL(s);
        return true;
      } catch {
        return false;
      }
    }, { message: "Please insert a valid URL" })
  )
});

const urlValidator = (url: FormDataEntryValue | null) => {
  const validatedFields = urlSchema.safeParse({ url });

  const parsedError = validatedFields.error?.issues[0]?.message;

  return {
    ...validatedFields,
    error: { ...validatedFields.error, parsedError },
  };
};

export default urlValidator;
