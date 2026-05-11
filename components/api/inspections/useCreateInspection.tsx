/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "@/lib/api";
import type { ApiResponseInterface } from "@/lib/types/api";
import type { ServiceFormValues } from "@/providers/inspection/draft-inspection-provider";

type PayloadCreateProductAssortment = {
  body: ServiceFormValues;
};

const useCreateInspection = (
  props?: UseMutationOptions<
    any,
    Error,
    PayloadCreateProductAssortment,
    unknown
  >,
) => {
  const createInspectionFn = async (
    payload: PayloadCreateProductAssortment,
  ) => {
    try {
      const response = await api.post<ApiResponseInterface<any>>(
        "/inspection/create",
        payload.body,
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      const e = error as AxiosError<ApiResponseInterface<null>>;
      throw new Error(
        e?.response?.data?.message ?? "error post create inspection",
      );
    }
  };

  return useMutation({
    mutationFn: createInspectionFn,
    mutationKey: ["create-inspection"],
    ...props,
  });
};

export default useCreateInspection;
