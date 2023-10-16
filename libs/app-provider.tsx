import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps as NextAppProps } from "next/app";
import { NextRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, router: NextRouter) => ReactNode; // custom layout
  PageWrapper: (props: NextAppProps) => JSX.Element;
};

export type AppPropsWithLayout = NextAppProps & {
  Component: NextPageWithLayout;
};

export type ApproviderProps = AppPropsWithLayout & {
  children: React.ReactNode;
};
export const Approvider = (props: ApproviderProps) => {
  return (
    <SessionProvider session={props.pageProps?.session ?? undefined}>
      {props.children}
    </SessionProvider>
  );
};
