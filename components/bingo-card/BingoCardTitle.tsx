import { Box, Text, IconButton } from 'theme-ui';
import { useRouter } from 'next/router';
import { useMemo, useState, useRef, useEffect } from 'react';
import Spacer from '../ui/Spacer';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import CardButtons from './CardButtons';
import Popover from '../ui/Popover';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { createPortal } from 'react-dom';

interface BingoCardTitleProps {
  card: Card;
  username: string;
  template: string;
  usersCard: boolean;
  archived: boolean;
  handleArchiveCard: () => void;
  handleDeleteCard: () => void;
  handleFlipToBack: () => void;
  handleFlipToFront: () => void;
}

function BingoCardTitle({
  card,
  username,
  template,
  usersCard,
  archived,
  handleArchiveCard,
  handleDeleteCard,
  handleFlipToBack,
  handleFlipToFront,
}: BingoCardTitleProps) {
  const { pathname } = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popoverRef, () => setShowOptions((prev) => !prev));

  const showUsername = useMemo(
    () => pathname === '/' || pathname === '/friends',
    [pathname],
  );
  const showCardButtons = useMemo(
    () => (pathname === '/profile' || pathname === '/archived') && usersCard,
    [pathname, usersCard],
  );

  useEffect(() => {
    window.addEventListener('resize', () => setShowOptions(false));
    return () =>
      window.removeEventListener('resize', () => setShowOptions(false));
  }, []);

  return (
    <Box
      as="section"
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        px: ['0rem', '0.2rem'],
      }}
    >
      <Box>
        {showUsername && (
          <Text as="h2" variant="heading2">
            {username}
          </Text>
        )}
        <Spacer size="0.3rem" />
        <Text as="h2" variant={showUsername ? 'subheading' : 'heading2'}>
          {template}
        </Text>
      </Box>
      {showCardButtons && (
        <Box sx={{ position: 'relative' }}>
          <IconButton
            ref={buttonRef}
            onClick={() => setShowOptions((prev) => !prev)}
          >
            <EllipsisHorizontalIcon style={{ height: '28px', width: '28px' }} />
          </IconButton>
          {showOptions &&
            createPortal(
              <Popover ref={popoverRef} button={buttonRef}>
                <CardButtons
                  card={card}
                  handleDeleteCard={handleDeleteCard}
                  handleArchiveCard={handleArchiveCard}
                  handleFlipToBack={handleFlipToBack}
                  handleFlipToFront={handleFlipToFront}
                  archived={archived}
                />
              </Popover>,
              document.body,
              'cardSettings',
            )}
        </Box>
      )}
    </Box>
  );
}

export default BingoCardTitle;
