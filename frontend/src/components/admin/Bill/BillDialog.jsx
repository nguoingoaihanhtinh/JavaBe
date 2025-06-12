import React, { useState, Fragment } from 'react';
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
import { toast } from 'sonner';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import billApi from '@/apis/billApi';

const BillDialog = ({ bill, onUpdate }) => {
  const [initialStatus] = useState(bill.status);
  const [currentStatus, setCurrentStatus] = useState(bill.status);
  const shippingFee = 12000;
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
    return `${formattedTime}-${day}/${month}/${year}`;
  }
  const parseAddress = address => {
    const addressString = `${address.username}, ${address.phonenumber}, ${address.address}, ${address.ward}, ${address.district}, ${address.city}`;
    return addressString;
  };
  const handleSave = async () => {
    if (currentStatus != initialStatus) {
      const res = await billApi.updateStatusBill(bill.billId, currentStatus);
      if (res && res.status == 'success') {
        onUpdate(bill.billId, currentStatus);
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
    }
  };

  return (
    <DialogContent className='sm:max-w-[925px] ml-[7%]'>
      <DialogHeader>
        <DialogTitle>Edit bill status #{bill.billId}</DialogTitle>
        <DialogDescription>
          Make changes to bill status here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-3 w-[100%]'>
        <div className='flex justify-between pr-8'>
          <div>
            <div className='flex items-center'>
              <Label className='w-20'>Time </Label>
              <p className='font-normal text-base ml-2 '>
                {formatDateTime(bill.date)}
              </p>
            </div>
            <div className='flex mt-1'>
              <Label className='w-20'>Information</Label>
              <div className='mr-3 -mt-1 ml-3 flex flex-col'>
                <span className='text-base'>Name: {bill.address.username}</span>
                <span className='text-base'>
                  Phone: {bill.address.phonenumber}
                </span>
                <span className='text-base'>
                  Address: {bill.address.address}, {bill.address.ward},{' '}
                  {bill.address.district}, {bill.address.city}
                </span>
              </div>
            </div>
          </div>

          <div className='flex'>
            <Label className='mx-4'>Status</Label>
            <RadioGroup
              defaultValue={initialStatus}
              onValueChange={value => setCurrentStatus(value)}>
              <div className='flex items-center space-x-2 text-red-500'>
                <RadioGroupItem value='Failed' id='r1' />
                <Label htmlFor='r1'>Failed</Label>
              </div>
              <div className='flex items-center space-x-2 text-orange-500'>
                <RadioGroupItem value='Pending' id='r2' />
                <Label htmlFor='r2'>Pending</Label>
              </div>
              <div className='flex items-center space-x-2 text-blue-500'>
                <RadioGroupItem value='Ongoing' id='r3' />
                <Label htmlFor='r3'>Ongoing</Label>
              </div>

              <div className='flex items-center space-x-2 text-green-400'>
                <RadioGroupItem value='Completed' id='r4' />
                <Label htmlFor='r4'>Completed</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Label>Food List</Label>
        <div className='overflow-y-auto max-h-48'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Food</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bill.foodInfo.map((foodInfo, index) => (
                <Fragment key={foodInfo.foodId}>
                  <TableRow>
                    <TableCell className='text-left'>{index + 1}</TableCell>
                    <TableCell>{foodInfo.foodDetails.name}</TableCell>
                    <TableCell>{foodInfo.quantity}</TableCell>
                    <TableCell>
                      {foodInfo.foodDetails.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      })}
                    </TableCell>
                    <TableCell>
                      {(
                        foodInfo.quantity * foodInfo.foodDetails.price
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      })}
                    </TableCell>
                    <TableCell>{foodInfo.note}</TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        <Label htmlFor='totalPrice' className=' text-right text-md'>
          Shipping fee:{''}
          <span className='ml-4'>{shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </Label>
        <Label htmlFor='totalPrice' className=' text-right text-md -mt-3'>
          Sub Total:{' '}
          <span className='text-red-500'>
            {bill.totalPrice.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </span>
        </Label>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type='submit'
            className='bg-green-600 hover:bg-green-500 text-white'
            onClick={handleSave}>
            Save changes
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default BillDialog;
