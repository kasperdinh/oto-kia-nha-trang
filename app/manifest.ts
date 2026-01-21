import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KIA Khánh Hòa",
    short_name: "KIA Khánh Hòa",
    description:
      "Giới thiệu xe ô tô KIA chính hãng tại Khánh Hòa. Cập nhật bảng giá xe KIA mới nhất, ưu đãi và khuyến mãi hấp dẫn.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c4161c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo-footer.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
