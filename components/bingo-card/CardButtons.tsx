import {
  TrashIcon,
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Box, Button, Text, ThemeUIStyleObject } from 'theme-ui';
import useBreakpoint from '../../hooks/useBreakpoint';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CardPdfDocument from './CardPdfDocument';

interface CardButtonsProps {
  archived: boolean;
  card: Card;
  sx?: ThemeUIStyleObject;
  handleArchiveCard: () => void;
  handleDeleteCard: () => void;
  handleFlipToBack: () => void;
  handleFlipToFront: () => void;
}

function CardButtons({
  archived,
  card,
  sx,
  handleArchiveCard,
  handleDeleteCard,
  handleFlipToBack,
  handleFlipToFront,
}: CardButtonsProps) {
  const breakpoint = useBreakpoint();
  const iconSize = useMemo(
    () => (breakpoint === 'sm' ? '14px' : '18px'),
    [breakpoint],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: 'primary',
        padding: ['0.6rem', '1rem'],
        borderRadius: '5px',
        border: (theme) => `1px solid ${theme.colors?.accent}`,
        inlineSize: 'max-content',
        ...sx,
      }}
    >
      <PDFDownloadLink
        document={<CardPdfDocument card={card} />}
        fileName="bingo-card.pdf"
      >
        <Box variant="buttons.cardOptions">
          <DocumentArrowDownIcon
            style={{ inlineSize: iconSize, blockSize: iconSize }}
          />
          <Text>Download as PDF</Text>
        </Box>
      </PDFDownloadLink>
      <Button
        variant="cardOptions"
        onClick={() => handleFlipToFront()}
        aria-label="flip all to front"
      >
        <ArrowPathIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
        <Text>Flip All To Front</Text>
      </Button>
      <Button
        variant="cardOptions"
        onClick={() => handleFlipToBack()}
        aria-label="flip all to front"
      >
        <ArrowPathIcon
          style={{
            inlineSize: iconSize,
            blockSize: iconSize,
            transform: 'scaleX(-1)',
          }}
        />
        <Text>Flip All To Back</Text>
      </Button>
      <Button
        variant="cardOptions"
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
        <Text>Archive Card</Text>
      </Button>
      <Button
        variant="cardOptions"
        onClick={() => handleDeleteCard()}
        aria-label="delete card"
      >
        <TrashIcon style={{ inlineSize: iconSize, blockSize: iconSize }} />
        <Text>Delete Card</Text>
      </Button>
    </Box>
  );
}

export default CardButtons;
