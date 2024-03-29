import { useId } from "react"
import { cn } from "./utils"

export type FilledInputProps = React.ComponentProps<'input'> & {
    label: React.ReactNode
    inputClassName?: string
    validator?: (value: string) => string | undefined
}

export default function FilledInput({ label, type, className, inputClassName, ...props }: FilledInputProps) {
    const autoId = useId()
    const id = props.id ?? autoId
    return <div className={cn("bg-primary rounded-t-md border-b-primary-strong border-b-2 focus-within:border-secondary", className)}>
        <label htmlFor={id} className="font-medium text-xs pl-1 text-stone-500">{label}</label>
        <input
            type={type ?? "text"}
            className={cn("outline-none bg-transparent w-full border-transparent py-2 px-1", inputClassName)}
            {...props} id={id}
        />
    </div>
}