import { Box, LinearProgress } from '@mui/joy';

interface Props {
  condition: boolean;
  wrapper: any;
  children: any;
}

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10000,
        display: 'flex',
      }}
    >
      <LinearProgress variant="soft" sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)' }} />
    </Box>
  );
}
