"use client"

import { StoreIcon } from "lucide-react"
import PickerModal from "./picker-modal"
import { useQuery } from "@tanstack/react-query"
import { getRestaurants } from "~/actions/actions"
import { useMemo, useState } from "react"
import { Button } from "@repo/ui/button"

export type Restaurant = {
    id: string
    name: string
    country: string
    address: string
}

export type PickRestaurantDialogProps = {
    value?: string
    onValueChange?: (restaurantId?: string) => void
    name?: string
}

export default function PickRestaurantDialog(props: PickRestaurantDialogProps) {
    const { data: restaurants } = useQuery({
        queryKey: ['restaurants'],
        queryFn: async () => await getRestaurants()
    })

    const [savedValue, setSavedValue] = useState(props.value)

    const value = props.onValueChange ? props.value : savedValue

    const currentRestaurant = useMemo(() => {
        return restaurants?.find(user => user.id === value)
    }, [value, restaurants, props.onValueChange])

    return <PickerModal
        searchLabel="Restaurant"
        options={restaurants?.map(restaurant => ({
            icon: <StoreIcon />,
            label: restaurant.name,
            description: `${restaurant.country}, ${restaurant.address}`,
            value: restaurant.id
        }))}
        onOptionSelected={value => {
            setSavedValue(value)
            props.onValueChange?.(value)
        }}
    >
        <input type="hidden" name={props.name} value={value || ''} />
        {!currentRestaurant && <Button type="button" className="w-full h-[64px] text-center flex gap-2 items-center">
            <StoreIcon />
            Choose restaurant
        </Button>}
        {currentRestaurant && <Button type="button" className="w-full flex justify-start items-center gap-3">
            <StoreIcon />
            <div className="text-left">
                <p>{currentRestaurant.name}</p>
                <p className="text-xs">{currentRestaurant.country}, {currentRestaurant.address}</p>
            </div>
        </Button>}
    </PickerModal>
}