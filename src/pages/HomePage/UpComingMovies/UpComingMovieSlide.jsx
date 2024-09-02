import React from 'react';
import { useUpComingMoviesQuery } from '../../../Hook/useUpComingMovies';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../components/MovieCard/MovieCard';

const TopMovieSlide = () => {
    const responsive = {
      largeDesktop: {
        breakpoint: { max: 3000, min: 1700 },
        items: 6,
      },

      desktop: {
      breakpoint: { max: 1700, min: 1250 },
      items: 5,
      },

      tablet: {
        breakpoint: { max: 1250, min: 1024 },
        items: 4, 
      },

      largeMobile: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,  
      },

      mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        
      }
    }

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
    //영화 제목을 보여줌. 
    <div className='Movies-area'>
      <h3 className='Movies-title'>Top Movies</h3>
      <Carousel
      infinite={true}
      centerMode={true}
      containerClass='carousel-container' //container에 관한 스타일
      responsive={responsive} //중요함. 몇개의 아이템을 보여줄지.
    >
      {data.results.map ((movie,index) => <MovieCard movie={movie} key={index}/>)}
    </Carousel>;
        </div>
      )
    }

export default TopMovieSlide
