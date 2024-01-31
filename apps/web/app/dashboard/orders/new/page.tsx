"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import FilledInput from "@repo/ui/filled-input";
import { CheckIcon, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import PageContent from "~/components/page-content";
import PickCustomerDialog from "~/components/pick-customer-dialog";
import PickRestaurantDialog from "~/components/pick-restaurant-dialog";
import { OrderItem, placeOrder } from "~/lib/api";
import { nanoid } from "nanoid";

export default function NewOrderPage() {

    const [items, setItems] = useState<OrderItem[]>([])

    const [description, setDescription] = useState<string>("")
    const [unitPrice, setUnitPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    function addItem() {
        if (!description.trim() || !unitPrice || !quantity) {
            return
        }

        const qty = parseInt(quantity)

        if (!Number.isInteger(qty) || qty < 1) {
            return
        }

        const price = parseFloat(unitPrice)

        if (isNaN(price) || price < 0) {
            return
        }

        setItems([...items, {
            description,
            quantity: parseInt(quantity),
            unitPrice: parseFloat(unitPrice),
            key: nanoid(),
        }])

        setDescription('')
        setUnitPrice('')
        setQuantity('')
    }

    const totalPrice = useMemo(() => {
        return items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)
    }, [items])

    const totalItems = useMemo(() => {
        return items.reduce((acc, item) => acc + item.quantity, 0)
    }, [items])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (items.length === 0) {
            return
        }

        const data = new FormData(e.target as HTMLFormElement)

        const customerId = data.get('customerId')
        const restaurantId = data.get('restaurantId')

        if(!customerId || !restaurantId) {
            return
        }

        const order = {
            customerId: customerId as string,
            restaurantId: restaurantId as string,
            items
        }

        try {
            await placeOrder(order)
        } catch (error) {
            console.error(error)
        }
    }

    return <form onSubmit={handleSubmit}>
        <PageContent
            title="New order"
            floatingActionButton={<OrderSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
            />}
        >
            <div className="grid md:grid-cols-2 gap-5">
                <PickCustomerDialog name="customerId" />
                <PickRestaurantDialog name="restaurantId" />
                <div className="col-span-2 space-y-3">

                    {items.length === 0 && <div className="border border-primary-strong border-dashed rounded-md py-10 flex justify-center font-medium text-lg">
                        No items added yet!
                    </div>}

                    {items.map((item, i) => <Card key={item.key} className="p-5 flex" >
                        {item.description} x {item.quantity} @ ${item.unitPrice.toFixed(2)}
                    </Card>)}

                    <Card className="bg-white">
                        <h2 className="pt-5 pb-2">Add item to order</h2>
                        <div className="grid grid-cols-3 md:grid-cols-[1fr_120px_120px_80px] gap-2 pb-5">
                            <FilledInput
                                label="Description"
                                className="w-full col-span-3 md:col-span-1"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <FilledInput
                                label="Quantity"
                                type="number"
                                placeholder="0"
                                min={1}
                                max={1000}
                                step={1}
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                            />
                            <FilledInput
                                label="Unit price"
                                type="number"
                                placeholder="0"
                                min={1}
                                max={1000000}
                                step={0.01}
                                value={unitPrice}
                                onChange={e => setUnitPrice(e.target.value)}
                            />
                            <Button type="button" onClick={addItem}><CheckIcon /></Button>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="h-[50px]" />
        </PageContent>
    </form>
}


function OrderSummary(props: {
    totalItems: number
    totalPrice: number
    onPlaceOrder?: () => void
    isLoading?: boolean
}) {


    return <div className="w-[100%] h-[52px] sm:w-[350px] sm:m-3 sm:rounded-md bg-secondary text-white flex justify-between overflow-hidden">
        <div className="px-5 py-2">
            <p className="text-sm">{props.totalItems} {props.totalItems === 1 ? 'item' : 'items'}</p>
            <p className="text-xs">Total: ${props.totalPrice.toFixed(2)}</p>
        </div>
        <div>
            {props.totalItems > 0 && <button
                className="h-[52px] px-5 hover:bg-black hover:bg-opacity-20 bg-green-900"
                disabled={props.isLoading}
            >
                {props.isLoading && <Loader2 className="animate-spin" />}
                {!props.isLoading && "Place order"}
            </button>}
        </div>
    </div>
}