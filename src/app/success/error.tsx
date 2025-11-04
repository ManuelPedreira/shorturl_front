"use client";

import ErrorPage from "@/ui/components/ErrorPage/ErrorPage";

export default function SuccessError() {
  return (
    <ErrorPage>
      <p>No Data Found</p>
      <small>
        The page loaded, but no data could be retrieved. Please verify your request or try again
        later.
      </small>
    </ErrorPage>
  );
}
