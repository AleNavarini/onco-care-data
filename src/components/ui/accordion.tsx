import { Sheet, Button } from '@mui/joy';
import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Sheet
      sx={{
        borderRadius: 'md',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Button
        fullWidth={true}
        variant="plain"
        onClick={handleClick}
        endDecorator={
          isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        {title}
      </Button>
      {isOpen && <>{children}</>}
    </Sheet>
  );
}
