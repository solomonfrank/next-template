import { AppPropsWithLayout } from "@/libs/app-provider";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
