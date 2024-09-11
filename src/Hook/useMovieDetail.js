// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const fetchMovieDetail = (id) => {
//     return api.get(`/movie/${movie.id}`)
// }

// export const useMovieDetailQuery = () => {
//     return useQuery({
//         queryKey: ['movie-detail',id],
//         queryFn: fetchMovieDetail,
//         select: (result) => result.data,
//         staleTime: 300000, //5분
//     });
// };

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (id) => {
    return api.get(`/movie/${id}`); 
};

export const useMovieDetailQuery = (id) => {
    return useQuery({
        queryKey: ['movie-detail', id],
        queryFn: () => fetchMovieDetail(id),
        select: (result) => result.data,
        staleTime: 300000, // 5분
    });
};
