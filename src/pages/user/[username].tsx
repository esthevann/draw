import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { requireAuth } from "../../server/common/requireAuth";
import { prisma } from '../../server/db/client'
import { InferGetServerSidePropsType } from 'next';
import { User } from "@prisma/client";
import Link from "next/link";

import MainContent from "../../components/MainContent";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import Spinner from "../../components/Spinner";
import Image from "next/future/image";
import { sliceIfInvalid } from "../../utils/sliceStr";
import Footer from "../../components/Footer";

interface IProps {
    user: User
}


export default function UserPage({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data: posts, isLoading } = trpc.useQuery(['post.getPostsByUser', { userId: user.id }]);

    return (
        <>
            <Head>
                <title>{user.username}&apos;s page</title>
                <meta name="description" content="draw anything!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className="drawer drawer-mobile h-[93.2vh]">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                    <MainContent>
                        <h1 className="text-4xl font-bold mt-3 lg:pr-48">{user.name}&apos;s drawings</h1>
                        <div className="p-6"></div>
                        {isLoading && <div><Spinner /></div>}
                        <div className="grid grid-cols-3 gap-3">
                            {!isLoading && posts && posts.posts.map(post => {
                                return (
                                    <div key={post.id} className="flex flex-col w-full p-3">
                                        <Image width={500} height={500} src={sliceIfInvalid(post.imgSrc)} alt={`drawing called ${post.title}`} />
                                        <h2 className="text-xl font-bold self-center">{post.title}</h2>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </MainContent>

                    <Sidebar>
                        <li><Link href={"/"}>Home</Link></li>
                        <li><a onClick={() => signOut()}>Sign Out</a></li>
                    </Sidebar>
                </div>
                <Footer />
            </div>

        </>

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