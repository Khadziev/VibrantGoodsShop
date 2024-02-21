import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/providers/store";
import { ICategory } from "@/components/Category/model/model";

export const apiCategory = createApi({
  reducerPath: "apiCategory",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.delete("Content-Type");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], void>({
      query: () => "categories",
    }),
    addCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (newCategoryData) => ({
        url: "categories",
        method: "POST",
        body: newCategoryData,
      }),
    }),
    updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (updatedCategoryData) => ({
        url: `categories/${updatedCategoryData._id}`,
        method: "PUT",
        body: updatedCategoryData,
      }),
    }),
    deleteCategory: builder.mutation<ICategory, string>({
      query: (categoryId) => ({
        url: `categories/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = apiCategory;
