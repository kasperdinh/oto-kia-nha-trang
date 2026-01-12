import { HeroBanner } from "../components/home/HeroBanner";
import { FeaturedCars } from "../components/home/FeaturedCars";
import { Promotions } from "../components/home/Promotions";
import { Testimonials } from "../components/home/Testimonials";
import { getFeaturedCars } from "@/lib/data/cars";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <FeaturedCars cars={featuredCars} />
      <Promotions />
      <Testimonials />
    </div>
  );
}
