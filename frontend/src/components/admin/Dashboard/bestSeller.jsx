import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function getDateMonday(date) {
      const currentDate = new Date(date);
      const dayOfWeek = currentDate.getDay();
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const mondayOfCurrentWeek = new Date(currentDate);
      mondayOfCurrentWeek.setDate(currentDate.getDate() - daysFromMonday);
      mondayOfCurrentWeek.setHours(0, 0, 0, 0);
      return mondayOfCurrentWeek
}
function getTopProducts(bills, filterBy = "week") {
      console.log(filterBy)
      console.log(bills)
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();

      const mondayOfCurrentWeek = getDateMonday(today);
      // Lọc hóa đơn theo tuần hoặc tháng
      const filteredBills = bills.filter(bill => {
            const billTime = new Date(bill.date);
            const billYear = billTime.getFullYear();
            const billMonth = billTime.getMonth();
            console.log


            if (filterBy == "month") {
                  return billYear === currentYear && billMonth === currentMonth;
            } else if (filterBy == "week") {
                  return billTime >= mondayOfCurrentWeek && billTime <= today;
            }
      });

      // Tính tổng số lượng bán của từng sản phẩm
      const productSales = filteredBills.reduce((acc, bill) => {
            bill.foodInfo.forEach(item => {
                  const { foodId, quantity, foodDetails } = item;

                  if (!acc[foodId]) {
                        acc[foodId] = {
                              foodId: foodId,
                              name: foodDetails.name,
                              image1: foodDetails.image1,
                              totalQuantity: 0,
                        };
                  }
                  acc[foodId].totalQuantity += quantity;
            });
            return acc;
      }, {});

      // Chuyển đối tượng acc thành mảng và sắp xếp theo tổng số lượng bán giảm dần
      const sortedProductSales = Object.values(productSales)
            .sort((a, b) => b.totalQuantity - a.totalQuantity)
            .slice(0, 5); // Lấy 5 sản phẩm bán chạy nhất
      console.log("abcdef")
      console.log(sortedProductSales[0])
      return sortedProductSales;
}



export default function BestSeller(props) {
      const [top, setTop] = useState([])
      const [selectedFilter, setSelectedFilter] = useState('week')
      useEffect(() => {
            setTop(getTopProducts(props.bills, selectedFilter))
      }, [selectedFilter,props.bills])
      return (
            <div className="md:w-2/5 bg-white px-4 pb-3 pt-4 rounded-xl shadow-xl h-[420px] mt-4">
                  <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Best Seller</p>
                        <div className="inline-flex items-center rounded-md bg-whiter p-1 dark:bg-meta-4">
                              <div className="relative z-20 inline-block">
                                    <select
                                          name="#"
                                          id="#"
                                          value={selectedFilter}
                                          onChange={(e) => setSelectedFilter(e.target.value)}
                                          className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-2 pr-6 text-sm font-medium outline-none"
                                    >
                                          <option value='week' >week</option>
                                          <option value='month'>month</option>

                                    </select>
                                    <span className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
                                          <ChevronDown size={18} color='gray' />
                                    </span>

                              </div>
                        </div>
                  </div>
                  <div className="mt-4 mx-auto">
                        {top.length==0?
                        (<div className="w-[500px]">
                              <p className="ml-[50%] -translate-x-[50%] text-xl font-semibold  mt-[30%]  text-blue-600">No foods were sold.</p>
                        </div>)
                        :(top.map((item, index) => {
                              return (
                                    <Link
                                          key={index}
                                     to={`/admin/food/detail/${item.foodId}`}
                                          state={{ id: item.foodId }}>
                                          <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                                                <div className="rounded-md bg-white  p-[1px] w-14 items-center justify-center flex h-13">
                                                      <img src={item.image1} className="h-auto w-auto rounded-md object-cover" />
                                                </div>
                                                <div className="ml-4 w-[400px]">
                                                      <p className="text-lg font-semibold line-clamp-1">{item.name}</p>
                                                      <p className="text-gray-500 ">{item.totalQuantity} sold</p>
                                                </div>
                                          </div>
                                    </Link>

                              )
                        }))}
                  </div>
            </div>
      )
}