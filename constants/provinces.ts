export const PROVINCES = [
  "Nha Trang",
  "Diên Khánh",
  "Cam Lâm",
  "Cam Ranh",
  "Ninh Hòa",
  "Vạn Ninh",
  "Khác",
] as const;

export type Province = (typeof PROVINCES)[number];
