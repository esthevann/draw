// @/src/common/requireAuth.ts
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "./auth";


export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/api/auth/signin", // login path
          permanent: false,
        },
      };
    } else if (!session.user?.fullyRegistered) {
        return {
          redirect: {
            destination: "/auth/newUser",
            permanent: false,
          }
        }
      }

    return await func(ctx);
  };