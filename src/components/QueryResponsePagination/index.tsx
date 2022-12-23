import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination'
import { FC, ChangeEventHandler, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { QueryResponse } from 'interfaces/Query'
import { MobilePagination } from 'components/QueryResponsePagination/styles'

export type QueryResponsePaginationProps = Omit<
  TablePaginationProps,
  'onPageChange' | 'onRowsPerPageChange' | 'count' | 'page' | 'rowsPerPage'
> & {
  queryResponse?: QueryResponse<unknown>
  onPageChange?: (newPage: number) => unknown
  onRowsPerPageChange?: (newRowsPerPage: number) => unknown
}

export const QueryResponsePagination: FC<QueryResponsePaginationProps> = ({
  queryResponse,
  onPageChange,
  onRowsPerPageChange,
  ...paginationProps
}) => {
  const [currentPage, setCurrentPage] = useState(queryResponse?.page || 1)
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(
    queryResponse?.limit || 10
  )
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'))

  useUpdateEffect(() => {
    setCurrentPage(queryResponse?.page || 1)
    setCurrentRowsPerPage(queryResponse?.limit || 10)
  }, [queryResponse])

  const pageChangeHandler = (page: number) => {
    setCurrentPage(page)
    if (onPageChange) {
      onPageChange(page)
    }
  }

  const rowsPerPageHandler: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    const newRowsPerPage = +event.target.value
    setCurrentRowsPerPage(newRowsPerPage)
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage)
    }
  }

  if (isMobile) {
    return (
      <MobilePagination
        count={queryResponse?.totalPages || 0}
        page={currentPage}
        onChange={(_e, page) => pageChangeHandler(page)}
      />
    )
  }

  return (
    <TablePagination
      {...paginationProps}
      component="div"
      count={queryResponse?.total || 0}
      rowsPerPage={currentRowsPerPage}
      page={currentPage - 1}
      onPageChange={(_e, page) => pageChangeHandler(page + 1)}
      onRowsPerPageChange={rowsPerPageHandler}
    />
  )
}
