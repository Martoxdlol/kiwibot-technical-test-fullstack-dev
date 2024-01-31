"use client"
import PageContent from "~/components/page-content";
import { RestaurantView } from "../restaurant-view";
import { Button } from "@repo/ui/button";
import { useId, useState } from "react";
import { postJSON } from "~/lib/api";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export default function NewRestaurantPage() {
    const formSubmitId = useId()

    const router = useRouter()

    const [creationIdempotencyKey] = useState(nanoid())

    return <PageContent
        title="New Restaurant"
        floatingActionButton={<div className="pr-6 pb-6">
            <Button
                onClick={() => {
                    const formSubmit = document.getElementById(formSubmitId) as HTMLButtonElement | undefined;
                    formSubmit?.click()
                }}
            >Save restaurant</Button>
        </div>}
    >
        <RestaurantView
            formSubmitId={formSubmitId}
            restaurant={{ name: "", phoneNumber: "", country: "", address: "" }}
            onSave={async (restaurant) => {
                const r = await postJSON("/api/restaurants", {
                    ...restaurant,
                    creationIdempotencyKey,
                })
                router.push("/dashboard/restaurants/" + r.entityId!)
            }}
        />
    </PageContent>
}