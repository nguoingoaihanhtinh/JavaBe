import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ArrowUpDown, Pencil, Trash } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import foodApi from '@/apis/foodApi';
import { toast } from 'sonner';
import billApi from '@/apis/billApi';
import BillDialog from '@/components/admin/Bill/BillDialog';
export default function CustomerPage(props) {
  const [foods, setFoods] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response2 = await billApi.getForManageCustomer();
      if (response2 && response2.status == 'success') {
        setUsers(response2.data);
      }
    }
    fetchData();
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: 'User Id',
        accessor: 'userId'
      },
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: ({ column }) => (
          <Button variant='ghost' {...column.getSortByToggleProps()}>
            Total purchased Foods
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
        accessor: 'totalQuantity',
        Cell: ({ value }) =>
          value
      },
      {
        Header: ({ column }) => (
          <Button variant='ghost' {...column.getSortByToggleProps()}>
            Total Spend
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
        accessor: 'totalSpend',
        Cell: ({ value }) =>
          value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      },
    ],
    [users]
  );

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
    state: { pageIndex }
  } = useTable(
    { columns, data: users, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  return (
    <div className=' bg-white border shadow-md  pt-5 relative h-[560px] w-full rounded-lg px-4'>
      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map(headerGroup => (
            <TableRow className='pr-6' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableHead
                  className='items-center text-center justify-center'
                  {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell
                    className='items-center text-center justify-center'
                    {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Phần phân trang */}
      <div className='flex items-center  space-x-2 py-4 justify-center absolute  left-1/2 transform -translate-x-1/2 bottom-0'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}>
          Previous
        </Button>
        <span>
          {pageIndex + 1} / {pageOptions.length}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => nextPage()}
          disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
