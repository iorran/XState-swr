import useSWR from "swr" 

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Response<T> = {
    data: T,
    isLoading: boolean,
    isError: boolean
}

export function useNomination<T>(id?: number): Response<T> { 
    const url = id ? `/api/nominations/${id}` : '/api/nominations';

    const { data, error } = useSWR(url, fetcher) 
    
    return {
        data: data?.nominations || data?.nomination,
        isLoading: !error && !data,
        isError: error
    }
}