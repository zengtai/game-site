import useSWR from "swr";
import { API_URL } from "../lib/constants";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCurrentData() {
  const { data, error } = useSWR(API_URL, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
