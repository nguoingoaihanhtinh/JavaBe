import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Pencil, ArrowUpDown, Check, ChevronsUpDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "react-router-dom";
import foodApi from "@/apis/foodApi";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function FoodTable() {
  const [foods, setFoods] = useState([]);
  const [data, setData] = React.useState([]);
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [types, setTypes] = React.useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  async function fetchData() {
    const typeResponse = await foodApi.getAllFoodTypes();

    if (typeResponse.status == "success") {
      setTypes(typeResponse.data);
    }
    const foodResponse = await foodApi.getAllFood(1, 1000, null);

    if (foodResponse.status == "success") {
      const list = foodResponse.data.map((item) => {
        return {
          ...item, // Giữ lại tất cả các thuộc tính khác
          rating: item.rating ? Math.round(item.rating * 100) / 100 : 0, // Làm tròn `rating`
        };
      });
      setFoods(list);
      setData(list);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    let list = foods;
    if (search) {
      list = foods.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()));
    }
    if (!selectedType || selectedType === "" || selectedType === "All") {
      setData(list);
    } else {
      const filteredProducts = list.filter((prd) => String(prd.foodType.typeId) == selectedType || String(prd.foodType.parentId) == selectedType);
      setData(filteredProducts); // Cập nhật danh sách với sản phẩm đã lọc
    }
  }, [search, selectedType]);
  const handleChooseCategory = (selectedType) => {};
  const columns = useMemo(
    () => [
      {
        Header: "Food ID",
        accessor: "foodId",
        cell: ({ row }) => {
          return <div className="flex justify-center items-center text-center">{row.getValue("FoodId")}</div>;
        },
      },
      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "name",
      },
      {
        Header: "Type",
        accessor: "foodType.nameType",
      },

      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            Item Left
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "itemleft",
      },
      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "rating",
      },
      {
        Header: ({ column }) => (
          <Button variant="ghost" {...column.getSortByToggleProps()}>
            Number of Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        accessor: "numberRating",
      },
      {
        id: "action",
        Cell: ({ row }) => (
          <Link to={`/admin/food/detail/${row.original.foodId}`}>
            <div className="flex justify-center items-center mr-4 p-0">
              <Info className="h-[22px] w-[22px] text-gray-700 cursor-pointer hover:text-gray-500 active:scale-95 active:shadow-lg transition duration-150 ease-in-out " />
            </div>
          </Link>
        ),
      },
    ],
    []
  );

  // Thêm usePagination vào cấu hình
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
  } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useSortBy, usePagination);

  return (
    <div className="">
      <div className="flex mb-4 pl-2 items-center">
        <Link to="add">
          <Button className="bg-blue-500 hover:bg-blue-400 active:scale-95 ease-in-out transition font-semibold text-white">Add Food</Button>
        </Link>
        <div className="w-[50%] mx-auto flex items-center">
          <Input value={search} onChange={(a) => setSearch(a.target.value)} placeholder="Saerch by name" className="border-[0.5px] border-gray-300 bg-white text-base py-[18px]"></Input>
          <Search color="gray" size={20} className="ml-[-32px]" />
        </div>
        <div className=" mr-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] justify-between">
                {type ? types.find((item) => String(item.typeId) === type)?.nameType : "All"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search by id" />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {types.map((item) => (
                      <CommandItem
                        key={item.typeId}
                        value={String(item.typeId)}
                        onSelect={(currentValue) => {
                          if (currentValue === type) {
                            setSelectedType("All");
                          } else {
                            setSelectedType(currentValue);
                          }
                          setType(currentValue === type ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", type === String(item.typeId) ? "opacity-100" : "opacity-0")} />
                        {item.nameType} {item.parentId ? "(" + types.find((a) => a.typeId == item.parentId)?.nameType + ")" : ""}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className=" bg-white border h-[500px]  pt-2 relative rounded-lg shadow-lg">
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow className="pr-6" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHead className="items-center text-center justify-center" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell className="items-center text-center justify-center" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* Phần phân trang */}
        <div className="flex items-center  space-x-2 py-4 justify-center absolute  left-1/2 transform -translate-x-1/2 bottom-0">
          <Button variant="outline" size="sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <span>
            {pageIndex + 1} / {pageOptions.length}
          </span>
          <Button variant="outline" size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
