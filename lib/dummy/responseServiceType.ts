
export interface ServiceTypeInterface {
    id_service_type:string;
    service_type_name:string;
    service_type_description:string;
}

export const responseServiceType:ServiceTypeInterface[] = [
    {
        id_service_type:"SERVICE-001",
        service_type_name:"Mill Inspection",
        service_type_description:"lorem ipsum dolor",
    },
    {
        id_service_type:"SERVICE-002",
        service_type_name:"Thread Inspection",
        service_type_description:"lorem ipsum dolor",
    },
    {
        id_service_type:"SERVICE-003",
        service_type_name:"UT Inspection",
        service_type_description:"lorem ipsum dolor",
    },
]