import { AiOutlineProduct } from "react-icons/ai";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function calculateMonthlyComparison(bills) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Tạo đối tượng ngày tháng hiện tại và tháng trước
  const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
  const endOfCurrentPeriod = now;

  const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfLastPeriod = new Date(currentYear, currentMonth, 0, 23, 59, 59);

  // Lọc các hóa đơn trong tháng hiện tại cho đến hôm nay
  const currentMonthBills = bills.filter((bill) => {
    const billDate = new Date(bill.date);
    return billDate >= startOfCurrentMonth && billDate <= endOfCurrentPeriod;
  });

  // Lọc các hóa đơn trong cùng kỳ của tháng trước
  const lastMonthBills = bills.filter((bill) => {
    const billDate = new Date(bill.date);
    return billDate >= startOfLastMonth && billDate <= endOfLastPeriod;
  });

  // Tính tổng TotalPrice của tháng hiện tại và tháng trước
  const currentMonthTotal = currentMonthBills.reduce((sum, bill) => sum + bill.totalPrice, 0);
  const lastMonthTotal = lastMonthBills.reduce((sum, bill) => sum + bill.totalPrice, 0);

  /// So sánh
  const comparison = currentMonthTotal >= lastMonthTotal ? "increased" : "decreased";
  const difference = Math.abs(currentMonthTotal - lastMonthTotal);

  // Tính tỷ lệ thay đổi phần trăm
  const percentageChangeRevenue = lastMonthTotal !== 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : null; // Trường hợp tháng trước không có hóa đơn
  // Count unique users for this month and last month
  const uniqueUsersThisMonth = new Set(currentMonthBills.map((bill) => bill.userId)).size;
  const uniqueUsersLastMonth = new Set(lastMonthBills.map((bill) => bill.userId)).size;

  // Calculate percentage change
  const percentageChangeUser = uniqueUsersLastMonth ? ((uniqueUsersThisMonth - uniqueUsersLastMonth) / uniqueUsersLastMonth) * 100 : null;

  const totalSaleThisMonth = currentMonthBills.reduce((tong, hoaDon) => {
    return tong + hoaDon.foodInfo.reduce((tongHoaDon, food) => tongHoaDon + food.quantity, 0);
  }, 0);
  const totalSaleLastMonth = lastMonthBills.reduce((tong, hoaDon) => {
    return tong + hoaDon.foodInfo.reduce((tongHoaDon, food) => tongHoaDon + food.quantity, 0);
  }, 0);
  const percentageChangeSales = totalSaleLastMonth ? ((totalSaleThisMonth - totalSaleLastMonth) / totalSaleLastMonth) * 100 : null;
  return {
    currentMonthTotal: currentMonthTotal.toLocaleString(),
    lastMonthTotal: lastMonthTotal.toLocaleString(),
    difference: difference.toLocaleString(),
    percentageChangeRevenue: percentageChangeRevenue,
    uniqueUsersThisMonth,
    percentageChangeUser,
    totalSaleThisMonth,
    percentageChangeSales,
    comparison,
  };
}
export function StatisticCard(props) {
  const result = calculateMonthlyComparison(props.bills);
  console.log("?????");
  console.log(result);
  console.log(JSON.stringify(props.bills));
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground text-[#259AE6]">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{result.currentMonthTotal} đ</div>
          <p className="text-xs text-muted-foreground">
            {result.percentageChangeRevenue >= 0 ? "+" : "-"} {result.percentageChangeRevenue ? result.percentageChangeRevenue : "N"} % from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground text-[#259AE6]">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{result.totalSaleThisMonth}</div>
          <p className="text-xs text-muted-foreground">
            {result.totalSaleThisMonth >= 0 ? "+" : "-"} {result.percentageChangeSales ? result.percentageChangeSales : "N"} % from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customer</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground text-[#259AE6]">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{result.uniqueUsersThisMonth}</div>
          <p className="text-xs text-muted-foreground">
            {result.percentageChangeUser >= 0 ? "+" : "-"} {result.percentageChangeUser ? result.percentageChangeUser : "N"} % from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Product</CardTitle>
          <AiOutlineProduct className="h-5 w-5 text-muted-foreground text-[#259AE6]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{props.foods.length}</div>
        </CardContent>
      </Card>
    </div>
  );
}
