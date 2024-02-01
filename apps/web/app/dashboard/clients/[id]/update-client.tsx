"use client"
import PageContent from "~/components/page-content";
import { ClientView } from "../client-view";
import { Button } from "@repo/ui/button";
import { useId } from "react";
import { fetchDelete, patchJSON } from "~/lib/api";
import { Client } from "database";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function UpdateClientView(props: { client: Client }) {
    const formSubmitId = useId()
    const router = useRouter()

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this client?")) {
            return
        }

        try {
            await fetchDelete("/api/clients/" + props.client.id)
            toast.success("Client deleted")
            router.replace("/dashboard/clients")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return <PageContent
        title={<h1>{props.client.firstName} {props.client.lastName}</h1>}
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
            client={props.client}
            onSave={async (client) => {
                console.log(client)
                await patchJSON("/api/clients/" + client.id, client)
                router.refresh()
            }}
        />
        <div className="mt-5 gap-5 grid md:grid-cols-2">
            <Link href={`/dashboard/orders?clientId=${props.client.id}`}>
                <Button className="w-full">View orders</Button>
            </Link>
            <Button className="bg-red-500 text-white" onClick={handleDelete}><Trash2Icon />Delete client</Button>
        </div>
    </PageContent>
}