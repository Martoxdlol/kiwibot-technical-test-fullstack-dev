import FullScreenCenter from "@repo/ui/full-screen-center"
import { Loader2Icon } from "lucide-react"

export default function FullScreenLoader() {
    return <FullScreenCenter>
        <Loader2Icon size={64} className="animate-spin" />
    </FullScreenCenter>
}