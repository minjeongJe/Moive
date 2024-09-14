import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import TrailerVideoModal from './components/TrailerVideoModal'
import { Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; 
import { useMovieDetailQuery } from '../../Hook/useMovieDetail'
import './MovieDetail.style.css';
import MovieReview from './components/Reviews/MovieReview';
import RecommendMovie from '../../pages/MovieDetail/RecommendMovie/RecommendMovie'

const MovieInfo = () => {
    const [userSelect, setUserSelect] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const { id } = useParams(); 
    const { data: movieData, isLoading, isError, error } = useMovieDetailQuery(id); 

    const clickReview=()=>{
        setUserSelect(true)
    }

    const clickRecommend=()=>{
        setUserSelect(false)
    }

    useEffect(()=>{
        setUserSelect(true)
    },[id])

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
          {movieData?.poster_path ? (
              <img
                  src={`https://www.themoviedb.org/t/p/w1280${movieData?.poster_path}`}
                  alt="movie-poster"
                  className="movie-poster"
              />
          ) : (
              <img
                  src="https://yourmobilevet.co.uk/images/listings/no-image.jpg"
                  alt="no-img"
                  className="movie-poster"
              />
          )}

          <div className='Movie-items'>
              <h1 className='movie-tittle'>{movieData.title}</h1>
              <div className='Movie-data'>개봉일 {movieData.release_date}</div>
              {movieData.genres?.map((genre) => (
                  <span key={genre.id} className="badge rounded-pill text-bg-secondary movie-genre">
                      {genre.name}
                  </span>
              ))}
              <div>평점 {movieData.vote_average}</div>
              <div>인기 {movieData.popularity}</div>
              <div className='movie-overview'>{movieData.overview}</div>
          
              <Button
                  className={'play-btn'}
                  variant={'danger'}
                  onClick={() => setModalShow(true)}
              >
                  예고편 재생 
                  <FontAwesomeIcon icon={faPlay} style={{ marginLeft: '8px' }} />
              </Button>

              <TrailerVideoModal show={modalShow} onHide={() => setModalShow(false)} movieId={id} />
            
            <Row style={{
                        marginTop: '0.5rem'
                    }}>
                        <Col className={'d-flex justify-content-center'}>
                            <Button style={{
                                width:'100%'
                            }} variant={`${userSelect?'light':'danger'}`}
                            onClick={clickReview}>리뷰보기</Button>
                        </Col>
                        <Col className={'d-flex justify-content-center'}>
                            <Button style={{
                                width:'100%'
                            }} variant={`${!userSelect?'light':'danger'}`}
                            onClick={clickRecommend}>관련영화보기</Button>
                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: '0.5rem',
                        borderBottom: 'solid 1px white',
                        paddingBottom: '0.5rem'
                    }}>{
                       userSelect?<MovieReview id={id}/>:<RecommendMovie id={id}/>
                    }
                    </Row>
          </div>
      </Container>
    );
}

export default MovieInfo;

