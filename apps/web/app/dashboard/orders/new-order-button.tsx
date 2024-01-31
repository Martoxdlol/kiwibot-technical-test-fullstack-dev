"use client";

import { Button } from "@repo/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewOrderButton() {
    const router = useRouter()

    return <Button className="mb-6 mr-6" onClick={() => {
        router.push('/dashboard/orders/new')
    }}>
        <PlusIcon /><span>New order</span>
    </Button>
}