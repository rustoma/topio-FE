import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { z } from "zod";

import { Container } from "@/components/container/Container";
import { Button } from "@/features/dashboard/components/button/Button";
import { Card } from "@/features/dashboard/components/card/Card";
import { PAGE_ROUTES } from "@/features/dashboard/const/pageRoutes";
import { FormRow } from "@/features/dashboard/forms/formRow/FormRow";
import { Input } from "@/features/dashboard/forms/input/Input";
import { useDashboardApiClient } from "@/features/dashboard/hooks/useDashboardApi";
import { editProductCategory, getProductCategory } from "@/services/dashboard";
import { ProductCategory } from "@/types/category";
import { VALIDATORS } from "@/utils/valiadtors";

import "./editProductCategoryForm.style.scss";

const editProductCategoryFormSchema = z.object({
  name: VALIDATORS.required("Pole jest wymagane"),
});

type EditProductCategoryFormData = z.infer<typeof editProductCategoryFormSchema>;

export const EditProductCategoryForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const { apiClient } = useDashboardApiClient();

  const {
    data: category,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useSWR(id ? PAGE_ROUTES.categoryEdit(Number(id)) : undefined, () => getProductCategory(apiClient)(Number(id)));

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProductCategoryFormData>({
    resolver: zodResolver(editProductCategoryFormSchema),
    values: {
      name: category?.name || "",
    },
  });
  const onSubmit = (category: ProductCategory) => async (data: EditProductCategoryFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess("");
      setIsError(false);
      await editProductCategory(apiClient)({ ...category, ...data });

      setIsSuccess(`Kategoria ${data.name} o ID: ${id} została pomyślnie uaktualniona.`);

      await mutate(PAGE_ROUTES.categoryEdit(Number(id)));

      reset();
      await router.push(PAGE_ROUTES.categories);
    } catch (error) {
      console.log({ error });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isCategoryLoading && "Loading..."}
      {categoryError && !isCategoryLoading && "Error..."}
      {!isCategoryLoading && !categoryError && category && (
        <Card>
          <Container>
            <form onSubmit={handleSubmit(onSubmit(category))}>
              <FormRow>
                <Input
                  fit
                  required
                  {...register("name")}
                  label="Nazwa kategorii"
                  error={!!errors.name?.message}
                  hint={errors.name?.message?.toString()}
                />
              </FormRow>

              <FormRow>
                <div className="edit-product-category-form__actions">
                  <Button type="submit">Zapisz</Button>
                  {isLoading && <div>Loading...</div>}
                </div>
              </FormRow>

              {isError && <div>Ops, nie edycja kategorii się nie powiodła.</div>}
              {isSuccess && <div>{isSuccess}</div>}
            </form>
          </Container>
        </Card>
      )}
    </>
  );
};
