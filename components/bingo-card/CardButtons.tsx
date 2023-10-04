import {
  TrashIcon,
  ArchiveBoxIcon,
  ArrowUturnLeftIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { Box, Button, Text, ThemeUIStyleObject } from 'theme-ui';
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
        flexDirection: 'column',
        background: 'primary',
        padding: ['0.6rem', '1rem'],
        borderRadius: '5px',
        border: (theme) => `1px solid ${theme.colors.accent}`,
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
