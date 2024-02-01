import { Card } from "@repo/ui/card";
import { prisma } from "database";
import { ChefHat, StoreIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import PageContent from "~/components/page-content";
import SignOutButton from "~/components/signout-button";

export default async function DashboardHome() {
    const pendingOrders = await prisma.order.count({
        where: {
            status: "PENDING"
        }
    })

    const inProgressOrders = await prisma.order.count({
        where: {
            status: "IN_PROGRESS"
        }
    })

    return <PageContent
        title={<h1>Overview</h1>}
        floatingActionButton={<SignOutButton />}
    >
        <div className="flex flex-col gap-5">
            <h2>
                Welcome to the kiwi-ressto restaurant order processing system!
            </h2>
            <Link href="/dashboard/orders">
                <Card className="flex gap-2 items-center py-5">
                    <ChefHat /><p>{pendingOrders} pending orders, {inProgressOrders} in progress</p>
                </Card>
            </Link>
            <Link href="/dashboard/clients">
                <Card className="flex gap-2 items-center py-5">
                    <UsersIcon /><p>Manage clients</p>
                </Card>
            </Link>
            <Link href="/dashboard/restaurants">
                <Card className="flex gap-2 items-center py-5">
                    <StoreIcon /><p>Manage restaurants</p>
                </Card>
            </Link>
        </div>
    </PageContent>
}