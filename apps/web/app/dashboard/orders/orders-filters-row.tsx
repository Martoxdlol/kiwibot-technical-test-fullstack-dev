"use client"
import { Button } from "@repo/ui/button";
import FilledInput from "@repo/ui/filled-input";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "~/lib/utils";

export function OrdersFilterRow() {
    const router = useRouter()

    const sp = useSearchParams()
    const searchParams = new URLSearchParams(sp.toString())

    const status = new Set(sp.get('status') != undefined ? sp.get('status')!.split(',').filter(Boolean) : ['PENDING', 'IN_PROGRESS'])

    const showingPending = status.has('PENDING')
    const showingInProgress = status.has('IN_PROGRESS')
    const showingCompleted = status.has('COMPLETED')

    return <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <Button
            className={cn({
                'opacity-50': !showingPending,
            })}
            onClick={() => {
                if (showingPending) {
                    status.delete('PENDING')
                } else {
                    status.add('PENDING')
                }
                searchParams.set('status', [...status].join(','))
                router.replace('?' + searchParams)
            }}>
            Pending
        </Button>

        <Button
            className={cn({
                'opacity-50': !showingInProgress,
            })}
            onClick={() => {
                if (showingPending) {
                    status.delete('IN_PROGRESS')
                } else {
                    status.add('IN_PROGRESS')
                }
                searchParams.set('status', [...status].join(','))
                router.replace('?' + searchParams)
            }}>
            In Progress
        </Button>

        <Button
            className={cn({
                'opacity-50': !showingCompleted,
            })}
            onClick={() => {
                if (showingCompleted) {
                    status.delete('COMPLETED')
                } else {
                    status.add('COMPLETED')
                }
                searchParams.set('status', [...status].join(','))
                router.replace('?' + searchParams)
            }}>
            Completed
        </Button>

        <FilledInput
            label="From date"
            type="date"
            defaultValue={dayjs().format('YYYY-MM-DD')}
            onChange={e => {
                searchParams.set('date', e.target.value)
                router.replace('?' + searchParams)
            }}
        />
    </div>
}