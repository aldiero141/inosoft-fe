import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ApiResponseInterface } from "@/lib/types/api";
import { RelationOptionInterface } from "@/lib/dummy/responseRelation";

type useRelationOptionsProps = {
  enabled?: boolean;
};

const useRelationOptions = (props?: useRelationOptionsProps) => {
  const getRelationOptionsFn = async () => {
    try {
      const response =
        await api.get<ApiResponseInterface<RelationOptionInterface[]>>(
          `/options/relation`,
        );

      return response.data.data as RelationOptionInterface[];
    } catch (error) {
      console.error(error);
      throw new Error("error fetch relation options");
    }
  };

  const query = useQuery({
    queryKey: ["relation-options"],
    queryFn: getRelationOptionsFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useRelationOptions;
