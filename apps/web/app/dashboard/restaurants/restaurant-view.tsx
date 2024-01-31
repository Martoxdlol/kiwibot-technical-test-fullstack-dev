"use client"
import FilledInput from "@repo/ui/filled-input";
import { toast } from "sonner";

export function RestaurantView(props: {
    formSubmitId: string;
    restaurant: {
        id?: string;
        name: string;
        phoneNumber: string;
        country: string;
        address: string;
    }
    onSave: (restaurant: typeof props.restaurant) => Promise<unknown>;
}) {

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const country = formData.get("country") as string;
        const address = formData.get("address") as string;
        const phoneNumber = formData.get("phoneNumber") as string;

        if (!name.trim() || !country.trim() || !address.trim() || !phoneNumber.trim()) {
            return;
        }

        try {
            await props.onSave({ id: props.restaurant.id, name, country, address, phoneNumber });
            toast.success("Restaurant saved");
        } catch (error) {
            console.error(error);
            toast.error((error as Error).message);
        }
    }

    return <div>
        <form className="grid md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            <FilledInput label="Name" name="name" defaultValue={props.restaurant.name} placeholder="e.g. San Martin Steakhouse" />
            <FilledInput label="Country" name="country" defaultValue={props.restaurant.country} placeholder="e.g. USA" />
            <FilledInput label="Address" name="address" defaultValue={props.restaurant.address} placeholder="e.g. 123 Main St" />
            <FilledInput label="Phone Number" name="phoneNumber" defaultValue={props.restaurant.phoneNumber} type="tel" placeholder="e.g. +1 123 896 3654" />
            <button id={props.formSubmitId} type="submit" className="hidden">Submit</button>
        </form>
    </div>
}