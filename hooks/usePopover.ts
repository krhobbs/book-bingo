import { RefObject, useEffect, useState } from 'react';

export function usePopover(
  ref: RefObject<HTMLElement | null>,
  buttonRef: RefObject<HTMLElement | null>,
  spaceBetween: number,
) {
  const [top, setTop] = useState<number>();
  const [left, setLeft] = useState<number>();

  useEffect(() => {
    if (buttonRef.current && ref.current) {
      const buttonPos = buttonRef.current.getBoundingClientRect();
      const { width, height } = ref.current.getBoundingClientRect();

      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let y = buttonPos.bottom + scrollY + spaceBetween;
      let x = buttonPos.left + scrollX + buttonPos.width / 2 - width / 2;

      if (buttonPos.bottom + height + spaceBetween > window.innerHeight) {
        y = buttonPos.top + scrollY - height - spaceBetween;
      }

      if (x < scrollX) {
        x = scrollX + spaceBetween;
      } else if (x + width > window.innerWidth) {
        x = window.innerWidth + scrollX - width - spaceBetween;
      }

      setTop(y);
      setLeft(x);
    }
  }, []);

  return [top, left];
}
