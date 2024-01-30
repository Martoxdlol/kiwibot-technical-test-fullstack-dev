"use client";

import { usePathname } from "next/navigation";
import { useId, useLayoutEffect } from "react";
import { cn } from "~/lib/utils";

export default function PageContent(props: {
    title: React.ReactNode,
    children: React.ReactNode,
    className?: string,
    floatingActionButton?: React.ReactNode,
}) {
    const path = usePathname();

    const containerId = useId();
    const navId = useId();

    useLayoutEffect(() => {
        document.getElementById(containerId)?.animate([
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


    useLayoutEffect(() => {
        const listener = () => {
            if (window.scrollY > 0) {
                document.getElementById(navId)?.classList.add('shadow-md');
            } else {
                document.getElementById(navId)?.classList.remove('shadow-md');
            }
        }

        window.addEventListener('scroll', listener)

        return () => {
            window.removeEventListener('scroll', listener)
        }
    }, [])

    return <>
        <div id={containerId}>
            <div className="sticky top-0 overflow-x-clip">
                <nav className="bg-primary h-[60px] flex items-center px-5 text-2xl transition-shadow" id={navId}>
                    {props.title}
                </nav>
            </div>
            <div className={cn('p-5', props.className)}>
                {props.children}
            </div>
        </div>
        {props.floatingActionButton && <aside className="fixed right-0 bottom-[60px] sm:bottom-0 z-10">
            {props.floatingActionButton}
        </aside>}
    </>
} 