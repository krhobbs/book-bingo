import { useEffect, useRef } from 'react';
import { Box, Label, Input, Button, IconButton } from 'theme-ui';
import { XMarkIcon } from '@heroicons/react/24/outline';

function Modal({ closeModal, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset' };
  }, [])

  return (
    <Box
      id="overlay-backdrop"
      sx={{
        position: 'absolute',
        top: '0',
        left: 0,
        blockSize: '100vh',
        inlineSize: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <IconButton onClick={closeModal} sx={{background: 'primary', cursor: 'pointer', position: 'absolute', top: '1rem', right: '1rem', zIndex: 15}}>
        <XMarkIcon style={{ inlineSize: '100%' }} />
      </IconButton>
      <Box id="overlay-container" sx={{background: 'background', borderRadius: '25px', inlineSize: 'max-content', padding: '2rem', mx: 'auto', marginBlockStart: '4rem'}}>
        {children}
      </Box>
    </Box>
  );
}

export default Modal;
