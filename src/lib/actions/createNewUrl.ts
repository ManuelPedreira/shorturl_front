"use server";

import { z } from "zod";
import { createUrl } from "../api/apiCalls";
import { ActionResult } from "next/dist/server/app-render/types";

const schema = z.object({
  url: z
    .string("Invalid URL")
    .min(5, "URL can't be less than 5 characters")
    .regex(/.*\..*/, "URL must contain at least one dot (.)")
    .transform((url) => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
      }
      return url;
    })
    .refine((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }, "Please insert a valid URL"),
});

const createNewUrl = async (
  initialState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  const validatedFields = schema.safeParse({ url: formData.get("url") });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.issues[0]?.message,
    };
  } else {
    return createUrl({ url: validatedFields.data.url })
      .then((data) => ({
        success: true,
        message: data.shortUrl,
      }))
      .catch((e) => ({
        success: false,
        errors: e.response ? e.response.data?.detail : e.message,
      }));
  }
};

export default createNewUrl;
