import React from "react";

type RichValues = Record<string, (chunks: React.ReactNode) => React.ReactNode>;

export const useTranslations = () => common();
export const getTranslations = () => common();

const common = () => {
  const t = ((key: string) => key) as any;

  t.rich = (key: string, values?: RichValues) => {
    if (!values) return key;

    return (
      <>
        {Object.entries(values).map(([name, render], index) => (
          <React.Fragment key={`${name}-${index}`}>
            {render(name)}
          </React.Fragment>
        ))}
      </>
    );
  };

  return t;
};

export const NextIntlClientProvider = ({ children }: { children: React.ReactNode }) => children;
export const getLocale = jest.fn().mockResolvedValue("en");
export const getMessages = jest.fn().mockResolvedValue({});
