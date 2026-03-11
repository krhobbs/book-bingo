import TemplateListItem from './template-item/TemplateListItem';
import TemplateGridItem from './template-item/TemplateGridItem';
import { useViewContext } from '../../hooks/useViewContext';
import Squares from '../Squares';

export interface TemplateSquaresProps {
  reqs: string[];
}

function TemplateSquares({ reqs }: TemplateSquaresProps) {
  const { view } = useViewContext();
  return (
    <Squares>
      {view === 'grid' ? (reqs.map((req: string, index: number) => {
        return <TemplateGridItem key={req + index} req={req} />;
      })) : (reqs.map((req: string, index: number) => {
        return <TemplateListItem key={req + index} req={req} />;
      }))}
    </Squares>
  );
}

export default TemplateSquares;
