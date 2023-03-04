import type { Theme } from "theme-ui";


export const theme: Theme = {
    colors: {
        whiteText: '#FFFFFF',
        lightGrayText: '#A1A1A1',
        darkGrayText: '#4D4D4D',
        text: '#000000',
        pageBackground: '#D5E1D6',
        complete: '#AFE1AF',
        incomplete: '#D8BFD8',
        primary: '#87CEEB',
        secondary: '#FFBF00',
        destructive: '#DC143C',
    },
    fonts: {
        body: '"Open Sans", sans-serif',
        heading: '"Open Sans", sans-serif',
    },
    fontSizes: [8, 10, 12, 14, 16, 20, 24, 32],
    fontWeights: {
        light: 200,
        normal: 400,
        semiBold: 500,
        bold: 700
    },
    breakpoints: ['600px', '1024px'],
    text: {
        heading1: {
            fontFamily: 'heading',
            fontWeight: ['semiBold', 'semiBold', 'bold'],
            fontSize: [4, 6]
        },
        heading2: {
            fontFamily: 'heading',
            fontWeight: ['semiBold', 'semiBold', 'bold'],
            fontSize: [5, 6]
        },
        body1: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [3, 4]
        },
        body1Light: {
            variant: 'body1',
            fontSize: [1, 3]
        },
        body2: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [0, 1]
        },
        body2Light: {
            variant: 'body2',
            fontSize: [0, 1]
        },
        navLink: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [3, 4]
        },
        link: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [0, 1],
            textDecoration: 'underline'
        }
    },
    buttons: {
        primary: {
            color: 'text',
            cursor: 'pointer',
            bg: 'primary',
            padding: '0.5rem 1.5rem',
            '&:hover': {
                boxShadow: 'inset 0px 0px 15px -10px #000000'
            }
        },
        addBook: {
            color: 'text',
            cursor: 'pointer',
            bg: 'primary',
            lineHeight: ['11px', '22px'],
            padding: ['0.3rem 0.4rem', '0.2rem 0.3rem'],
            '&:hover': {
                boxShadow: 'inset 0px 0px 15px -10px #000000'
            }
        },
        nav: {
            color: 'text',
            bg: 'transparent',
            cursor: 'pointer',
            padding: '0.1rem 2rem',
            fontSize: [3, 4],
            '&:hover': {
                bg: 'darkerHover'
            }
        }
    },
    styles: {
        root: {
            fontFamily: 'body',
            a: {
                textDecoration: 'none',
                color: 'inherit'
            },
            body: {
                minHeight: '100vh',
            },
        }
    }

}