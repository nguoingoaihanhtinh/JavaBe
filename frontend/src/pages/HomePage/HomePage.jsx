import AboutPage from "../AboutPage/AboutPage";
import Banner from "./Banner";
import Banner2 from "./Banner2";
import MenuCategory from "./MenuCategory";
import TrendingFood from "./TrendingFood";

export default function HomePage() {
  return (
    <div className="mt-[60px] w-full  bg-[#fffaf7]">
      <div className="px-24">
        <Banner />
        <MenuCategory />
        <TrendingFood />
        <AboutPage />
      </div>
      <Banner2></Banner2>
    </div>
  );
}
