import { Avatar, Divider, GlobalStyles, List, ListItem, ListItemButton, Sheet } from "@mui/joy";
import ThemeToggle from "./ThemeToggle";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import Link from "next/link"
import { usePathname } from 'next/navigation';
import useUser from "@/hooks/useUser";
import SignOutButton from "./SignOutButton";


export default function Navbar() {
    const activePath = usePathname()
    const user = useUser()
    return (
        <>
            <Sheet
                className="FirstSidebar"
                variant="soft"
                color="primary"
                invertedColors
                sx={{
                    position: {
                        xs: 'fixed',
                        md: 'sticky',
                    },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                        md: 'none',
                    },
                    transition: 'transform 0.4s',
                    zIndex: 10000,
                    height: '100dvh',
                    width: 'var(--FirstSidebar-width)',
                    top: 0,
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <GlobalStyles
                    styles={(theme) => ({
                        ':root': {
                            '--FirstSidebar-width': '68px',
                        },
                    })}
                />
                <List sx={{ '--ListItem-radius': '8px', '--List-gap': '12px' }}>
                    <ListItem>
                        <Link href={'/'}>
                            <ListItemButton
                                selected={activePath === '/'}
                                variant={activePath === '/' ? "solid" : "plain"}
                            >
                                <HomeRoundedIcon sx={{ fontSize: 30 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/diseases'}>
                            <ListItemButton
                                selected={activePath === '/diseases'}
                                variant={activePath === '/diseases' ? "solid" : "plain"}
                            >
                                <BarChartIcon sx={{ fontSize: 30 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href={'/manage'}>
                            <ListItemButton
                                selected={activePath === '/manage'}
                                variant={activePath === '/manage' ? "solid" : "plain"}
                            >
                                <SettingsIcon sx={{ fontSize: 30 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>

                </List>

                <Divider />
                <Link href={'/profile'}>
                    {user?.name ?
                        <Avatar size="sm">{user?.name[0]}</Avatar> :
                        <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />}
                </Link>


                <ThemeToggle />
                <SignOutButton />
            </Sheet >

        </>
    )
}