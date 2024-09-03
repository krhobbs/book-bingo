import { RefObject, useEffect, useState } from 'react';

export function usePopover(
  ref: RefObject<HTMLElement>,
  buttonRef: RefObject<HTMLElement>,
  spaceBetween: number,
) {
  const [top, setTop] = useState<number>();
  const [left, setLeft] = useState<number>();

  useEffect(() => {
    if (buttonRef.current && ref.current) {
      document.body.style.overflow = 'hidden';
      const buttonPos = buttonRef.current.getBoundingClientRect();
      const { width, height } = ref.current.getBoundingClientRect();

      let y = buttonPos.bottom + spaceBetween;
      let x = buttonPos.left + buttonPos.width / 2 - width / 2;

      if (y + height > window.innerHeight) {
        y = buttonPos.top - height - spaceBetween;
      }

      if (x < 0) {
        x = 0 + spaceBetween;
      } else if (x + width > window.innerWidth) {
        x = window.innerWidth - width - spaceBetween;
      }

      setTop(y);
      setLeft(x);

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, []);

  return [top, left];
}
