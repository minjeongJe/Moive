import React, { useState } from 'react';
import { useMovieDetailQuery } from '../../Hook/useMovieDetail';
import { Spinner, Alert, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import './MovieDetail.style.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import TrailerVideoModal from './components/TrailerVideoModal';

const MovieDetailPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams(); 
  const { data: movieData, isLoading, isError, error } = useMovieDetailQuery(id); // Pass the ID to the query
  console.log ("ddd",movieData)
  
  // const trailerKey = movieData?.results?.[0]?.key;

  
  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if ( movieData?.id) {
    console.log("DetailMovie Data>>>",  movieData);
  } else {
    console.log("Data not available yet.");
  }

  return (  
    <Container className='movie-detail-area'>
      {/* 예고편 */}
       

      {/* 영화 포스터 */}
       {movieData?.poster_path ? (
         <>
           <img
             src={`https://www.themoviedb.org/t/p/w1280${movieData?.poster_path}`}
             alt="movie-poster"
             className="movie-poster"
           />
         </>
       ) : (
       <img
          src="https://yourmobilevet.co.uk/images/listings/no-image.jpg"
          alt="no-img"
          className="movie-poster"
        />
       ) } 

      <div>
      {/* 영화 기타 정보 */}
       <h1>{movieData.title}</h1>
       <div>{movieData.release_date}</div>
       {movieData.genres?.map((genre) => (
        <span key={genre.id} className="badge rounded-pill text-bg-secondary">
          {genre.name}
        </span>
       ))}
       <div>평점{movieData.vote_average}</div>
       <div>인기{movieData.popularity}</div>
       <div>{movieData.overview}</div>
       
      {/* 예고편 버튼 */}
       <Button
          className={'play-btn'}
          variant={'danger'}
          onClick={() => setModalShow(true)}>
          예고편 재생 
          <FontAwesomeIcon icon={faPlay} style={{ marginLeft: '8px' }} />
       </Button>
  
      {/* 예고편 모달 */}
      <TrailerVideoModal show={modalShow} onHide={() => setModalShow(false)} movieId={id} />
  
      {/* 리뷰 버튼 */} 
       <button>review</button>
      </div>
    </Container>
  );
};

export default MovieDetailPage;
