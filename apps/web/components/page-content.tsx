"use client";

import { usePathname } from "next/navigation";
import { useId, useLayoutEffect } from "react";
import { cn } from "~/lib/utils";

export default function PageContent(props: { title: React.ReactNode, children: React.ReactNode, className?: string }) {
    const path = usePathname();

    const id = useId();

    useLayoutEffect(() => {
        document.getElementById(id)?.animate([
            {
                opacity: 0.6,
                transform: 'scale(0.85)',
            },
            {
                opacity: 1,
                transform: 'scale(1)',
            }
        ], {
            duration: 200,
            fill: 'forwards'
        });
    }, [path]);


    return <div id={id}>
        <nav className="bg-appbar h-[60px] flex items-center px-5 text-2xl sticky top-0">
            {props.title}
        </nav>
        <main className={cn('p-5', props.className)}>
            {props.children}
        </main>
    </div>
} 