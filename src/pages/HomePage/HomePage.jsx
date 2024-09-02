import React from 'react'
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './TopRatedMovieSlide/TopRatedMovieSlide';
import UpComingMovieSlide from './UpComingMovies/UpComingMovieSlide';

// 1. 배너 => popular 영화를 들고와서 첫번째 아이템을 보여주기
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpComingMovieSlide />
    </div>
  )
}

export default HomePage
