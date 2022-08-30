import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import Layout from "../../components/Layout"
import { prisma } from "../../server/db/client"
import { sliceIfInvalid } from "../../utils/sliceStr"
import Image from "next/future/image";
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { trpc } from "../../utils/trpc"
import Spinner from "../../components/Spinner"
import { useRouter } from "next/router"
import { useState } from "react"
import Toast from "../../components/Toast"

interface IParams extends ParsedUrlQuery {
    id: string
}


export default function PostPage({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const session = useSession();
    const { data: post, isLoading } = trpc.useQuery(["postsUnprotected.getPostById", { postId: id }]);
    const deleteMutater = trpc.useMutation("post.deletePost");
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const queryClient = trpc.useContext();

    function handleDelete(username: string) {
        deleteMutater.mutate({ postId: id }, {
            onSuccess: () => {
                queryClient.invalidateQueries("post.getPostsByUser");
                setSuccess("Post deleted successfully");
                setTimeout(() => {
                    setSuccess("");
                    if (username === "") {
                        router.push("/");
                    } else {
                        router.push(`/user/${username}`);
                    }
                }, 2000);
            },
            onError: (error) => {
                console.log(error)
            }
        });
    }

    return (
        <>
            <Head>
                <title>{!isLoading && post ? `${post.title} by ${post.User?.username}`: "Drawing"}</title>
                <meta name="description" content="draw anything!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                {/* Main Content  */}
                <>
                    {isLoading && (
                        <>
                            <Spinner />
                        </>
                    )}

                    {post && (
                        <>


                            <h1 className="text-4xl font-bold mt-3 lg:pr-48">{post.title} by {post.User?.name}</h1>
                            <div className="p-3"></div>
                            <div className="flex gap-3 justify-center">
                                <Image width={1000} height={600} src={sliceIfInvalid(post.imgSrc)} alt={`drawing called ${post.title}`} />

                                <div className="flex flex-col gap-1">
                                    {session.status === "authenticated" && post && (
                                        <button className="btn btn-warning" onClick={() => handleDelete(post.User?.username || "")}>Delete</button>
                                    )}
                                    <button className="btn">Copy permalink</button>
                                </div>
                            </div>





                        </>
                    )}

                </>

                {/* Sidebar */}
                <>
                    <li><Link href={"/"}>Home</Link></li>
                    {session.status === "authenticated" && <li><a onClick={() => signOut()}>Sign Out</a></li>}
                </>
            </Layout>

            {success && (
                <Toast text={success} type="success" />
            )}
        </>
    )
}




export const getServerSideProps: GetServerSideProps<{ id: string }> = async (context) => {
    const { id } = context.params as IParams

    const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });

    if (!post) {
        return {
            notFound: true
        }
    }

    // Pass post id to the page via props
    return {
        props: {
            id: post.id
        }
    }
}
