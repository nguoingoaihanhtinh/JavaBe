import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ChevronDown } from 'lucide-react';

const optionsCustom = (labels, colors) => {
  return {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: colors,
    labels: labels,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 310,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
}
function getDateMonday(date) {
  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const mondayOfCurrentWeek = new Date(currentDate);
  mondayOfCurrentWeek.setDate(currentDate.getDate() - daysFromMonday);
  mondayOfCurrentWeek.setHours(0, 0, 0, 0);
  return mondayOfCurrentWeek
}
const getTopType = (bills, filterBy = "week") => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const mondayOfCurrentWeek = getDateMonday(today);

  const filteredBills = bills.filter(bill => {
    const billTime = new Date(bill.date);
    const billYear = billTime.getFullYear();
    const billMonth = billTime.getMonth();


    if (filterBy == "month") {
      return billYear === currentYear && billMonth === currentMonth;
    } else if (filterBy == "week") {
      return billTime >= mondayOfCurrentWeek && billTime <= today;
    }
  });


  const categorySales = filteredBills.reduce((acc, bill) => {
    bill.foodInfo.forEach(item => {
      const {quantity } = item;
      const {nameType,typeId}=item.foodDetails.foodType;
      if (!acc[typeId]) {
        acc[typeId] = {nameType, quantity: 0 };
      }
      acc[typeId].quantity += quantity;
    });
    return acc;
  }, {});

  
  const salesArray = Object.values(categorySales);
  const totalSales = salesArray.reduce((sum, category) => sum + category.quantity, 0);


  salesArray.forEach(category => {
    category.percentage = parseInt(((category.quantity / totalSales) * 100).toFixed(0));
  });

 
  const top5Categories = salesArray
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 2);

  
  const top5TotalPercentage = top5Categories.reduce((sum, category) => sum + parseFloat(category.percentage), 0);
  const top5TotalQuantity = top5Categories.reduce((sum, category) => sum + parseFloat(category.quantity), 0);
  const otherPercentage = parseInt((100 - top5TotalPercentage).toFixed(0));
  const otherQuantity = parseInt((totalSales - top5TotalQuantity).toFixed(0))

  
  const colors = ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#04c1d6', '#b6d9d9',];

  
  top5Categories.forEach((category, index) => {
    if (index < top5Categories.length) {
      category.color = colors[index]; 
    }
  });
  if (otherPercentage != 0 && otherPercentage!=100) {
    top5Categories.push({ nameType: "Other", percentage: otherPercentage, quantity: otherQuantity, color: colors[5] });
  }
  console.log(top5Categories)
  return top5Categories;
}

export default function ChartDonut(props) {
  const [top, setTop] = useState(getTopType(props.bills, 'week'))
  const [colors, setColors] = useState(top.map(item => item.color))
  const [label, setLabel] = useState(top.map(item => item.nameType))
  const [data, setData] = useState({
    series: top.map(item => item.quantity),
  })
  const [options, setOptions] = useState(optionsCustom(label, colors))
  const [selectedFilter, setSelectedFilter] = useState('week')

  useEffect(() => {
    console.log(props)
    const temp = getTopType(props.bills, selectedFilter)
    setTop(temp)
    setColors(temp.map(item => item.color))
    setLabel(temp.map(item => item.nameType))
    setData({
      series: temp.map(item => item.quantity),
    })
    setOptions(optionsCustom(temp.map(item => item.nameType), temp.map(item => item.color)))
  }, [selectedFilter,props])





  return (
    <div className="md:px-7.5 col-span-12 rounded-xl border border-stroke bg-white px-5 pb-5 pt-4 shadow-xl w-full md:ml-4 mt-4">
      <div className="mb-3 justify-between gap-4 sm:flex items-center">
        <div>
          <h5 className="text-xl font-bold text-black">
            Food Type Analytics
          </h5>
        </div>
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

      <div className="mb-3">
        {top.length==0?(<div className="">
          <p className="ml-[35%] text-xl font-semibold  mt-[24%]  text-blue-600">No foods were sold.</p>
    </div>)
    :(<div id="chartThree" className="mx-auto flex justify-center">
      <ReactApexChart options={options} series={data.series} type="donut" />
    </div>)}
        
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {top.length==0?
        (<div></div>)
        :(
          top.map((item, index) => {
            return (
              <div className="sm:w-1/3 w-full px-8" key={index}>
                <div className="flex w-full items-center">
                  <span className="mr-2 block h-3 w-full max-w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span> {item.nameType} </span>
                    <span>{item.percentage} %</span>
                  </p>
                </div>
              </div>
            )
          })
        )}


      </div>
    </div>
  );
};


