import {
  findAllColors,
  createColorRepository,
  updateColorRepository,
  deleteColorRepository,
} from "@/repositories/color.repository";

export async function getAllColors() {
  return findAllColors();
}

export async function createColor(data: {
  nameVI: string;
  nameEN?: string;
  code: string;
  hexCode?: string;
}) {
  return createColorRepository(data);
}

export async function updateColor(
  id: string,
  data: {
    nameVI?: string;
    nameEN?: string;
    code?: string;
    hexCode?: string;
  },
) {
  return updateColorRepository(id, data);
}

export async function deleteColor(id: string) {
  return deleteColorRepository(id);
}
