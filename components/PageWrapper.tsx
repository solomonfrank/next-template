import { AppPropsWithLayout } from "@/libs/app-provider";
import Head from "next/head";

const PageWrapper = (props: AppPropsWithLayout) => {
  const { pageProps, Component, router } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <section>
      <Head>
        <meta
          name="viewpoint"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <main>{getLayout(<Component {...pageProps} />, router)}</main>
    </section>
  );
};

export default PageWrapper;
