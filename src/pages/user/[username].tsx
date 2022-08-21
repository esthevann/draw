import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { requireAuth } from "../../server/common/requireAuth";
import { prisma } from '../../server/db/client'
import { InferGetServerSidePropsType } from 'next';
import { User } from "@prisma/client";
import Link from "next/link";
import MainContent from "../../components/MainContent";
import Sidebar from "../../components/Sidebar";

interface IProps {
    user: User
}


export default function UserPage({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const session = useSession();


    return (
        <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <MainContent>
          <h1 className="text-4xl font-bold mt-3 lg:pr-48">{user.name}&apos;s drawings</h1>
          <div className="p-3"></div>
        </MainContent>
        
        <Sidebar>
            <li><Link href={"/"}>Home</Link></li>
            <li><a onClick={() => signOut()}>Sign Out</a></li>
        </Sidebar>

      </div>
    )
}

// @ts-expect-error typescript is difficult
export const getServerSideProps: GetServerSideProps<IProps> = requireAuth(async (ctx: GetServerSidePropsContext) => {
    const { username } = ctx.query;
    if (typeof username !== "string" || !username) {
        return {
            notFound: true
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            username,
        }
    });

    if (!user) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            user
        }
    }
});