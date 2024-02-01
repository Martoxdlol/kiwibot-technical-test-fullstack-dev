"use client"

import { Button } from "@repo/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
    return <Button className="mb-6 mr-6" onClick={() => void signOut()}>Sign out</Button>
}