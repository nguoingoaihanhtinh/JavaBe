import React, { useMemo } from 'react';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {ArrowUpDown, Pencil, Trash} from "lucide-react"
  import { useState } from 'react';
  import { ChevronDown } from 'lucide-react';
import foodApi from '@/apis/foodApi';
import { toast } from 'sonner';
export default function TypeTable(props){
   
    const data=props.types
    
    const handleDialogOpen = () => {
      setName("");  // Reset giá trị khi mở dialog
    };
    const deleteType = async(typeDelete)=>{
      if(typeDelete.totalFood!=0)
      {
        toast.info("Cannot delete because there are existing foods.", {
          cancel: {
            label: "Close",
          },
        })
        return;
      }
        const response= await foodApi.deleteFoodType(typeDelete.typeId)
        if(response&& response.status=='success')
        {
          
          props.setTypes((prevData) => prevData.filter((item) => item.typeId !== typeDelete.typeId && item.parentId!=typeDelete.typeId))
          toast.success("Successul", {
            cancel: {
              label: "Close",
            },
          })
        }else{
          toast.error("Error", {
            cancel: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          })
        }
    }
   
  const columns = useMemo(
    () => [
      {
        Header: ({ column }) => (
            <Button variant="ghost" {...column.getSortByToggleProps()}>
             Id
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        accessor: 'typeId',
      },
      {
        Header: 'Name Type',
        accessor: 'nameType',
      },
      {
        Header: 'Parent Id',
        accessor: 'parentId',
        Cell: ({ value }) => (value ? value : 'No'),
      },
      {
        Header: ({ column }) => (
            <Button variant="ghost" {...column.getSortByToggleProps()}>
             Food count
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        accessor: "totalFood",
      },
     
      {
        id: "action",
        Cell: ({ row }) => 
          {
            const [name, setName] = useState(row.original.nameType)
            const [selected, setSelected] = useState(row.original.parentId)
            const list=data.filter(item=>item.typeId!=row.original.typeId)
            const updateType= async(type)=>{
              const response= await foodApi.updateType(type)
              if(response)
              {
                console.log(response)
                if(response.status=='success')
                {
                  toast.success("Successful", {
                    cancel: {
                      label: "Close",
                    },})
                    props.setTypes((data)=>data.map(food => 
                      food.typeId == type.typeId ? { ...food, nameType: type.nameType,parentId:type.parentId } : food
                    ))
                }
                else{
                  setName(row.original.nameType);
                  setSelected(row.original.parentId); 
                  toast.warning(response.message, {
                    cancel: {
                      label: "Close",
                    },})
                }
                
              }else{
                setName(row.original.nameType);
                  setSelected(row.original.parentId); 
                toast.error("Error", {
                  cancel: {
                    label: "Close",
                  },
                })
              }
        
            }
            return  (
              <div className='flex mr-[-8px]'>
                 <Dialog>
          <DialogTrigger asChild >
          <Button variant="ghost" className="px-2 py-[2px] h-fit"><Pencil color='gray' size={20} /></Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Food Type Id {row.original.typeId}</DialogTitle>
              <DialogDescription>
                Make changes to your type here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div>
                    <label >
                        Name Type
                    </label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(a) => setName(a.target.value)}
                        className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className="mt-4">
                    <label className="mb-3 block text-black dark:text-white">
                        Parent
                    </label>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <select
    
                           
                           value={selected}
                            onChange={(e) => {
                                setSelected(e.target.value);
                            }}
                            className={`disabled:bg-whiter relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `} >
                            <option value="-1" className="text-gray-600 font-bold dark:text-bodydark">
                                No parent
                            </option>
                            {list.map((type) => {
                                return (
                                    <option value={type.typeId} className="text-body dark:text-bodydark">
                                        {type.nameType}
                                    </option>
                                )
                            })}
                        </select>
                        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                            <ChevronDown color="gray" />
                        </span>
                    </div>
                </div>
            </div>
            <DialogFooter>
            <Button onClick={()=>updateType({typeId:row.original.typeId,nameType:name,parentId:selected})} className="bg-blue-500 hover:bg-blue-400 active:scale-95 active:shadow-md transition ease-in-out text-base pt-1
                text-center font-semibold text-white ">Save changes</Button>
    
            </DialogFooter>
          </DialogContent>
        </Dialog>
                
    <AlertDialog>
              <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="px-2 py-[2px] h-fit"><Trash color='gray' size={20} /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          food type and remove your data from our servers.
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel >Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>deleteType(row.original)} className="bg-red-500 hover:bg-red-400">Delete</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>
              </div> 
            )
          }
         
      },
    ],
    [data]
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
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

    return(
        <div className=" bg-white border shadow-md  pt-5 relative h-full w-full rounded-lg px-4">
            <div className='font-bold text-lg mb-3 '>Food type</div>
 <Table   {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow className='pr-6' {...headerGroup.getHeaderGroupProps()}>
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
    )
}