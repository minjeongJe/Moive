import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = async ({ keyword, page, genreId }) => {
  let url = '';

  if (keyword) {
    url = `/search/movie?query=${keyword}&page=${page}`;
  } else if (genreId) {
    url = `/discover/movie?with_genres=${genreId}&page=${page}`;
  } else {
    url = `/movie/popular?page=${page}`;
  }

  const response = await api.get(url);
  return response.data;
};

export const useSearchQuery = ({ keyword, page, genreId }) => {
  return useQuery({
    queryKey: ['movies', { keyword, page, genreId }],
    queryFn: () => fetchSearchMovie({ keyword, page, genreId }), 
    keepPreviousData: true,
  });
};
