import { Box } from 'theme-ui';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { useViewContext } from '../../hooks/useViewContext';

export function GridListSwitch() {
  const { view, setView } = useViewContext();

  return (
    <Box
      as="button"
      sx={{
        alignItems: 'center',
        background: 'secondary',
        blockSize: ['1.6rem', '2rem'],
        border: 'none',
        borderRadius: '5px',
        display: 'flex',
        inlineSize: ['6rem', '10rem'],
        justifyContent: 'space-around',
        marginInline: 'auto',
        padding: '0rem',
        position: 'relative',
      }}
      onClick={() => setView((prev) => prev === 'list' ? 'grid' : 'list')}
      aria-label="toggle grid/list view"
    >
      <Box
        sx={{
          background: 'highlight',
          blockSize: ['1.4rem', '1.8rem'],
          borderRadius: '5px',
          inlineSize: '49%',
          left: `${view === 'list' ? '49.9%' : '0.8%'}`,
          position: 'absolute',
          top: '1.5px',
          transition: 'left .25s',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          blockSize: ['14px', '20px'],
          color: 'text',
          inlineSize: ['14px', '20px'],
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Squares2X2Icon />
      </Box>
      <Box
        sx={{
          blockSize: ['14px', '20px'],
          color: 'text',
          inlineSize: ['14px', '20px'],
          position: 'relative',
          zIndex: 2,
        }}
      >
        <ListBulletIcon />
      </Box>
    </Box>
  );
}

