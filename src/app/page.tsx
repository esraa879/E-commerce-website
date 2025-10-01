import getAllProducts from "@/apis/allProducts";
import HomeCard from "./_component/HomeCard/HomeCard";
import MainSlider from "./_component/MainSlider/MainSlider";
import CategorySlide from "./_component/CategorySlide/CategorySlide";
import { Product } from "../types/product.type";


export default async function Home() {
  
    const data:Product[] = await getAllProducts()

  return (
    <section className="p-5  md:px-0 my-10 w-full md:w-[80%] mx-auto">
     <MainSlider/>
     <CategorySlide/>
      <div className="flex flex-wrap  ">
        {data.map((product:Product, idx) => <HomeCard key={idx} product={product} />
         
        )}
      </div>
    </section>
  );
}
