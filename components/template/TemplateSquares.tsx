import { Box } from 'theme-ui';
import { useContext } from 'react';
import { ViewContext } from '../layout/Layout';
import TemplateListItem from './template-item/TemplateListItem';
import TemplateItem from './template-item/TemplateItem';

export interface TemplateSquaresProps {
  reqs: string[];
}

function TemplateSquares({ reqs }: TemplateSquaresProps) {
  const [listView] = useContext(ViewContext);
  return (
    <>
      {listView ? (
        <Box
          as="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {reqs.map((req: string) => {
            return <TemplateListItem key={req} req={req} />;
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
          {reqs.map((req: string) => {
            return <TemplateItem key={req} req={req} />;
          })}
        </Box>
      )}
    </>
  );
}

export default TemplateSquares;
