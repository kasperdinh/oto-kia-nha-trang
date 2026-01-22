import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CarDetail } from "@/components/cars/CarDetail";
import { getCarDetail } from "@/services/car.service";
import { toCarDetailDTO } from "@/dtos/car.dto";
import { getBaseUrl } from "@/lib/url-helper";

// Since this is a dynamic route, we need to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const carData = await getCarDetail(resolvedParams.slug);

  if (!carData) {
    return {
      title: "Không tìm thấy xe | KIA Khánh Hòa",
      description: "Mẫu xe bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  const car = toCarDetailDTO(carData);

  const title = `Giá Xe ${car.name} Nha Trang - Khánh Hòa | Thông Số & Khuyến Mãi`;
  const description = `Chi tiết xe ${car.name} tại KIA Nha Trang. Giá lăn bánh, thông số kỹ thuật, hình ảnh và khuyến mãi mới nhất. Mua xe ${car.name} trả góp lãi suất thấp.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: car.images?.[0] ? [car.images[0].url] : [],
      type: "article",
    },
    alternates: {
      canonical: `${getBaseUrl()}/xe/${car.slug}`,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const carData = await getCarDetail(resolvedParams.slug);

  if (!carData) {
    notFound();
  }

  const car = toCarDetailDTO(carData);

  if (!car) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.name,
    image: car.images?.map((img) => img.url) || [],
    description: car.description,
    brand: {
      "@type": "Brand",
      name: "KIA",
    },
    offers: {
      "@type": "Offer",
      url: `${getBaseUrl()}/xe/${car.slug}`,
      priceCurrency: "VND",
      price: car.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: "KIA Khánh Hòa",
      },
    },
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb could go here */}
        <CarDetail car={car} />
      </div>
    </div>
  );
}
