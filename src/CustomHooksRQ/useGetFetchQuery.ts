import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useGetFetchQuery = (queryKey: QueryKey): any => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(queryKey);
};