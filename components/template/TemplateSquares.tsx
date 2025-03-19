import { Box } from 'theme-ui';
import TemplateListItem from './template-item/TemplateListItem';
import TemplateItem from './template-item/TemplateItem';
import { useViewContext } from '../../hooks/useViewContext';

export interface TemplateSquaresProps {
  reqs: string[];
}

function TemplateSquares({ reqs }: TemplateSquaresProps) {
  const { view } = useViewContext();
  return (
    <>
      {view === 'list' ? (
        <Box
          as="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {reqs.map((req: string, index: number) => {
            return <TemplateListItem key={req + index} req={req} />;
          })}
        </Box>
      ) : (
        <Box
          as="section"
          sx={{
            display: 'grid',
            gap: ['0.3rem', '0.5rem'],
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, auto)',
          }}
        >
          {reqs.map((req: string, index: number) => {
            return <TemplateItem key={req + index} req={req} />;
          })}
        </Box>
      )}
    </>
  );
}

export default TemplateSquares;
