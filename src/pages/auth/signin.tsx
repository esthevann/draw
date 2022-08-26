import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import SignInButton from "../../components/SignInButton";
import { getServerAuthSession } from "../../server/common/auth";
import { getProviders } from "next-auth/react";

type Providers = NonNullable<Awaited<ReturnType<typeof getProviders>>>;

export default function SignInPage({ providers }: { providers: Providers }) {
    return (
        <>
            <Head>
                <title>Sign In - Anydraw</title>
            </Head>

            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col gap-6 border p-12">
                    <h1 className="text-3xl font-bold">Please log in to use Anydraw</h1>
                    <div className="flex flex-col gap-1">
                        {Object.values(providers).map((provider) => {
                            console.log(provider);
                            return (
                                <SignInButton provider={provider.id} key={provider.name} />
                                )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

// @ts-expect-error typescript is hard
export const getServerSideProps: GetServerSideProps<Providers> = async (context: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(context);

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    const providers = await getProviders();

    if (!providers) {
        return {
            notFound: true
        }
    }


    return {
        props: {
            providers
        }
    };
}