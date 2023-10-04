import { RefObject, useEffect, useState } from 'react';

export function usePopover(
  ref: RefObject<HTMLElement>,
  buttonRef: RefObject<HTMLElement>,
  spaceBetween: number
) {
  const [top, setTop] = useState<number>();
  const [left, setLeft] = useState<number>();

  useEffect(() => {
    if (buttonRef.current && ref.current) {
      document.body.style.overflow = 'hidden';
      const buttonPos = buttonRef.current.getBoundingClientRect();
      const { width } = ref.current.getBoundingClientRect();

      setTop(buttonPos.bottom + spaceBetween);
      setLeft(buttonPos.left + buttonPos.width / 2 - width / 2);

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, []);

  return [top, left];
}
