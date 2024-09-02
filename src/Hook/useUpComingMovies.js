import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcoming = () => {
  return api.get(`/movie/upcoming`)
}

export const useUpComingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upComing"],
    queryFn: fetchUpcoming,
    select: (result) => result.data,
  })
} 