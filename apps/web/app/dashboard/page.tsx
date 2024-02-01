"use client"

import { Button } from "@repo/ui/button";
import { signOut } from "next-auth/react";
import PageContent from "~/components/page-content";

export default function DashboardHome() {
    return <PageContent
        title={<h1>Overview</h1>}
        floatingActionButton={<Button className="mb-6 mr-6" onClick={() => void signOut()}>Sign out</Button>}
    >
        Welcome to the dashboard!
    </PageContent>
}