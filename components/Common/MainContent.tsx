import { LinearProgress, Sheet } from "@mui/joy";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MainContent(props: { children?: React.ReactNode }) {
    const session = useSession()
    if (session.status === "unauthenticated") redirect('/api/auth/signin')

    if (session.status === "loading") {
        return (
            <LinearProgress />
        )
    }
    return (
        <Sheet sx={{
            minWidth: '100%',
            px: 2,
            py: {
                xs: 8,
                md: 2
            },
        }
        } >
            {props.children}
        </Sheet>
    )
}