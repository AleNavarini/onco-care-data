'use client'
import { Box, Typography } from '@mui/joy'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'Profile page'
};

export default function Home() {
  return (
    <Box>
      <Typography level="h4" component="h1">
        Main page
      </Typography>
    </Box>
  )
}
