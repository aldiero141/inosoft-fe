import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { InspectionInterface } from "@/lib/types/inspection";
import { ApiResponseInterface } from "@/lib/types/api";

type useProductAssortmentListProps = {
  params?: {
    status?: string;
    search?: string;
  };
  enabled?: boolean;
};

const useInspectionList = (props?: useProductAssortmentListProps) => {
  const getInspectionListFn = async () => {
    try {
      const response = await api.get<
        ApiResponseInterface<InspectionInterface[]>
      >(`/inspection`, {
        params: {
          status: props?.params?.status || "",
          search: props?.params?.search || "",
        },
      });

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
