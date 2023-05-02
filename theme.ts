import type { Theme } from 'theme-ui';

export const theme: Theme = {
  colors: {
    text: '#000000',
    background: '#FCFCFC',
    primary: '#f1f5f4',
    secondary: '#A8BAB6',
    accent: '#BBD8FD',
    highlight: '#f1f5f4',
    muted: '#B3B3B3',
    destructive: '#FF9999',
    modes: {
      dark: {
        text: '#ffffff',
        background: '#030303',
        primary: '#1A1A1A',
        secondary: '#353635',
        accent: '#BBD8FD',
        highlight: '#0c1a1f',
        muted: '#4D4D4D',
        destructive: '#B23D3D',
      },
    },
  },
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: '"Open Sans", sans-serif',
  },
  fontSizes: [9, 10, 12, 14, 15, 16, 23, 26, 28, 32],
  fontWeights: {
    caption: 300,
    body: 400,
    heading: 600,
  },
  breakpoints: ['600px', '1024px'],
  text: {
    heading1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: [7, 9],
    },
    heading2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: [6, 8],
    },
    body1: {
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: [1, 3],
    },
    body2: {
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: [0, 2],
    },
    navLink: {
      fontFamily: 'body',
      fontWeight: 'heading',
      fontSize: [2, 4],
    },
    caption: {
      fontFamily: 'body',
      fontWeight: 'caption',
      fontSize: [0, 1],
      textDecoration: 'underline',
    },
  },
  buttons: {
    primary: {
      color: 'text',
      cursor: 'pointer',
      bg: 'primary',
      padding: '0.5rem 1.5rem',
      '&:hover': {
        boxShadow: 'inset 0px 0px 15px -10px #000000',
      },
    },
    archival: {
      bg: 'primary',
      color: 'text',
      cursor: 'pointer',
      padding: '0px',
      inlineSize: '100%',
      blockSize: ['16px', '26px'],
    },
    bingoItem: {
      bg: 'secondary',
      color: 'text',
      cursor: 'pointer',
      position: 'absolute',
      bottom: ['8px', '12px'],
      right: '0px',
      left: '0px',
      marginInline: 'auto',
      padding: '0px',
      inlineSize: ['38px', '60px'],
      blockSize: ['16px', '26px'],
    },
    settings: {
        bg: 'background',
        fontWeight: 'heading',
        fontSize: [2, 3],
        color: 'text',
        cursor: 'pointer',
        '&:hover': {
          bg: 'primary'
        }
    },
    closeModal: {
        bg: 'primary',
        color: 'text',
        cursor: 'pointer',
        blockSize: ['1.5rem', '2.25rem'],
        inlineSize: ['1.5rem', '2.25rem'],
        padding: '0px',
        '&:hover': {
            boxShadow: 'inset 0px 0px 15px -10px #000000',
        },
    }
  },
  forms: {
    label: {
        fontFamily: 'body',
        fontWeight: 'body',
        fontSize: [2, 3],
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      body: {
        minHeight: '100vh',
      },
      input: {
        '&:focus': {
          outline: 'none'
        }
      }
    },
  },
};
