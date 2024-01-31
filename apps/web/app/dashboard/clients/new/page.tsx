"use client"
import PageContent from "~/components/page-content";
import { ClientView } from "../client-view";
import { Button } from "@repo/ui/button";
import { useId } from "react";
import { postJSON } from "~/lib/api";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export default function NewClientPage() {
    const formSubmitId = useId()

    const router = useRouter()

    return <PageContent
        title="New Client"
        floatingActionButton={<div className="pr-6 pb-6">
            <Button
                onClick={() => {
                    const formSubmit = document.getElementById(formSubmitId) as HTMLButtonElement | undefined;
                    formSubmit?.click()
                }}
            >Save client</Button>
        </div>}
    >
        <ClientView
            formSubmitId={formSubmitId}
            client={{ firstName: "", lastName: "", phoneNumber: "", country: "", address: "" }}
            onSave={async (client) => {
                const r = await postJSON("/api/clients", {
                    ...client,
                    creationIdempotencyKey: nanoid(),
                })
                router.push("/dashboard/clients/" + r.entityId!)
            }}
        />
    </PageContent>
}