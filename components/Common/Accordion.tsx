import { List, ListItemButton, ListItem, Sheet, Button, Box } from '@mui/joy';
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
    }

    return (
        <Sheet
            sx={{
                width: '30dvw',
                borderRadius: 'md'
            }}
        >
            <Button
                fullWidth={true}
                variant='plain'
                onClick={handleClick}
                endDecorator={
                    isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
            >
                {title}
            </Button>
            {isOpen && (
                <>
                    {children}
                </>
            )}
        </Sheet>
    );
};