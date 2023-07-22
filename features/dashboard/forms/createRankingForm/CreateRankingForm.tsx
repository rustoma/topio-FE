import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import { z } from "zod";

import { Container } from "@/components/container/Container";
import { Button } from "@/features/dashboard/components/button/Button";
import { Card } from "@/features/dashboard/components/card/Card";
import { PAGE_ROUTES } from "@/features/dashboard/const/pageRoutes";
import { FormRow } from "@/features/dashboard/forms/formRow/FormRow";
import { Input } from "@/features/dashboard/forms/input/Input";
import Select from "@/features/dashboard/forms/select/Select";
import { useDashboardApiClient } from "@/features/dashboard/hooks/useDashboardApi";
import { createPage, getAllProductCategories } from "@/services/dashboard";
import { VALIDATORS } from "@/utils/valiadtors";

import "./createRankingForm.style.scss";

const createRankingFormSchema = z.object({
  entryDataUrl: VALIDATORS.required("Pole jest wymagane"),
  title: VALIDATORS.required("Pole jest wymagane"),
  productName: VALIDATORS.required("Pole jest wymagane"),
  slug: VALIDATORS.required("Pole jest wymagane"),
  // parentPage: z.number() || z.null(),
  productCategory: VALIDATORS.requiredNumber("Pole jest wymagane"),
});

type CreateRankingFormData = z.infer<typeof createRankingFormSchema>;

export const CreateRankingForm = () => {
  const { apiClient } = useDashboardApiClient();

  const {
    data: categories,
    isLoading: areCategoriesLoading,
    error: categoriesError,
  } = useSWR(PAGE_ROUTES.categories, getAllProductCategories(apiClient));

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRankingFormData>({
    resolver: zodResolver(createRankingFormSchema),
  });

  const onSubmit = async (data: CreateRankingFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess("");
      setIsError(false);
      const id = await createPage(apiClient)({
        entry_data_url: data.entryDataUrl,
        title: data.title,
        product_name: data.productName,
        slug: data.slug,
        product_category: data.productCategory,
        parent_page: null,
      });

      setIsSuccess(`Strona o ID: ${id} została pomyślnie utworzona.`);

      reset();
    } catch (error) {
      console.log({ error });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ categories });

  return (
    <>
      {categoriesError && !areCategoriesLoading && <div>Error...</div>}
      {areCategoriesLoading && <div>Loading...</div>}
      {!areCategoriesLoading && !categoriesError && categories && (
        <Card>
          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormRow>
                <Input
                  fit
                  required
                  {...register("entryDataUrl")}
                  label="Strona z listą produktów w sklepie"
                  error={!!errors.entryDataUrl?.message}
                  hint={errors.entryDataUrl?.message?.toString()}
                />
              </FormRow>

              <FormRow>
                <Input
                  fit
                  required
                  {...register("title")}
                  label="Tytuł strony"
                  error={!!errors.title?.message}
                  hint={errors.title?.message?.toString()}
                />
              </FormRow>
              <FormRow>
                <Input
                  fit
                  required
                  {...register("productName")}
                  label="Nazwa produktu"
                  error={!!errors.productName?.message}
                  hint={errors.productName?.message?.toString()}
                />
              </FormRow>
              <FormRow>
                <Input
                  fit
                  required
                  {...register("slug")}
                  label="Slug"
                  error={!!errors.slug?.message}
                  hint={errors.slug?.message?.toString()}
                />
              </FormRow>
              {/*<FormRow>*/}
              {/*  <Input*/}
              {/*    fit*/}
              {/*    required*/}
              {/*    {...register("parentPage", {*/}
              {/*      valueAsNumber: true,*/}
              {/*    })}*/}
              {/*    label="Strona rodzica"*/}
              {/*    error={!!errors.parentPage?.message}*/}
              {/*    hint={errors.parentPage?.message?.toString()}*/}
              {/*  />*/}
              {/*</FormRow>*/}
              <FormRow>
                <Select
                  fit
                  required
                  {...register("productCategory", { valueAsNumber: true })}
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category.id.toString(),
                  }))}
                  error={!!errors.productCategory?.message}
                  hint={errors.productCategory?.message?.toString()}
                  label="Kategoria"
                />
              </FormRow>

              <div className="create-ranking-form__actions">
                <Button type="submit">Utwórz</Button>
                {isLoading && <div>Loading...</div>}
              </div>

              {isError && <div>Ops, nie udało się utworzyć strony.</div>}
              {isSuccess && <div>{isSuccess}</div>}
            </form>
          </Container>
        </Card>
      )}
    </>
  );
};
