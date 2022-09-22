import type { Theme } from "theme-ui";


export const theme: Theme = {
    colors: {
        text: '#141419',
        background: '#333333',
        primary: '#BDCFB5',
        secondary: '#E8AC9B'
    },
    fonts: {
        body: '"Open Sans", sans-serif',
        heading: '"Open Sans", sans-serif',
    },
    fontSizes: [12, 16, 24, 32],
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
            fontSize: [3, 4]
        },
        heading2: {
            fontFamily: 'heading',
            fontWeight: ['semiBold', 'semiBold', 'bold'],
            fontSize: [2, 3]
        },
        body1: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [2, 3]
        },
        body2: {
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: [1, 2]
        }
    }

}