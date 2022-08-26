import { signIn } from "next-auth/react";


export default function SignInButton({ provider }: { provider: string }) {
    return (
        <button className="btn btn-secondary" onClick={() => signIn(provider, {callbackUrl: "/"})}>Sign in with {provider}</button>
    )

}