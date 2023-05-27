import { Avatar, Box, Divider, List, ListItem, ListItemButton, Sheet } from "@mui/joy";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <>
            <Sheet
                className="FirstSidebar"
                variant="soft"
                color="primary"
                sx={{
                    position: {
                        xs: 'fixed',
                        md: 'sticky',
                    },
                    zIndex: 10000,
                    height: '100dvh',
                    width: '5dvw',
                    top: 0,
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <List sx={{ '--ListItem-radius': '8px', '--List-gap': '12px' }}>
                    <ListItem>
                        <ListItemButton>
                            <i data-feather="home" />
                        </ListItemButton>
                    </ListItem>

                </List>
                <List
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': '8px',
                        '--List-gap': '8px',
                    }}
                >
                    <ListItem>
                        <ListItemButton>
                            <i data-feather="life-buoy" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <i data-feather="settings" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />
                <ThemeToggle />
            </Sheet >

        </>
    )
}