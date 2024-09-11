import React, { useState } from 'react';
import { useMovieDetailQuery } from '../../Hook/useMovieDetail';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams
import './MovieDetail.style.css';

const MovieDetailPage = ({movies}) => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams(); // Get the movie ID from the URL
  const { data, isLoading, isError, error } = useMovieDetailQuery(id); // Pass the ID to the query
  console.log ("ddd",data)
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

  return ( 
     
        <Container className='movie-detail-area'>
          {openModal && (
           <previewModal movieId={data.id} setOpenModal={setOpenModal} />
          )}
          {/* 영화 포스터 */}
          {data?.poster_path ? (
            <>
              <img
                src={`https://www.themoviedb.org/t/p/w1280${data?.poster_path}`}
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
           <h1>{data.title}</h1>
           <div>{data.release_date}</div>
           {data.genres?.map((genre) => (
            <span key={genre.id} className="badge rounded-pill text-bg-secondary">
              {genre.name}
            </span>
           ))}
           <div>평점{data.vote_average}</div>
           <div>인기{data.popularity}</div>
           <div>{data.overview}</div>
           <button>예고편</button>
           <button>review</button>
          </div>
        </Container>
  );
};

export default MovieDetailPage;
