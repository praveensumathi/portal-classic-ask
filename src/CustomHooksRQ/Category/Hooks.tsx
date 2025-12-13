import { useQuery } from "@tanstack/react-query";
import {
  ICategory,
  ICategoryWithProducts,
  IProduct,
  IProductDetails,
  ISearchProduct,
} from "../../interface/types";
import { httpWithoutCredentials } from "../../services/http";
import { useState } from "react";

const getCategories = async () => {
  try {
    const response = await httpWithoutCredentials.get<ICategory[]>(
      "/category/fetchCategory"
    );
    return response.data;
  } catch (error) {
    var message = (error as Error).message;
    throw new Error(message);
  }
};

const getCategoryWiseProducts = async () => {
  try {
    var response = await httpWithoutCredentials.get<ICategoryWithProducts[]>(
      "/category/getAllProductsByCategory"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProductsByCategoryId = async (categoryId: string) => {
  try {
    var response = await httpWithoutCredentials.get<ICategoryWithProducts>(
      `/category/fetchProductsByCategory/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchProductDetailById = async (productId: string) => {
  try {
    var response = await httpWithoutCredentials.get<IProductDetails>(
      `/product/fetchProductByID/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

export const useGetCategoryWiseProducts = () => {
  return useQuery({
    queryKey: ["categoryWiseProducts"],
    queryFn: getCategoryWiseProducts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 3,
  });
};

export const useGetProductsByCategoryId = (
  categoryId: string,
  onError: (error: any) => void
) => {
  return useQuery({
    queryKey: ["productsByCategoryId", categoryId],
    queryFn: () => getProductsByCategoryId(categoryId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onError: (error) => onError(error),
  });
};

export const useProductDetailById = (
  productId: string,
  onError: (error: any) => void
) => {
  return useQuery({
    queryKey: ["ProductById", productId],
    queryFn: () => fetchProductDetailById(productId),
    onError: (error) => onError(error),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
