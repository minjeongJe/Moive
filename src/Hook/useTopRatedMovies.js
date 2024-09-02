import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRated = () => {
  return api.get(`/movie/top_rated`)
}

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top-rated"],
    queryFn: fetchTopRated,
    select: (result) => result.data,
  })
} 