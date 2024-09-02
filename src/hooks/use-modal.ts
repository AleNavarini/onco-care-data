import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content?: React.ReactNode) => {
    setOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setOpen(false);
    setModalContent(null);
  };

  return { open, openModal, closeModal, modalContent };
};

export default useModal;
