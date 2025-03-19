import { Box } from "theme-ui";
import { useViewContext } from "../hooks/useViewContext"
import { ReactNode } from "react";

export default function Squares({ children }: { children: ReactNode }) {
  const { view } = useViewContext();
  return (
    <>
      {view === 'grid' ?
        <Box as="section"
          sx={{
            display: 'grid',
            gap: ['0.3rem', '0.5rem'],
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, auto)',
          }}>{children}
        </Box>
        :
        <Box as="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>{children}
        </Box>}
    </>
  )
}
