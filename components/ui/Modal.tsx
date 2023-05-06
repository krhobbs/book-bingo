import { useEffect } from 'react';
import { Box, Button } from 'theme-ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import FocusTrap from 'focus-trap-react';

function Modal({ closeModal, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <FocusTrap>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          blockSize: '100vh',
          inlineSize: '100%',
          zIndex: 0,
        }}
      >
        <Box
          id="modal-background"
          sx={{
            background: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            backdropFilter: 'blur(5px)',
            inlineSize: '100%',
            blockSize: '100%',
            zIndex: 1,
          }}
        />
        <Button
          onClick={closeModal}
          variant="closeModal"
          sx={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 15 }}
        >
          <XMarkIcon style={{ inlineSize: '100%' }} />
        </Button>
        <Box
          id="modal-content-wrapper"
          sx={{
            position: 'relative',
            background: 'background',
            borderRadius: '25px',
            inlineSize: 'max-content',
            padding: '2rem',
            mx: 'auto',
            marginBlockStart: '4rem',
            zIndex: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </FocusTrap>
  );
}

export default Modal;
