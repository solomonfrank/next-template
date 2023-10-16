import PageWrapper from "@/components/PageWrapper";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next/types";
import { nextAuthOption } from "./api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

const Dashboard = () => {
  return <div>Welcome to the dashboard</div>;
};

Dashboard.PageWrapper = PageWrapper;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { req, res } = ctx;

  const session = await getServerSession(req, res, nextAuthOption);

  console.log("sesssssion", session);
  if (!session?.user?.id) {
    return {
      redirect: { permanent: false, destination: "/auth/login" },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Dashboard;
