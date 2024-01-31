"use client"
import PageContent from "~/components/page-content";
import { RestaurantView } from "../restaurant-view";
import { Button } from "@repo/ui/button";
import { useId } from "react";
import { fetchDelete, patchJSON } from "~/lib/api";
import { Restaurant } from "database";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

export default function UpdateRestaurantView(props: { restaurant: Restaurant }) {
    const formSubmitId = useId()
    const router = useRouter()

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this restaurant?")) {
            return
        }

        try {
            await fetchDelete("/api/restaurants/" + props.restaurant.id)
            toast.success("Restaurant deleted")
            router.replace("/dashboard/restaurants")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return <PageContent
        title={`${props.restaurant.name}`}
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
            restaurant={props.restaurant}
            onSave={async (restaurant) => {
                console.log(restaurant)
                await patchJSON("/api/restaurants/" + restaurant.id, restaurant)
                router.refresh()
            }}
        />
        <div className="mt-5">
            <Button className="bg-red-500 text-white" onClick={handleDelete}><Trash2Icon />Delete restaurant</Button>
        </div>
    </PageContent>
}