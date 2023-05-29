import { List, ListItemButton, ListItem } from '@mui/joy';
import React, { useState } from 'react';

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <List component="div">
            {items.map((item, index) => (
                <div key={index}>
                    <ListItemButton onClick={() => handleClick(index)}>
                        {item.title}
                    </ListItemButton>
                    {openIndex === index && (
                        <ListItem>
                            {item.content}
                        </ListItem>
                    )}
                </div>
            ))}
        </List>
    );
};
