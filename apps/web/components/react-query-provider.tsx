"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ReactQueryProvider(props: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>
        {props.children}
    </QueryClientProvider>
}