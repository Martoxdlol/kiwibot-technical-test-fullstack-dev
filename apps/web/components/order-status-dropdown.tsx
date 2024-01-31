"use client"

import type { OrderStatus } from 'database';
import { ChevronDownIcon, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { patchJSON } from '~/lib/api';
import { cn } from '~/lib/utils';

const statusLabels = {
    'PENDING': 'Pending',
    'IN_PROGRESS': 'In progress',
    'COMPLETED': 'Completed',
}

export default function OrderStatusDropdown(props: { status: OrderStatus, orderId: string }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    function handleUpdateStatus(status: OrderStatus) {
        setVisible(false)
        setLoading(true)
        patchJSON(`/api/orders/${props.orderId}`, { status }).then(() => {
            router.refresh()
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            console.error(e)
        })
    }

    return <div className='w-[110px]' onClick={e => {
        e.preventDefault()
    }}>
        <button
            onClick={() => setVisible(!visible)}
            className={cn('flex items-center justify-between w-full', {
                'text-orange-500': props.status === 'PENDING',
                'text-secondary': props.status === 'COMPLETED',
            })}
            disabled={loading}
        >
            <span>{statusLabels[props.status]!}</span>
            {!loading && <ChevronDownIcon size={16} /> || <Loader2Icon  className="animate-spin" size={16} />}
        </button>
        <div className={cn('shadow-sm bg-white rounded-md border border-primary-strong w-[110px]', {
            'absolute': visible,
            'hidden': !visible
        })} tabIndex={0}
            onBlur={() => setVisible(false)}
        >
            {props.status === 'PENDING' && <button disabled={loading} className='text-black px-2 py-1' onClick={() => handleUpdateStatus('IN_PROGRESS')}>In progress</button>}
            {props.status !== 'COMPLETED' && <button disabled={loading} className='text-secondary px-2 py-1' onClick={() => handleUpdateStatus('COMPLETED')}>Completed</button>}
        </div>
    </div>

}