import { Box, Text } from 'theme-ui';
import Link from 'next/link'
import type { UrlObject } from 'url';
import { Fragment } from 'react';

function renderPageNumbers(currentPage: number, pageCount: number) {
  const beginning = [1, 2, 3, 4, pageCount];
  const middle = [1, currentPage - 1, currentPage, currentPage + 1, pageCount];
  const end = [1, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  switch(true) {
    case currentPage <= 3:
      return (
        <>
          {beginning.map((pageNum, idx) => {
            return (
              <Fragment key={pageNum}>
                <PaginationLink active={currentPage === pageNum} href={{query: {page: pageNum}}}>
                  {pageNum}
                </PaginationLink>
                {idx === 3 && <Text variant='body1'>...</Text>}
              </Fragment>
            )
          })}
        </>
      )
    case currentPage >= (pageCount - 2):
      return (
        <>
          {end.map((pageNum, idx) => {
            return (
              <Fragment key={pageNum}>
                <PaginationLink active={currentPage === pageNum} href={{query: {page: pageNum}}}>
                  {pageNum}
                </PaginationLink>
                {idx === 1 && <Text variant='body1'>...</Text>}
              </Fragment>
            )
          })}
        </>
      )
    default:
      return (
        <>
          {middle.map((pageNum, idx) => {
            return (
              <Fragment key={pageNum}>
                <PaginationLink active={currentPage === pageNum} href={{query: {page: pageNum}}}>
                  {pageNum}
                </PaginationLink>
                {(idx === 0 || idx === 3) && <Text variant="body1">...</Text>}
              </Fragment>
            );
          })}
        </>
      )
  }
}

function PaginationLink({href, active, children} : {href: string | UrlObject, active: boolean, children: React.ReactNode}) {
  return (
    <Link href={href}>
      <Box variant={`links.pagination${active ? 'Active' : ''}`}>{children}</Box>
    </Link>
  )
}

function Pagination({pageCount, currentPage} : {pageCount: number, currentPage: number}) {
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === pageCount;
  
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', mx: 'auto', width: ['100%', '592px']}}>
      <Link 
        href={prevDisabled ? {} : {query: {page: currentPage - 1}}}
        style={{pointerEvents: prevDisabled ? 'none' : 'auto'}}
        aria-disabled={prevDisabled} 
        tabIndex={prevDisabled ? -1 : undefined}
      >
        <Box variant={`links.pagination${prevDisabled ? 'Disabled' : ''}`}>Prev</Box>
      </Link>
      <Box sx={{display: 'flex', gap: '0.5rem'}}>
        {
          pageCount <= 5 ? 
            <>
              {pageNumbers.map((pageNumber) => {
                return (
                  <PaginationLink active={pageNumber === currentPage} key={pageNumber} href={{query: {page: pageNumber}}}>
                    {pageNumber}
                  </PaginationLink>
                )
              })}
            </> 
          : 
          <>
            {renderPageNumbers(currentPage, pageCount)}
          </>
        }
      </Box>
      <Link 
        href={nextDisabled ? {} : {query: {page: currentPage + 1}}} 
        style={{pointerEvents: nextDisabled ? 'none' : 'auto'}}
        aria-disabled={nextDisabled} 
        tabIndex={nextDisabled ? -1 : undefined}
      >
        <Box variant={`links.pagination${nextDisabled ? 'Disabled' : ''}`}>Next</Box>
      </Link>
    </Box>
  )
}

export default Pagination;
