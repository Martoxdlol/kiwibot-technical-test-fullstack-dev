import { prisma } from "database";
import PageContent from "~/components/page-content";
import UpdateClientView from "./update-client";

export default async function UpdateClientPage(props: { params: { id: string } }) {
    const client = await prisma.client.findUnique({
        where: {
            id: props.params.id
        }
    })

    if (!client) {
        return <PageContent title={<h1>Client not found</h1>}>
            <p>The client you are looking for doesn't exist</p>
        </PageContent>
    }

    return <UpdateClientView client={client} />
}