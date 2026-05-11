import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ApiResponseInterface } from "@/lib/types/api";
import { SowOptionsInterface } from "@/lib/dummy/responseSowOptions";

type useSowOptionsProps = {
  enabled?: boolean;
};

const useSowOptions = (props?: useSowOptionsProps) => {
  const getSowOptionsFn = async () => {
    try {
      const response =
        await api.get<ApiResponseInterface<SowOptionsInterface[]>>(
          `/options/sow`,
        );

      return response.data.data as SowOptionsInterface[];
    } catch (error) {
      console.error(error);
      throw new Error("error fetch sow options");
    }
  };

  const query = useQuery({
    queryKey: ["sow-options"],
    queryFn: getSowOptionsFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useSowOptions;
