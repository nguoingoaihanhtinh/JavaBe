import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown } from 'lucide-react';


const optionsCustom = (maxY, unitY, color) => {
      console.log(color)
      if (maxY == 0) {
            maxY = 10
      }
      return {
            legend: {
                  show: false,
                  position: 'top',
                  horizontalAlign: 'left',
            },
            colors: [color],
            chart: {
                  fontFamily: 'Satoshi, sans-serif',
                  height: 335,
                  type: 'line',
                  dropShadow: {
                        enabled: true,
                        color: '#623CEA14',
                        top: 10,
                        blur: 4,
                        left: 0,
                        opacity: 0.1,
                  },

                  toolbar: {
                        show: false,
                  },
            },
            responsive: [
                  {
                        breakpoint: 1024,
                        options: {
                              chart: {
                                    height: 300,
                              },
                        },
                  },
                  {
                        breakpoint: 1366,
                        options: {
                              chart: {
                                    height: 350,
                              },
                        },
                  },
            ],
            stroke: {
                  width: [2, 2],
                  curve: 'straight',
            },
            grid: {
                  xaxis: {
                        lines: {
                              show: true,
                        },
                  },
                  yaxis: {
                        lines: {
                              show: true,
                        },
                  },
            },
            dataLabels: {
                  enabled: false,
            },
            markers: {
                  size: 4,
                  colors: '#fff',
                  strokeColors: [color],
                  strokeWidth: 3,
                  strokeOpacity: 0.9,
                  fillOpacity: 1,
                  hover: {
                        sizeOffset: 5,
                  },
            },
            xaxis: {
                  type: 'numberic',
                  min: 1,

                  axisBorder: {
                        show: false,
                  },
                  axisTicks: {
                        show: false,
                  },

            },
            yaxis: {
                  labels: {
                        formatter: function (value) {
                              return value + `${unitY}`;  // Thêm đơn vị vào sau giá trị
                        },
                  },
                  min: 0,
                  max: maxY,
                  tickAmount: 10,
            },
      }

}
function generateRevenueData(bills, month, year) {
      let totals;

      if (month == "All") {
            const monthlyTotals = Array(12).fill(0);

            bills.forEach(bill => {
                  const billDate = new Date(bill.date);
                  const billYear = billDate.getFullYear();
                  const billMonth = billDate.getMonth(); // 0 = tháng 1, 11 = tháng 12

                  if (billYear == year) {
                        monthlyTotals[billMonth] += bill.totalPrice;
                  }
            });

            // Chuyển sang đơn vị triệu và làm tròn 2 chữ số thập phân
            totals = monthlyTotals.map(total => parseFloat((total / 1_000_000).toFixed(2)));
      } else {
            // Xác định số ngày trong tháng
            const daysInMonth = new Date(year, month, 0).getDate();
            const dailyTotals = Array(daysInMonth).fill(0);

            bills.forEach(bill => {
                  const billDate = new Date(bill.date);
                  const billYear = billDate.getFullYear();
                  const billMonth = billDate.getMonth() + 1; // +1 vì tháng 1 = 0 trong JS
                  const billDay = billDate.getDate();

                  if (billYear == year && billMonth == month) {
                        dailyTotals[billDay - 1] += bill.totalPrice;
                  }
            });

            // Chuyển sang đơn vị triệu và làm tròn 2 chữ số thập phân
            totals = dailyTotals.map(total => parseFloat((total / 1_000_000).toFixed(2)));
      }

      // Tìm giá trị lớn nhất trong mảng và làm tròn lên số nguyên
      const maxTotal = Math.ceil(Math.max(...totals));

      return { data: totals, max: maxTotal + 1 };
}
function generateCustomerData(bills, month, year) {
      if (month == "All") {
            const monthlyUniqueUsers = Array(12).fill(0).map(() => new Set());

            bills.forEach(bill => {
                  const billDate = new Date(bill.date);
                  const billYear = billDate.getFullYear();
                  const billMonth = billDate.getMonth(); // 0 = tháng 1, 11 = tháng 12

                  if (billYear == year) {
                        monthlyUniqueUsers[billMonth].add(bill.userId);
                  }
            });

            const monthlyCounts = monthlyUniqueUsers.map(usersSet => usersSet.size);
            const maxUsers = Math.max(...monthlyCounts);
            const roundedMaxUsers = Math.ceil(maxUsers / 10) * 10;

            return {
                  data: monthlyCounts,
                  max: roundedMaxUsers
            };
      }

      const daysInMonth = new Date(year, month, 0).getDate();
      const dailyUniqueUsers = Array(daysInMonth).fill(0).map(() => new Set());

      bills.forEach(bill => {
            const billDate = new Date(bill.date);
            const billYear = billDate.getFullYear();
            const billMonth = billDate.getMonth() + 1; // +1 vì tháng 1 = 0 trong JS
            const billDay = billDate.getDate();

            if (billYear == year && billMonth == month) {
                  dailyUniqueUsers[billDay - 1].add(bill.userId);
            }
      });

      const dailyCounts = dailyUniqueUsers.map(usersSet => usersSet.size);
      const maxUsers = Math.max(...dailyCounts);
      const roundedMaxUsers = Math.ceil(maxUsers / 10) * 10;

      return {
            data: dailyCounts,
            max: roundedMaxUsers
      };
}

function generateSaleData(bills, month, year) {
      if (month == "All") {
            const monthlyQuantities = Array(12).fill(0);

            bills.forEach(bill => {
                  const billDate = new Date(bill.date);
                  const billYear = billDate.getFullYear();
                  const billMonth = billDate.getMonth(); // 0 = tháng 1, 11 = tháng 12

                  if (billYear == year) {
                        const totalQuantity = bill.foodInfo.reduce((sum, food) => sum + food.quantity, 0);
                        monthlyQuantities[billMonth] += totalQuantity;
                  }
            });

            const maxQuantity = Math.max(...monthlyQuantities);

            return {
                  data: monthlyQuantities,
                  max: maxQuantity
            };
      }

      // Xác định số ngày trong tháng
      const daysInMonth = new Date(year, month, 0).getDate();
      const dailyQuantities = Array(daysInMonth).fill(0);

      bills.forEach(bill => {
            const billDate = new Date(bill.date);
            const billYear = billDate.getFullYear();
            const billMonth = billDate.getMonth() + 1; // +1 vì tháng 1 = 0 trong JS
            const billDay = billDate.getDate();

            if (billYear == year && billMonth == month) {
                  const totalQuantity = bill.foodInfo.reduce((sum, food) => sum + food.quantity, 0);
                  dailyQuantities[billDay - 1] += totalQuantity;
            }
      });

      const maxQuantity = Math.max(...dailyQuantities);
      const roundedMaxSales = Math.ceil(maxQuantity / 10) * 10;


      return {
            data: dailyQuantities,
            max: roundedMaxSales
      };
}


export default function ChartLine(props) {
      const currentYear = new Date().getFullYear();
    const bills=props.bills
      const [selectMonth, setSelectMonth] = useState('All')
      const [selectYear, setSelectYear] = useState(currentYear)
      const [selectType, setSelectType] = useState('Revenue')
      const [options, setOptions] = useState(optionsCustom(generateRevenueData(bills, selectMonth, selectYear).max, 'tr', '#3C50E0'))

      const [data, setData] = useState({
            series: [
                  {
                        name: 'Revenue',
                        data: generateRevenueData(bills, selectMonth, selectYear).data,
                  },

            ],
      });
      useEffect(() => {
            if (selectType == 'Revenue') {
                  setData({
                        series: [
                              {
                                    name: 'Revenue',
                                    data: generateRevenueData(bills, selectMonth, selectYear).data,
                              },

                        ],
                  })
                  setOptions(optionsCustom(generateRevenueData(bills, selectMonth, selectYear).max, 'tr', '#3C50E0'))
            }
            if (selectType == 'Customer') {
                  setData({
                        series: [
                              {
                                    name: 'Customer',
                                    data: generateCustomerData(bills, selectMonth, selectYear).data,
                              },

                        ],
                  })
                  setOptions(optionsCustom(generateCustomerData(bills, selectMonth, selectYear).max, '', '#2ccece'))
            }
            if (selectType == 'Sales') {
                  setData({
                        series: [
                              {
                                    name: 'Sales',
                                    data: generateSaleData(bills, selectMonth, selectYear).data,
                              },

                        ],
                  })
                  setOptions(optionsCustom(generateSaleData(bills, selectMonth, selectYear).max, '', '#62bce8'))
            }


      }, [selectMonth, selectYear, selectType,props])
      const handleReset = () => {
            setData((prevState) => ({
                  ...prevState,
            }));
      };
      handleReset;
      return (
            <div className=" mt-4 rounded-xl col-span-12  border border-gray-200 bg-white px-5 pt-7.5 pb-5 shadow-xl dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                        <RadioGroup value={selectType} onValueChange={(e) => setSelectType(e)} className='flex items-center gap-4'>
                              <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Revenue" className='text-[#3C50E0] border-[#3C50E0]' id="r1" />
                                    <Label htmlFor="r1" className='text-[#3C50E0] font-semibold text-base'>Revenue</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Customer" id="r3" className='text-[#2ccece] border-[#2ccece]' />
                                    <Label htmlFor="r3" className='text-[#2ccece] font-semibold text-base'>Customer</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Sales" id="r2" className='text-[#62bce8] border-[#62bce8]' />
                                    <Label htmlFor="r2" className='text-[#62bce8] font-semibold text-base'>Sales</Label>
                              </div>
                        </RadioGroup>

                        <div className="flex w-full  justify-end items-center">
                              <p className='mr-1'>Month</p>
                              <div className="inline-flex items-center rounded-md bg-whiter p-1 dark:bg-meta-4">
                                    <div className="relative z-20 inline-block">
                                          <select
                                                name="#"
                                                id="#"
                                                value={selectMonth}
                                                onChange={(e) => setSelectMonth(e.target.value)}
                                                className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-2 pr-6 text-sm font-medium outline-none"
                                          >
                                                <option value="All" >All</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                                <option value={11}>11</option>
                                                <option value={12}>12</option>
                                          </select>
                                          <span className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
                                                <ChevronDown size={18} color='gray' />
                                          </span>


                                    </div>
                              </div>

                              <p className='mr-1 ml-4'>Year</p>
                              <div className="inline-flex items-center rounded-md bg-whiter p-1 dark:bg-meta-4">
                                    <div className="relative z-20 inline-block">
                                          <select
                                                name="#"
                                                id="#"
                                                value={selectYear}
                                                onChange={(e) => setSelectYear(e.target.value)}
                                                className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-2 pr-6 text-sm font-medium outline-none"
                                          >
                                                <option value={currentYear} >{currentYear}</option>
                                                <option value={currentYear - 1} >{currentYear - 1}</option>
                                                <option value={currentYear - 2} >{currentYear - 2}</option>


                                          </select>
                                          <span className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
                                                <ChevronDown size={18} color='gray' />
                                          </span>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div>
                        <div id="chartOne" className="-ml-5">
                              <ReactApexChart
                                    options={options}
                                    series={data.series}
                                    type="area"
                                    height={350}
                              />
                        </div>
                  </div>
            </div>
      );
};


