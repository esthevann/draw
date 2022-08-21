import { GetServerSidePropsContext } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { getServerAuthSession } from "../../server/common/auth";
import { trpc } from "../../utils/trpc";

export default function NewUser() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const session = useSession({ required: true });
    const usernameMutater = trpc.useMutation("user.addUsername");

    function submitter(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (username === "") {
            return;
        }
        try {
            usernameMutater.mutate({ username }, {
                onSuccess: () => {
                    setUsername("");
                    setSuccess("Username added successfully");
                    setTimeout(() => setSuccess(""), 3000);
                    setTimeout(() => signIn(), 4000);
                    return;
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setTimeout(() => setError(""), 3000);
            }
        }
        return;
    }
    return (
        <>
            <Head>
                <title>Finish your profile - Anydraw</title>
                <meta name="description" content="draw anything!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className="form-control justify-center border p-12">
                    {session.status == "loading" && (
                        <div className="flex justify-center items-center">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" />
                        </div>
                    )}
                    {session.status == "authenticated" && (
                        <div className="flex justify-between items-center">
                            <form onSubmit={submitter}>
                                <h1 className="text-3xl font-bold">{session.data?.user?.name ? session.data?.user?.name : ""}! Please finish your profile.</h1>
                                <div className="p-3"></div>
                                <label className="label" htmlFor="username-input">
                                    <span className="label-text">Enter your username:</span>
                                </label>
                                <input type="text" placeholder="Type here" value={username}
                                    id="username-input"
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input input-bordered input-primary w-full max-w-xs" />
                                <div className="p-3"></div>
                                <button className="btn btn-primary">Save</button>
                            </form>
                            <div>
                                <ul className="list-disc">
                                    <li>must be unique and can be changed</li>
                                    <li>must be at least 3 characters and cannot contain spaces.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                {error && (
                    <div className="toast">
                        <div className="alert alert-error">
                            <div><span>{error}</span></div>
                        </div>
                    </div>
                )}
                {success && (
                    <div className="toast">
                        <div className="alert alert-success">
                            <div><span>{success}</span></div>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);
    
    if (!session) {
      return {
        redirect: {
          destination: "/api/auth/signin",
          permanent: false,
        }
      }
    } 

    if (session?.user?.username) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    
    return {
      props: {
        session
      },
    };
  };