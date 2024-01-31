import { prisma } from "database";
import PageContent from "~/components/page-content";
import UpdateClientView from "./update-restaurant";

export default async function UpdateRestaurantPage(props: { params: { id: string } }) {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id: props.params.id
        }
    })

    if (!restaurant) {
        return <PageContent title="Restaurant not found">
            <p>The restaurant you are looking for doesn't exist</p>
        </PageContent>
    }

    return <UpdateClientView restaurant={restaurant} />
}