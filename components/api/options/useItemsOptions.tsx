import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ApiResponseInterface } from "@/lib/types/api";
import { ItemInterface } from "@/lib/dummy/responseItems";

type useItemsOptionsProps = {
  enabled?: boolean;
};

const useItemsOptions = (props?: useItemsOptionsProps) => {
  const getItemsOptionsFn = async () => {
    try {
      const response =
        await api.get<ApiResponseInterface<ItemInterface[]>>(`/options/items`);

      return response.data.data as ItemInterface[];
    } catch (error) {
      console.error(error);
      throw new Error("error fetch item options");
    }
  };

  const query = useQuery({
    queryKey: ["items-options"],
    queryFn: getItemsOptionsFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useItemsOptions;
