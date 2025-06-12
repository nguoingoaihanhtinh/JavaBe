import React from 'react';
import { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { ArrowUpDown } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
 
export default function ReviewTable(props){
    
    const columns = useMemo(() => [
        { Header: 'UserName', accessor: "user.username" },
        { Header: ({ column }) => (
            <Button variant="ghost" {...column.getSortByToggleProps()}>
              Rating
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ), accessor: 'ratingValue' },
        { Header: 'Content', accessor: 'content' },      

    ], []);
    
    const data = useMemo(() => props.data, [props.data]);
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Dùng page thay cho rows để chỉ hiển thị dữ liệu của trang hiện tại
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        gotoPage,
        state: { pageIndex },
      } = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        useSortBy,
        usePagination
      );
    return(
        <div className='bg-white border  mt-8 rounded-lg shadow-lg'>
             <div className="border-b border-stroke py-3 px-6.5 ">
                    <h3 className="font-semibold text-xl ">
                       Review
                    </h3>
            </div>
 <div className=" bg-white  h-[500px]  pt-2 relative rounded-lg">
        <Table   {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow className="sticky top-0 z-10" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHead
                    className="items-center text-center justify-center"
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow  {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell
                      className="items-center text-center justify-center"
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Phần phân trang */}
        <div className="flex items-center  space-x-2 py-4 justify-center absolute  left-1/2 transform -translate-x-1/2 bottom-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()} disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <span>
            {pageIndex + 1} / {pageOptions.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()} disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>
        </div>
       

        )
} 