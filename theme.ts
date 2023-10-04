import type { Theme } from 'theme-ui';
import { Inter } from 'next/font/google';

export const theme: Theme = {
  config: {
    initialColorModeName: 'light',
  },
  colors: {
    text: '#000000',
    background: '#FFFFFF',
    primary: '#DADADA',
    secondary: '#999999',
    accent: '#D6AF38',
    highlight: '#E2EBE0',
    muted: '#B3B3B3',
    destructive: '#E08585',
    modes: {
      dark: {
        text: '#FFFFFF',
        background: '#030303',
        primary: '#1A1A1A',
        secondary: '#353635',
        accent: '#FFCC33',
        highlight: '#1F1F1F',
        muted: '#4D4D4D',
        destructive: '#B23D3D',
      },
    },
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
  fontSizes: [9, 10, 12, 14, 15, 16, 23, 26, 28, 32],
  fontWeights: {
    caption: 300, // light
    body: 400, // regular
    heading: 600, // semi-bold
  },
  breakpoints: ['600px', '1024px'],
  text: {
    heading1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: [7, 9], // 26, 32
    },
    heading2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: [6, 8], // 23, 28
    },
    subheading: {
      fontFamily: 'body',
      fontWeight: 'heading',
      fontSize: [2, 4], // 12, 15
    },
    body1: {
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: [1, 3], // 10, 14
    },
    body2: {
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: [0, 2], // 9, 12
    },
    caption: {
      fontFamily: 'body',
      fontWeight: 'caption',
      fontSize: [0, 1], // 9, 10
      textDecoration: 'underline',
    },
  },
  shadows: {
    pushedIn: 'inset 0px 0px 15px -10px #000000',
    popover: '2px 2px 5px 2px rgba(0,0,0,0.6)'
  },
  buttons: {
    primary: {
      color: 'text',
      cursor: 'pointer',
      bg: 'primary',
      padding: '0.5rem 1.5rem',
      '&:hover': {
        boxShadow: 'pushedIn',
      },
    },
    icon: {
      cursor: 'pointer',
      padding: '0px',
    },
    settings: {
      fontWeight: 'heading',
      fontSize: [2, 3],
      color: 'text',
      cursor: 'pointer',
      bg: 'transparent',
      textAlign: 'left',
      '&:hover': {
        bg: 'muted',
      },
    },
    cardOptions: {
      variant: 'buttons.settings',
      alignItems: 'center',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-start',
      padding: '0.5rem 1.5rem',
      borderRadius: '5px',
    },
    closeModal: {
      bg: 'primary',
      color: 'text',
      cursor: 'pointer',
      blockSize: ['1.5rem', '2.25rem'],
      inlineSize: ['1.5rem', '2.25rem'],
      padding: '0px',
      '&:hover': {
        boxShadow: 'pushedIn',
      },
    },
  },
  layout: {
    squareSide: {
      alignItems: 'center',
      backgroundColor: 'primary',
      blockSize: '100%',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      inlineSize: '100%',
      justifyContent: 'center',
      padding: ['0.05rem', '0.1rem'],
    },
    animatedSquareSide: {
      variant: 'layout.squareSide',
      backfaceVisibility: 'hidden',
      position: 'absolute',
      transition: 'all .6s ease',
    },
  },
  links: {
    item: {
      bg: 'secondary',
      blockSize: ['16px', '26px'],
      borderRadius: '5px',
      color: 'text',
      inlineSize: ['38px', '60px'],
      textAlign: 'center',
      '&:hover': {
        boxShadow: 'pushedIn',
      },
    },
    settings: {
      fontWeight: 'heading',
      fontSize: [2, 3],
      color: 'text',
      cursor: 'pointer',
      bg: 'transparent',
      borderRadius: '4px',
      padding: '0.5rem 1rem',
      textAlign: 'left',
      '&:hover': {
        bg: 'muted',
      },
    },
  },
  forms: {
    label: {
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: [2, 3],
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      a: {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 4,
      },
      body: {
        minHeight: '100vh',
      },
      button: {
        fontFamily: 'body',
      },
      input: {
        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
};
