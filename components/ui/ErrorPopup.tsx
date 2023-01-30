import { Box, Text, IconButton, ThemeUICSSObject } from 'theme-ui';
import type { ReactElement } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ErrorPopupProps {
    message: string,
    close() : void,
    sx?: ThemeUICSSObject
}

const baseStyles: ThemeUICSSObject = {
    backgroundColor: 'error',
    borderRadius: '15px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    color: 'darker',
    mx: 'auto',
    padding: '1.5rem 2.5rem',
    position: 'relative',
    inlineSize: 'max-content'
}

function ErrorPopup(props: ErrorPopupProps): ReactElement {
    const { message, close, sx = {}, ...rest} = props;

    return (
        <Box sx={{...baseStyles, ...sx}} {...rest}>
            <IconButton onClick={close} sx={{cursor: 'pointer', position: 'absolute', top: '0.5rem', right: '0.5rem', width: '24px', height: '24px', zIndex: 15}}>
                <XMarkIcon />
            </IconButton>
            
            <Text>{message}</Text> 
        </Box>

    );


}

export default ErrorPopup;