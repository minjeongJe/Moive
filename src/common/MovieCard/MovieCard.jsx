import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../Hook/useMovieGenre';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  // console.log("ggg", genreData);

  const showGenre = (genreIdList) => {
    if (!genreIdList) return [];
    
    // genreData가 로드되지 않았거나 빈 배열일 경우 처리
    if (!genreData || genreData.length === 0) {
      return ["Unknown"];
    }

    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : "Unknown"; // 장르가 없을 경우 "Unknown" 반환
    });

    return genreNameList;
  }

  //해당영화 포스터 클릭 시 영화 디테일페이지 이동.
  const navigate = useNavigate();
  const goToDetailPage = () => {
    navigate(`/movies/${movie.id}`)
  }

  return (
    <div style={{backgroundImage: 
    "url("+
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+
    ")",
    }}
    className='movie-card' onClick={goToDetailPage}
    >
      <div className='overlay'>
        <div>
          <h1>{movie.title}</h1>
          <div className='movie-genre'>
            {showGenre(movie.genre_ids).map((id) => (
            <div className="badge rounded-pill text-bg-danger">{id}</div>
          ))}
          </div>
        </div>
        <div>
          <div className="movie-info">
            <div className="movie-vote">
              ★ {Math.floor(movie.vote_average * 10) / 10}
            </div>
            <div className="movie-popularity">
              <FontAwesomeIcon icon={faUser} /> {Math.floor(movie.popularity)}
            </div>
            {movie.adult ? (
              <div className="movie-adult">18+</div>
            ) : (
              <div className="movie-child">All</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
