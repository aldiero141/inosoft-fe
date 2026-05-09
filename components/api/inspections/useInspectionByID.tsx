import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { InspectionInterface } from "@/lib/types/inspection";
import { ApiResponseInterface } from "@/lib/types/api";

type useInspectionByIDProps = {
  params?: {
    id: string;
  };
  enabled?: boolean;
};

const useInspectionByID = (props?: useInspectionByIDProps) => {
  const getInspectionByIDFn = async () => {
    try {
      const response = await api.get<
        ApiResponseInterface<InspectionInterface[]>
      >(`/inspection/${props?.params?.id}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("error fetch inspection list");
    }
  };

  const query = useQuery({
    queryKey: ["inspection-list-by-id", props?.params],
    queryFn: getInspectionByIDFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useInspectionByID;
