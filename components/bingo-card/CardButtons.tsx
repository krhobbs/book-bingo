import {
  TrashIcon,
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Box, Button, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../hooks/useBreakpoint';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CardPdfDocument from './CardPdfDocument';

interface CardButtonsProps {
  card: Card;
  handleDeleteCard: Function;
  handleArchiveCard: Function;
  archived: boolean;
  sx?: ThemeUIStyleObject;
}

function CardButtons({
  card,
  handleDeleteCard,
  handleArchiveCard,
  archived,
  sx,
}: CardButtonsProps) {
  const breakpoint = useBreakpoint();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        ...sx,
      }}
    >
      <Button
        sx={{
          alignItems: 'center',
          background: 'destructive',
          borderRadius: '4px 0px 0px 4px',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          paddingBlock: '0.3rem',
        }}
        onClick={() => handleDeleteCard()}
        aria-label="delete card"
      >
        <TrashIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
      </Button>
      <Button
        sx={{
          alignItems: 'center',
          background: 'muted',
          borderRadius: '0px',
          display: 'flex',
          flex: '1 1 0px',
          justifyContent: 'center',
          paddingBlock: '0.3rem',
        }}
        onClick={() => handleArchiveCard()}
        aria-label={`${archived ? 'unarchive' : 'archive'} card`}
      >
        {archived ? (
          <ArrowUturnLeftIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        ) : (
          <ArchiveBoxIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        )}
      </Button>
      <PDFDownloadLink
        document={<CardPdfDocument card={card} />}
        fileName="bingo-card.pdf"
        style={{display: 'flex', flex: '1 1 0px'}}
      >
        <Box
          sx={{
            alignItems: 'center',
            background: 'secondary',
            borderRadius: '0px 4px 4px 0px',
            display: 'flex',
            justifyContent: 'center',
            '&:hover': {
              boxShadow: 'pushedIn',
            },
            padding: '0.3rem 1.5rem'
          }}
        >
          <DocumentArrowDownIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
        </Box>
      </PDFDownloadLink>
    </Box>
  );
}

export default CardButtons;
