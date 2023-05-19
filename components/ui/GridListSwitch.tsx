import { useState } from 'react';
import { Box } from 'theme-ui';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';

function GridListSwitch() {
  const [list, setList] = useState(false);

  return (
    <Box
      as="button"
      sx={{
        display: 'flex',
        position: 'relative',
        background: 'secondary',
        padding: '0rem',
        inlineSize: ['6rem', '10rem'],
        blockSize: ['1.6rem', '2rem'],
        borderRadius: '5px',
        border: 'none',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
      onClick={() => setList(!list)}
    >
      <Box
        sx={{
          position: 'absolute',
          background: 'highlight',
          borderRadius: '5px',
          top: '2px',
          left: `${list ? '49.9%' : '0.8%'}`,
          blockSize: ['1.4rem', '1.8rem'],
          inlineSize: '49%',
          zIndex: 1,
          transition: 'left .25s'
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          color: 'text',
          blockSize: ['14px', '20px'],
          inlineSize: ['14px', '20px'],
          zIndex: 2,
        }}
      >
        <Squares2X2Icon />
      </Box>
      <Box
        sx={{
          position: 'relative',
          color: 'text',
          blockSize: ['14px', '20px'],
          inlineSize: ['14px', '20px'],
          zIndex: 2,
        }}
      >
        <ListBulletIcon />
      </Box>
    </Box>
  );
}

export default GridListSwitch;
