import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { InspectionInterface } from "@/lib/types/inspection";
import { ApiResponseInterface } from "@/lib/types/api";

type useProductAssortmentListProps = {
  params?: {
    page?: number;
    limit?: number;
    keyword?: string;
    offset?: number;
    ids?: string[];
    sort_field?: string;
    sort_direction?: string;
    show_in_ework_visit?: boolean;
    branch_ids?: string;
    product_variant_ids?: string;
    customer_id?: string;
    company_id?: string;
  };
  enabled?: boolean;
};

const useInspectionList = (props?: useProductAssortmentListProps) => {
  const getInspectionListFn = async () => {
    try {
      const response =
        await api.get<ApiResponseInterface<InspectionInterface[]>>(
          `/inspection`,
        );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("error fetch inspection list");
    }
  };

  const query = useQuery({
    queryKey: ["inspection-list", props?.params],
    queryFn: getInspectionListFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useInspectionList;
