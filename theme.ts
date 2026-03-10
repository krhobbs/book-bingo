import type { Theme } from 'theme-ui';

/**
 * Color Guide
 *
 * Muted: Item background, popover and modal backgrounds, grid/list toggle track
 * Primary: Brand color, default complete border, curent page pagination button border, one-off prominent buttons
 * Secondary: Standard item buttons, pagination buttons, grid/list toggle
 * Accent: Pagination button border hover, popover and modal border, general hover color for Primary
 * Highlight: Hover background for text-only links and buttons
 * Destructive: Delete book button
 */

export const theme: Theme = {
  config: { initialColorModeName: 'light' },
  colors: {
    text: '#110E03',
    mutedText: '#7A7160',
    background: '#FCF8EE',
    muted: '#F2E8CC',
    primary: '#D6AF38',
    secondary: '#B8AA90',
    accent: '#B08F2C',
    highlight: '#EAD9A8',
    destructive: '#C96A4F',
    modes: {
      dark: {
        text: '#F0EBE0',
        mutedText: '#8A8070',
        background: '#111009',
        muted: '#1E1C14',
        primary: '#D6AF38',
        secondary: '#4A4535',
        accent: '#B08F2C',
        highlight: '#2A2515',
        destructive: '#C25E56 ',
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
  breakpoints: ['630px', '1024px'],
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
    popover: '2px 2px 5px 2px rgba(0,0,0,0.6)',
  },
  buttons: {
    primary: {
      color: 'text',
      cursor: 'pointer',
      bg: 'primary',
      padding: '0.5rem 1.5rem',
      '&:hover': { boxShadow: 'pushedIn' },
    },
    settings: {
      fontWeight: 'heading',
      fontSize: [2, 3],
      color: 'text',
      cursor: 'pointer',
      bg: 'transparent',
      textAlign: 'left',
      '&:hover': { bg: 'highlight' },
    },
    cardOptions: {
      variant: 'buttons.settings',
      alignItems: 'center',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-start',
      padding: '0.5rem 1.5rem',
      borderRadius: '3px',
    },
    closeModal: {
      bg: 'primary',
      color: 'text',
      cursor: 'pointer',
      blockSize: ['1.5rem', '2.25rem'],
      inlineSize: ['1.5rem', '2.25rem'],
      padding: '0px',
      '&:hover': { boxShadow: 'pushedIn' },
    },
    close: {
      cursor: 'pointer',
    },
    icon: {
      cursor: 'pointer',
    },
  },
  alerts: {
    base: {
      position: 'absolute',
      color: 'background',
      top: '1rem',
      left: '1rem',
      right: '1rem',
      justifyContent: 'space-between',
    },
    error: {
      variant: 'alerts.base',
      backgroundColor: 'destructive',
    },
    success: {
      variant: 'alerts.base',
      backgroundColor: '#4fa945',
    },
  },
  layout: {
    bingoItem: {
      alignItems: 'center',
      bg: 'muted',
      borderRadius: '5px',
      border: (theme) => `solid 1px ${theme.colors?.secondary}`,
      boxShadow: (theme) => `1px 1px 0px 1px ${theme.colors?.secondary}`,
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
    gridItem: {
      variant: 'layout.bingoItem',
      blockSize: ['100px', '138px'],
      inlineSize: ['auto', '112px'],
      flexDirection: 'column',
    },
    listItem: {
      variant: 'layout.bingoItem',
      blockSize: '212px',
      gap: '2rem',
      inlineSize: ['98%', '512px'],
      marginInline: 'auto',
    },
    gridItemSide: {
      alignItems: 'center',
      backfaceVisibility: 'hidden',
      bg: 'muted',
      blockSize: '100%',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      inlineSize: '100%',
      justifyContent: 'center',
      padding: ['0.05rem', '0.1rem'],
      position: 'absolute',
      transition: 'all .6s ease',
    },
    form: {
      px: ['0.25rem', '0rem'],
      mx: 'auto',
      maxInlineSize: '512px',
      position: 'relative',
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
      '&:hover': { boxShadow: 'pushedIn' },
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
      '&:hover': { bg: 'highlight' },
    },
    pagination: {
      alignItems: 'center',
      bg: 'secondary',
      boxSizing: 'border-box',
      blockSize: ['24px', '32px'],
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '5px',
      textAlign: 'center',
      px: '15px',
      '&:hover': {
        border: (theme) => `2px solid ${theme.colors?.accent}`,
        px: '13px',
      },
    },
    paginationActive: {
      variant: 'links.pagination',
      border: () => `2px solid ${theme.colors?.primary}`,
      px: '13px',
    },
    paginationDisabled: {
      variant: 'links.pagination',
      opacity: '50%',
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
  forms: {
    label: { fontFamily: 'body', fontWeight: 'body', fontSize: [2, 3] },
  },
  styles: {
    root: {
      fontFamily: 'body',
      a: { textDecoration: 'none', color: 'inherit', fontSize: 4 },
      body: { minHeight: '100vh' },
      button: { fontFamily: 'body' },
      input: { '&:focus': { outline: 'none' } },
    },
  },
};
