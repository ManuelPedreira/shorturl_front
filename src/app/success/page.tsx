import { cookies } from "next/headers";
import styles from "./page.module.scss";
import { Suspense } from "react";
import UrlDetails from "./components/UrlDetails/UrlDetails";

export default async function SuccessPage() {
  const cookieStore = await cookies();
  const data = cookieStore.get("shortUrlData");
  const parsed = data ? JSON.parse(data.value) : null;

  return (
    <div>
      <h1>{parsed?.shortCode}</h1>
      <p>Original URL: {parsed?.originalUrl}</p>
      <p>Short URL: {parsed?.shortUrl}</p>

      <Suspense fallback={<div>Waiting...</div>}>
        {parsed?.shortCode ? <UrlDetails urlCode={parsed?.shortCode} /> : null}
      </Suspense>
    </div>
  );
}
