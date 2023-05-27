'use client'
import PasswordChangeForm from "@/components/Forms/PasswordChangeForm";
import useUser from "@/hooks/useUser";
import { Box, Typography } from "@mui/joy";

export default function ProfilePage() {
    const user = useUser()
    return (
        <Box>
            <Typography>
                Profile page:
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </Typography>
            <PasswordChangeForm />
        </Box>
    )
}