"use client";

import ErrorContainer from "@/ui/ErrorContainer/ErrorContainer";
import { useTranslations } from "next-intl";

export default function SuccessError() {
  const t = useTranslations("ErrorPages");

  return (
    <ErrorContainer
      title={t("general_title")}
      text={t("success_error_title")}
      description={t("success_error_text")}
      goBackButtonText={t("general_back_button")}
    />
  );
}
