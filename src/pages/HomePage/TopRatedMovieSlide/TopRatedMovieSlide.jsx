import React from 'react'
import { useTopRatedMoviesQuery } from '../../../Hook/useTopRatedMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../constants/responsive';
import MovieSlider from '../../../common/MovieSlider/MovieSlider';

const TopMovieSlide = () => {
  const {data, isLoading,isError, error} = useTopRatedMoviesQuery()

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
