import React from 'react'
import './MovieSlider.style.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard.jsx';

const MovieSlider = ({title, movies, responsive}) => {
  return (
    <div className='Movies-area'>
      <h3 className='Movies-title'>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        containerClass='carousel-container' //container에 관한 스타일
        responsive={responsive} //중요함. 몇개의 아이템을 보여줄지.
      >
        {movies.map ((movie,index) => <MovieCard movie={movie} key={index} />)}
      </Carousel>
    </div>
  )
}

export default MovieSlider