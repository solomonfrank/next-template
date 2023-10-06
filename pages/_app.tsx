import { AppPropsWithLayout } from "@/libs/app-provider";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";

function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  if (Component.PageWrapper !== undefined) return Component.PageWrapper(props);
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
