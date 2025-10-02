"use server";

import { createUrl } from "../api/apiCalls";

const createNewUrl = async (formData: FormData) => {
  const url = formData.get("url") as string;
  createUrl({ url });
};

export default createNewUrl;
