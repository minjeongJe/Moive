import React from 'react';
import { useUpComingMoviesQuery } from '../../../Hook/useUpComingMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../constants/responsive';

const TopMovieSlide = () => {
  const {data, isLoading,isError, error} = useUpComingMoviesQuery()

  if(isLoading) {
         return (
            <div className="loading-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
  }

    if(isError) {
        return <Alert variant="danger">
          {error.message}
        </Alert>
    }
  return (
    <div>
      <MovieSlider 
        title = 'Popular Movies' 
        movies = {data.results} 
        responsive={responsive}
      />
        </div>
      )
    }

export default TopMovieSlide
