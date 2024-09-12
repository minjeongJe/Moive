import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieTrailer = ({ id }) => {
    return api.get(`/movie/${id}/videos`);
}

export const useMovieTrailerQuery = (movieId) => {
    return useQuery({
        queryKey: ["movie-trailer", { movieId }],
        queryFn: () => fetchMovieTrailer({ id: movieId }),
        select: (result) => result.data, 
        enabled: !!movieId,
    });
}
