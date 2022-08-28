import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { requireAuth } from "../../server/common/requireAuth";
import { prisma } from '../../server/db/client'
import { InferGetServerSidePropsType } from 'next';
import { User } from "@prisma/client";
import Link from "next/link";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import Spinner from "../../components/Spinner";
import Image from "next/future/image";
import { sliceIfInvalid } from "../../utils/sliceStr";
import Layout from "../../components/Layout";

interface IProps {
    user: User
}


export default function UserPage({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { data, isLoading } = trpc.useQuery(['post.getPostsByUser', { userId: user.id }]);

    return (
        <>
            <Head>
                <title>{user.username}&apos;s page</title>
                <meta name="description" content="draw anything!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                {/* Main Content  */}
                <>
                    <h1 className="text-4xl font-bold mt-3 lg:pr-48">{user.name}&apos;s drawings</h1>
                    <div className="p-6"></div>
                    {isLoading && <div><Spinner /></div>}
                    <div className="grid grid-cols-3 gap-3 p-1">
                        {!isLoading && data && data.posts.map(post => {
                            return (
                                <Link href={`/drawing/${post.id}`} key={post.id}>
                                    <div className="flex flex-col w-full p-3 hover:bg-gray-500 hover:text-black transition-all duration-200 cursor-pointer">
                                        <Image width={500} height={500} src={sliceIfInvalid(post.imgSrc)} alt={`drawing called ${post.title}`} />
                                        <h2 className="text-xl font-bold self-center">{post.title}</h2>
                                    </div>
                                </Link>
                            )
                        }
                        )}
                    </div>
                </>

                {/* Sidebar */}
                <>
                    <li><Link href={"/"}>Home</Link></li>
                    <li><a onClick={() => signOut()}>Sign Out</a></li>

                </>
            </Layout>

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