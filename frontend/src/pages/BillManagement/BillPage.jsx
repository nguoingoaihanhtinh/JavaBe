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
export default function BillPage(props) {
  const [foods, setFoods] = useState([]);
  const [bills, setBills] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response2 = await billApi.getAllBill();
      if (response2 && response2.status == 'success') {
        const data = response2.data.map(item => {
          // Sao chép item để tránh thay đổi trực tiếp dữ liệu gốc
          const updatedItem = {
            ...item,
            foodInfo: JSON.parse(item.foodInfo),
            address: JSON.parse(item.address)
          };
          return updatedItem; // Trả về đối tượng đã cập nhật
        });
        setBills(data); // Cập nhật state với mảng đã sửa
      }
    }
    fetchData();
  }, []);
  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng giờ và phút
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}`;
    return `${formattedTime} - ${day}/${month}/${year}`;
  }
  const handleDialogOpen = () => {
    setName(''); // Reset gi�� trị khi mở dialog
  };
  const handleDelete = async (id) => {
    const res = await billApi.deleteBill(id);
    if (res && res.status == 'success') {
      setBills(prevBills => prevBills.filter(bill => bill.billId !== id));
      toast.success('Success', {
        cancel: {
          label: 'Close'
        }
      });
    } else {
      toast.error('Error', {
        cancel: {
          label: 'Close'
        }
      });
    }
  };
  const findBill = billId => {
    return bills.find(bill => bill.billId === billId);
  };
  const updateBill = async (billId, status) => {
    const bill = findBill(billId);
    bill.status = status;
    setBills(prevBills => [...prevBills]);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Bill Id',
        accessor: 'billId'
      },
      {
        Header: ({ column }) => (
          <Button variant='ghost' {...column.getSortByToggleProps()}>
            Total
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
        accessor: 'totalPrice',
        Cell: ({ value }) =>
          value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      },
      {
        Header: ({ column }) => (
          <Button variant='ghost' {...column.getSortByToggleProps()}>
            Date
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
        accessor: 'date',
        Cell: ({ value }) => formatDateTime(value),
        sortType: (rowA, rowB) =>
          new Date(rowA.values.date) - new Date(rowB.values.date)
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
          return value == 'Completed' ? (
            <div className='text-green-500 font-semibold'>
              Completed
            </div>
          ) : value == 'Pending' ? (
            <div className='text-orange-500 font-semibold'>
              Pending
            </div>
          ) : value == 'Ongoing' ? (
            <div className='text-blue-500 font-semibold'>Ongoing</div>
          ) : (
            <div className='text-red-500 font-semibold'>Failed</div>
          );
        }
      },

      {
        id: 'action',
        Cell: ({ row }) => {
          return (
            <div className='flex mr-[-8px] w-10'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='ghost' className='px-2 py-[2px] h-fit'>
                    <Pencil color='gray' size={20} />
                  </Button>
                </DialogTrigger>
                <BillDialog
                  bill={findBill(row.original.billId)}
                  onUpdate={updateBill}
                />
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='ghost' className='px-2 py-[2px] h-fit'>
                    <Trash color='gray' size={20} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your bill and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(row.original.billId)}
                      className='bg-red-500 hover:bg-red-400'>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        }
      }
    ],
    [bills]
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
    { columns, data: bills, initialState: { pageIndex: 0 } },
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
