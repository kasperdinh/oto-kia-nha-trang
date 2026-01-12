import { HeroBanner } from "../components/home/HeroBanner";
import { FeaturedCars } from "../components/home/FeaturedCars";
import { Promotions } from "../components/home/Promotions";
import { Testimonials } from "../components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <FeaturedCars />
      <Promotions />
      <Testimonials />
    </div>
  );
}
