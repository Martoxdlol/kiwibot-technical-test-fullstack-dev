"use client"
import FilledInput from "@repo/ui/filled-input";
import { toast } from "sonner";

export function ClientView(props: {
    formSubmitId: string;
    client: {
        id?: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        country: string;
        address: string;
    }
    onSave: (client: typeof props.client) => Promise<unknown>;
}) {

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const country = formData.get("country") as string;
        const address = formData.get("address") as string;
        const phoneNumber = formData.get("phoneNumber") as string;

        if(!firstName.trim() || !lastName.trim() || !country.trim() || !address.trim() || !phoneNumber.trim()) {    
            return;
        }

        try {
            await props.onSave({ id: props.client.id, firstName, lastName, country, address, phoneNumber });
            toast.success("Client saved");
        } catch (error) {
            console.error(error);
            toast.error((error as Error).message);
        }
    }

    return <div>
        <form className="grid md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
            <FilledInput label="First Name" name="firstName" defaultValue={props.client.firstName} placeholder="e.g. John" />
            <FilledInput label="Last Name" name="lastName" defaultValue={props.client.lastName} placeholder="e.g. Doe" />
            <FilledInput label="Country" name="country" defaultValue={props.client.country} placeholder="e.g. USA" />
            <FilledInput label="Address" name="address" defaultValue={props.client.address} placeholder="e.g. 123 Main St" />
            <FilledInput label="Phone Number" name="phoneNumber" defaultValue={props.client.phoneNumber} type="tel" placeholder="e.g. +1 123 896 3654"/>
            <button id={props.formSubmitId} type="submit" className="hidden">Submit</button>
        </form>
    </div>
}