import { Suspense } from "react";
import FullScreenLoader from "./full-screen-loader";
import FullScreenLogin from "./full-screen-login";
import { getAuthServerSession } from "~/server/auth";
import UserInfoProvider from "./user-info-provider";

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

    return <UserInfoProvider userInfo={{
        email: session.user?.email || 'nomail',
        name: session.user?.name || 'noname',
    }}>{props.children}</UserInfoProvider>
}

function AuthProviderFallback() {
    return <FullScreenLoader />
}