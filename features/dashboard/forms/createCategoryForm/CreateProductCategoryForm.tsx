import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Container } from "@/components/container/Container";
import { Button } from "@/features/dashboard/components/button/Button";
import { Card } from "@/features/dashboard/components/card/Card";
import { FormRow } from "@/features/dashboard/forms/formRow/FormRow";
import { Input } from "@/features/dashboard/forms/input/Input";
import { useDashboardApiClient } from "@/features/dashboard/hooks/useDashboardApi";
import { createProductCategory } from "@/services/dashboard";
import { VALIDATORS } from "@/utils/valiadtors";

import "./createProductCategoryForm.style.scss";

const createProductCategoryFormSchema = z.object({
  name: VALIDATORS.required("Pole jest wymagane"),
});

type CreateProductCategoryFormData = z.infer<typeof createProductCategoryFormSchema>;

export const CreateproductCategoryForm = () => {
  const { apiClient } = useDashboardApiClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductCategoryFormData>({
    resolver: zodResolver(createProductCategoryFormSchema),
  });

  const onSubmit = async (data: CreateProductCategoryFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess("");
      setIsError(false);
      const id = await createProductCategory(apiClient)(data.name);

      setIsSuccess(`Kategoria ${data.name} o ID: ${id} została pomyślnie utworzona.`);

      reset();
    } catch (error) {
      console.log({ error });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="create-product-category-form__actions">
              <Button type="submit">Utwórz</Button>
              {isLoading && <div>Loading...</div>}
            </div>
          </FormRow>

          {isError && <div>Ops, nie udało się utworzyć kategorii.</div>}
          {isSuccess && <div>{isSuccess}</div>}
        </form>
      </Container>
    </Card>
  );
};
