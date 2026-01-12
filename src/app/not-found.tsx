import ErrorContainer from "@/ui/ErrorContainer/ErrorContainer";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("ErrorPages");

  return (
    <ErrorContainer
      title={t("general_title")}
      text={t("not_found_error_title")}
      description={t("not_found_error_text")}
      goBackButtonText={t("general_back_button")}
    />
  );
}
