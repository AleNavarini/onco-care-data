import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import { Clipboard, Grid, Scissors } from 'react-feather';
import { Tooltip } from '@mui/joy';
import { usePathname } from 'next/navigation';
import { closeSidebar } from '@/utils';
import Link from 'next/link';

const routes = [
  { icon: <Grid size={20} />, title: 'Dashboards', href: '/dashboards' },
  { icon: <Clipboard size={20} />, title: 'Estudios', href: '/studies' },
  { icon: <Scissors size={20} />, title: 'Tratamientos', href: '/treatments' },
];

export default function SecondSidebar() {
  const pathname = usePathname();
  const previousPathname = pathname.split('/')[1];

  return (
    <React.Fragment>
      <Box
        className="SecondSidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 5,
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.body',
          opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            md: 'translateX(-100%)',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={closeSidebar}
      />
      <Sheet
        className="SecondSidebar"
        sx={{
          position: {
            xs: 'fixed',
            md: 'sticky',
          },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
            md: 'translateX(var(--FirstSidebar-width))',
          },
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'transform 0.4s',
          zIndex: 6,
          height: '100dvh',
          top: 0,
          py: 3,
          px: 1,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <List
          sx={{
            '--List-item-radius': '8px',
            '--List-item-minHeight': '32px',
            '--List-gap': '4px',
          }}
        >
          <ListSubheader role="presentation" sx={{ color: 'text.primary' }}>
            Menu
          </ListSubheader>
          {routes.map((route, index) => (
            <Link
              key={`link-for-${route.href}`}
              href={`/${previousPathname}${route.href}`}
              style={{ textDecoration: 'none' }}
            >
              <ListItem key={route.href}>
                <Tooltip title={route.title} placement="right">
                  <ListItemButton
                    selected={pathname.includes(route.href)}
                    variant={route.href === pathname ? 'solid' : 'plain'}
                    sx={{
                      borderRadius: '8px',
                    }}
                    onClick={closeSidebar}
                  >
                    <ListItemDecorator>{route.icon}</ListItemDecorator>
                    <ListItemContent>{route.title}</ListItemContent>
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </Link>
          ))}
        </List>
      </Sheet>
    </React.Fragment>
  );
}
