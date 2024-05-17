"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Overview() {
    const { data: session } = useSession();

    return (
        <div>
            <div>
                <div>{session?.user?.name}</div>
                <div>{session?.user?.email}</div>
            </div>

            <div>
                <button onClick={() => signOut()}>Logout</button>
            </div>
        </div>
    )
}
