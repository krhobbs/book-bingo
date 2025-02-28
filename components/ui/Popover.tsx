import { ReactNode, RefObject, forwardRef } from 'react';
import { Box, ThemeUIStyleObject } from 'theme-ui';
import { usePopover } from '../../hooks/usePopover';

interface PopoverProps {
  children: ReactNode;
  button: RefObject<HTMLButtonElement | null>;
  sx?: ThemeUIStyleObject;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(props, ref) {
    const [top, left] = usePopover(
      ref as RefObject<HTMLDivElement>,
      props.button,
      4,
    );

    return (
      <Box
        sx={{
          position: 'fixed',
          zIndex: 10,
          top: 0,
          left: 0,
          overflow: 'hidden',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            opacity: top ? 1 : 0,
            transition: 'opacity 0.1s ease-in',
            display: 'inline',
            position: 'absolute',
            top: `${top}px`,
            left: `${left}px`,
            zIndex: 11,
            boxShadow: 'popover',
            borderRadius: '5px',
          }}
          ref={ref}
        >
          {props.children}
        </Box>
      </Box>
    );
  },
);
