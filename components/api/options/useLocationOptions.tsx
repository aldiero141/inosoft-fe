import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ApiResponseInterface } from "@/lib/types/api";
import { LocationOptionInterface } from "@/lib/dummy/responseLocation";

type useLocationOptionsProps = {
  enabled?: boolean;
};

const useLocationOptions = (props?: useLocationOptionsProps) => {
  const getLocationOptionsFn = async () => {
    try {
      const response =
        await api.get<ApiResponseInterface<LocationOptionInterface[]>>(
          `/options/location`,
        );

      return response.data.data as LocationOptionInterface[];
    } catch (error) {
      console.error(error);
      throw new Error("error fetch location options");
    }
  };

  const query = useQuery({
    queryKey: ["location-options"],
    queryFn: getLocationOptionsFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useLocationOptions;
