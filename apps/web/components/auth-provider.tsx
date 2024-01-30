import { Suspense } from "react";
import FullScreenLoader from "./full-screen-loader";
import FullScreenLogin from "./full-screen-login";
import { getAuthServerSession } from "~/server/auth";

export default async function AuthProvider(props: { children: React.ReactNode }) {
    return <Suspense fallback={<AuthProviderFallback />}>
        <AuthProviderContent children={props.children} />
    </Suspense>
}

async function AuthProviderContent(props: { children: React.ReactNode }) {
    const session = await getAuthServerSession();

    if(!session) {
        return <FullScreenLogin />
    }

    return <>{props.children}</>
}

function AuthProviderFallback() {
    return <FullScreenLoader />
}