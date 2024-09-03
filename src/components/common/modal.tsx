import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  title: string;
}

export default function Modal({
  open,
  handleClose,
  children,
  title,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col items-center justify-center w-max max-w-full max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto flex-grow min-w-[300px]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
