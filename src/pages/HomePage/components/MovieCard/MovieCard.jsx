import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './MovieCard.style.css'

const MovieCard = ({ movie }) => {
  return (
    <div style={{backgroundImage: 
    "url("+
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`+
    ")",
    }}
    className='movie-card'
    >
      <div className='overlay'>
        <div>
          <h1>{movie.title}</h1>
          <div>{movie.genre_ids.map((id) => (
            <span className="badge rounded-pill text-bg-danger">{id}</span>
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
