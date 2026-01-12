import { getTranslations } from "next-intl/server";

export type NavigationElementType = {
  text: string;
  url: string;
  title?: string;
};

export const getNavbarElements = async (): Promise<NavigationElementType[]> => {
  const t = await getTranslations("NavbarElements");

  return [{ text: t("login"), url: "/", title: t("loginTitle") }];
};
