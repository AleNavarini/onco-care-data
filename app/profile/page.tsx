'use client'
import useUser from "@/hooks/useUser";
import { Typography } from "@mui/joy";

export default function ProfilePage() {
    const user = useUser()
    return (
        <Typography>
            Profile page:

            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </Typography>
    )
}