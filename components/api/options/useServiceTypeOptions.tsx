import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ApiResponseInterface } from "@/lib/types/api";
import { ServiceTypeInterface } from "@/lib/dummy/responseServiceType";

type useServiceTypeOptionsProps = {
  enabled?: boolean;
};

const useServiceTypeOptions = (props?: useServiceTypeOptionsProps) => {
  const getServiceTypeOptionsFn = async () => {
    try {
      const response = await api.get<
        ApiResponseInterface<ServiceTypeInterface[]>
      >(`/options/service-type`);

      return response.data.data as ServiceTypeInterface[];
    } catch (error) {
      console.error(error);
      throw new Error("error fetch service type options");
    }
  };

  const query = useQuery({
    queryKey: ["service-type-options"],
    queryFn: getServiceTypeOptionsFn,
    enabled: props?.enabled || false,
  });

  return { ...query };
};
export default useServiceTypeOptions;
