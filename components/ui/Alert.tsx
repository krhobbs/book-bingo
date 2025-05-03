import { Alert as UIAlert, Close } from 'theme-ui';
import type { ReactElement } from 'react';

interface AlertProps {
  message: string;
  variant?: string;
  close(): void;
}

export function Alert(props: AlertProps): ReactElement {
  const { message, close, variant = "error" } = props;

  return (
    <UIAlert variant={variant}>
      {message}
      <Close onClick={close} />
    </UIAlert>
  );
}
