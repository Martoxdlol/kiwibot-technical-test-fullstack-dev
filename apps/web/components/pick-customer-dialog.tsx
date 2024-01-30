"use client"

import { UserIcon } from "lucide-react"
import PickerModal from "./picker-modal"
import { useQuery } from "@tanstack/react-query"
import { getCustomers } from "~/actions/actions"
import { useMemo, useState } from "react"
import { Button } from "@repo/ui/button"

export type Customer = {
    id: string
    firstName: string
    lastName: string
    country: string
    address: string
}

export type PickCustomerDialogProps = {
    value?: string
    onValueChange?: (customerId?: string) => void
    name?: string
}

export default function PickCustomerDialog(props: PickCustomerDialogProps) {
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => await getCustomers()
    })

    const [savedValue, setSavedValue] = useState(props.value)

    const value = props.onValueChange ? props.value : savedValue

    const currentCustomer = useMemo(() => {
        return users?.find(user => user.id === value)
    }, [value, users, props.onValueChange])

    return <PickerModal
        searchLabel="Customer"
        options={users?.map(user => ({
            icon: <UserIcon />,
            label: `${user.firstName} ${user.lastName}`,
            description: `${user.country}, ${user.address}`,
            value: user.id
        }))}
        onOptionSelected={value => {
            setSavedValue(value)
            props.onValueChange?.(value)
        }}
    >
        <input type="hidden" name={props.name} value={value || ''} />
        {!currentCustomer && <Button type="button" className="w-full h-[64px] text-center flex gap-2 items-center">
            <UserIcon />
            Choose customer
        </Button>}
        {currentCustomer && <Button type="button" className="w-full flex justify-start items-center gap-3">
            <UserIcon />
            <div className="text-left">
                <p>{currentCustomer.firstName} {currentCustomer.lastName}</p>
                <p className="text-xs">{currentCustomer.country}, {currentCustomer.address}</p>
            </div>
        </Button>}
    </PickerModal>
}