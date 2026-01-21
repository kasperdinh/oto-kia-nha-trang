import { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { Promotions } from "@/components/home/Promotions";
import { Testimonials } from "@/components/home/Testimonials";
import { getHighLightCars } from "@/services/car.service";
import { toCarDTO } from "@/dtos/car.dto";

import { getBaseUrl } from "@/lib/url-helper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: getBaseUrl(),
  },
};

export default async function Home() {
  const data = await getHighLightCars();

  const featuredCars = data.data.map(toCarDTO);

  return (
    <div className="flex flex-col">
      <HeroBanner />
      <FeaturedCars cars={featuredCars} />
      <Promotions />
      <Testimonials />
    </div>
  );
}
