import type { Post, User } from "@prisma/client"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import Layout from "../../components/Layout"
import { prisma } from "../../server/db/client"
import { sliceIfInvalid } from "../../utils/sliceStr"
import Image from "next/future/image";
import Link from "next/link"
import { signOut } from "next-auth/react"

interface IParams extends ParsedUrlQuery {
    id: string
}

type PostWithUser = (Post & {
    User: User | null;
})


export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>page</title>
                <meta name="description" content="draw anything!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                {/* Main Content  */}
                <>
                    <h1 className="text-4xl font-bold mt-3 lg:pr-48">{post.title} by {post.User?.name}</h1>
                    <div className="p-3"></div>
                    <Image width={1000} height={600} src={sliceIfInvalid(post.imgSrc)} alt={`drawing called ${post.title}`} />
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

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await prisma.post.findMany({});

    const paths = posts.map((post) => ({
        params: { id: post.id },
    }));

    return {
        paths,
        fallback: "blocking"
    }
}



export const getStaticProps: GetStaticProps<{ post: PostWithUser }> = async (context) => {
    const { id } = context.params as IParams

    const post = await prisma.post.findUnique({ where: { id }, include: { User: true } });

    if (!post) {
        return {
            notFound: true
        }
    }

    // Pass post data to the page via props
    return {
        props: {
            post
        }
    }
}
