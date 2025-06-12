import { StatisticCard } from "@/components/admin/Dashboard/Card";
import ChartLine from "@/components/admin/Dashboard/chartLine";
import BestSeller from "@/components/admin/Dashboard/bestSeller";
import ChartDonut from "@/components/admin/Dashboard/chartDonut";
import foodApi from "@/apis/foodApi";
import billApi from "@/apis/billApi";

import { useEffect, useState } from "react";
export default function DashboardPage() {
  const [foods, setFoods] = useState([]);
  const [bills, setBills] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response1 = await foodApi.getAllFood(1, 1000, null);
      const response2 = await billApi.getBillCompleted();
      if (response1 && response1.status == "success") {
        setFoods(response1.data);
      }
      if (response2 && response2.status == "success") {
        const data = response2.data.map((item) => {
          // Sao chép item để tránh thay đổi trực tiếp dữ liệu gốc
          const updatedItem = { ...item, foodInfo: JSON.parse(item.foodInfo) };
          return updatedItem; // Trả về đối tượng đã cập nhật
        });
        setBills(data); // Cập nhật state với mảng đã sửa
      }
    }
    fetchData();
  }, []);
  if (!foods || !bills) {
    return (
      <div className="text-center">
        <div className="mt-8 font-bold text-3xl">Error</div>
      </div>
    );
  }
  return (
    <div>
      <StatisticCard bills={bills} foods={foods} />
      <ChartLine bills={bills} />
      <div className="md:flex">
        <BestSeller bills={bills} />
        <ChartDonut bills={bills} />
      </div>
    </div>
  );
}
