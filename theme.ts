import type { Theme } from 'theme-ui';

export const theme: Theme = {
  colors: {
    text: '#000000',
    background: '#C1C0A4',
    primary: '#FFFFFF',
    secondary: '#FFBF00',
    accent: '#339900',
    highlight: '#CC6666',
    muted: '#FF9999',
    destructive: '#FF9999',
    modes: {
      dark: {
        text: '#FFFFFF',
        background: '#060606',
        primary: '#1A1A1A',
        secondary: '#FFBF00',
        accent: '#619801',
        highlight: '#A61322',
        muted: '#A61322',
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
