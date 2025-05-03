import { ThemeUICSSObject, Alert, Close } from 'theme-ui';
import type { ReactElement } from 'react';

interface ErrorPopupProps {
  message: string;
  close(): void;
  sx?: ThemeUICSSObject;
}

export function ErrorPopup(props: ErrorPopupProps): ReactElement {
  const { message, close, sx = {}, ...rest } = props;

  return (
    <Alert variant='error'>
      {message}
      <Close onClick={close} />
    </Alert>
  );
}
