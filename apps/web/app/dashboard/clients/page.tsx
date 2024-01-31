import { Button } from "@repo/ui/button";
import { Client, prisma } from "database";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import PageContent from "~/components/page-content";

export default async function ClientsPage() {
    const clients = await prisma.client.findMany()

    return <PageContent
        title="Clients"
        floatingActionButton={<Link href="/dashboard/clients/new" className="pr-6 pb-6 block"><Button>New Client</Button></Link>}
    >
        {clients.length === 0 && <div className="flex justify-center py-10">
            <p>Nothing here</p>
        </div>}

        <ul>
            {clients.map(client => {
                return <ClientTile key={client.id} client={client} />
            })}
        </ul>
    </PageContent>
}

function ClientTile(props: { client: Client }) {
    return <li className="mx-[-20px]">
        <Link href={`/dashboard/clients/${props.client.id}`} className="flex items-center gap-5 px-[20px] hover:bg-stone-100 active:bg-stone-200 py-2">
            <div className="shrink-0">
                <UserIcon />
            </div>
            <div className="text-left">
                <p>{props.client.firstName} {props.client.lastName}</p>
                <p className="text-xs">{props.client.country}, {props.client.address}</p>
            </div>
        </Link>
    </li>
}