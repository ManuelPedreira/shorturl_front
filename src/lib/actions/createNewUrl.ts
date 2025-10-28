"use server";

import { createUrl } from "../api/apiCalls";
import { ActionResult } from "next/dist/server/app-render/types";
import urlValidator from "../validations/urlValidator";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

const createNewUrl = async (
  initialState: ActionResult,
  formData: FormData
): Promise<ActionResult> => {
  const validatedFields = urlValidator(formData.get("url"));

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.parsedError,
    };
  }

  try {
    const data = await createUrl({ url: validatedFields.data.url });
    const cookieStore = await cookies();
    cookieStore.set("shortUrlData", JSON.stringify(data), {
      httpOnly: true,
      path: "/success",
      maxAge: 10,
    });

    redirect(`/success`);
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        success: false,
        errors: e.response ? e.response.data?.detail : e.message,
      };
    } else {
      throw e;
    }
  }
};

export default createNewUrl;
