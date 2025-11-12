"use server";

import { createUrl } from "../api/apiCalls";
import { ActionResult } from "next/dist/shared/lib/app-router-types";
import urlValidator from "../validations/urlValidator";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

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

    const secret = new TextEncoder().encode(process.env.JWT_WS_SECRET!);
    const jwt = await new SignJWT({ code: data.shortCode }) // payload mínimo
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(
        process.env.TEMPORAL_COOKIE_EXPIRATION_TIME
          ? `${process.env.TEMPORAL_COOKIE_EXPIRATION_TIME+5}s`
          : "10s"
      )
      .sign(secret);

    const cookieConfig: Partial<ResponseCookie> = {
      httpOnly: true,
      maxAge: process.env.TEMPORAL_COOKIE_EXPIRATION_TIME
        ? parseInt(process.env.TEMPORAL_COOKIE_EXPIRATION_TIME)
        : 10,
      path: "/",
    };

    cookieStore.set("WSAccess", jwt, cookieConfig);

    cookieStore.set("shortUrlData", JSON.stringify(data), {
      ...cookieConfig,
      path: "/success",
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
