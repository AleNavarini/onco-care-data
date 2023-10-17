'use client';
import { toggleSidebar } from '@/utils';
import { Divider, GlobalStyles, IconButton, Sheet } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        py: 1,
        px: 2,
        gap: 1,
        ml: 0,
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="md"
        sx={{
          position: 'relative',
          width: '5%',
          left: '90%',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Divider />
    </Sheet>
  );
}
