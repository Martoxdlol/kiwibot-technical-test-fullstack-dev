import { Button } from "@repo/ui/button";
import { Restaurant, prisma } from "database";
import { StoreIcon } from "lucide-react";
import Link from "next/link";
import PageContent from "~/components/page-content";

export default async function RestaurantsPage() {
    const restaurants = await prisma.restaurant.findMany()

    return <PageContent
        title="Restaurants"
        floatingActionButton={<Link href="/dashboard/restaurants/new" className="pr-6 pb-6 block"><Button>New Restaurant</Button></Link>}
    >
        {restaurants.length === 0 && <div className="flex justify-center py-10">
            <p>Nothing here</p>
        </div>}

        <ul>
            {restaurants.map(restaurant => {
                return <RestaurantTile key={restaurant.id} restaurant={restaurant} />
            })}
        </ul>
    </PageContent>
}

function RestaurantTile(props: { restaurant: Restaurant }) {
    return <li className="mx-[-20px]">
        <Link href={`/dashboard/restaurants/${props.restaurant.id}`} className="flex items-center gap-5 px-[20px] hover:bg-stone-100 active:bg-stone-200 py-2">
            <div className="shrink-0">
                <StoreIcon />
            </div>
            <div className="text-left">
                <p>{props.restaurant.name}</p>
                <p className="text-xs">{props.restaurant.country}, {props.restaurant.address}</p>
            </div>
        </Link>
    </li>
}