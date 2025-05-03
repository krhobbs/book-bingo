import { ReactNode, RefObject } from 'react';
import { Box, ThemeUIStyleObject } from 'theme-ui';
import { usePopover } from '../../hooks/usePopover';

interface PopoverProps {
  children: ReactNode;
  button: RefObject<HTMLButtonElement | null>;
  sx?: ThemeUIStyleObject;
  ref: RefObject<HTMLDivElement | null>;
}

export function Popover(props: PopoverProps) {
  const [top, left] = usePopover(
    props.ref,
    props.button,
    4,
  );

  return (
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
      ref={props.ref}
    >
      {props.children}
    </Box>
  );
}
