"use client";

import ErrorContainer from "@/ui/ErrorContainer/ErrorContainer";

export default function SuccessError() {
  return (
    <ErrorContainer>
      <p>No Data Found</p>
      <small>
        The page loaded, but no data could be retrieved. Please verify your request or try again
        later.
      </small>
    </ErrorContainer>
  );
}
