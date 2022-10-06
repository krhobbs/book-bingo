import { text } from "stream/consumers";
import type { Theme } from "theme-ui";


export const theme: Theme = {
    colors: {
        text: '#141419',
        background: '#F3EBE2',
        primary: '#BDCFB5',
        secondary: '#E8AC9B',
        primaryDark: '#131910',
        secondaryDark: '#210D07'
    },
    fonts: {
        body: '"Open Sans", sans-serif',
        heading: '"Open Sans", sans-serif',
    },
    fontSizes: [8, 12, 14, 20, 24, 32],
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
            fontSize: [4, 5]
        },
        heading2: {
            fontFamily: 'heading',
            fontWeight: ['semiBold', 'semiBold', 'bold'],
            fontSize: [3, 4]
        },
        body1: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [1, 2]
        },
        body2: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [0, 1]
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
            padding: '0.2rem 0.3rem',
            '&:hover': {
                boxShadow: 'inset 0px 0px 15px -10px #000000'
            }
        },
        nav: {
            color: 'text',
            bg: 'transparent',
            cursor: 'pointer',
            padding: '0',
        }
    },
    styles: {
        root: {
            fontFamily: 'body',
            a: {
                textDecoration: 'none',
                color: 'inherit'
            }
        }
    }

}