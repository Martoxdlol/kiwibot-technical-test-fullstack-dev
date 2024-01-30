"use client"

import { Button } from "@repo/ui/button"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import PageContent from "~/components/page-content"

export default function OrdersPage() {
    const router = useRouter()

    return <PageContent
        title="Orders"
        floatingActionButton={<Button className="mb-6 mr-6" onClick={() => {
            router.push('/dashboard/orders/new')
        }}>
            <PlusIcon /><span>New order</span>
        </Button>}
    >
        Orders page
    </PageContent>
}