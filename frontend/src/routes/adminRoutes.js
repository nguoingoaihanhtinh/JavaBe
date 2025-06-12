import FoodPage from '@/pages/ProductMangement/FoodPage';
import FoodDetailPgae from '@/pages/ProductMangement/FoodDetailPage';
import AddFoodPage from '@/pages/ProductMangement/AddFoodPage';
import TypePage from '@/pages/ProductMangement/TypePage';
import DashboardPage from '@/pages/DashboardAdmin/DashboardPage';
import BillPage from '@/pages/BillManagement/BillPage';
import CustomerPage from '@/pages/CustomerManagement/CustomerPage';
const adminRoutes = [
  { path: '/admin', component: DashboardPage },
  { path: '/admin/food', component: FoodPage },
  { path: '/admin/food/add', component: AddFoodPage },
  { path: '/admin/type', component: TypePage },
  { path: 'admin/food/detail/:id', component: FoodDetailPgae },
  { path: '/admin/bill', component: BillPage },
  { path: '/admin/customer', component: CustomerPage },
];
export { adminRoutes };


