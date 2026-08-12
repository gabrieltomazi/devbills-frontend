import type { Category } from "../types/category.types";
import { api } from "./api";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};
