import React, { useState, useEffect } from 'react';
import { useSearchQuery } from '../../Hook/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Alert, Col, Container, Row, Spinner, Dropdown } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../Hook/useMovieGenre';
import './movies.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(""); 
  const keyword = query.get("q");


  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchQuery({
    keyword,
    page,
    genreId: selectedGenre, 
  });

  const { data: genres, isLoading: isGenresLoading } = useMovieGenreQuery();

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId); 
    setPage(1); 
    setQuery({});  
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const getGenreName = (id) => {
    const genre = genres?.find(g => g.id === id);
    return genre ? genre.name : "장르 선택";
  };

  if (isLoading || isGenresLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message || '데이터를 가져오는 동안 문제가 발생하였습니다.'}</Alert>;
  }

  const noMovies = data?.results?.length === 0;

  return (
    <Container>
      <Row>
        {/* 장르 드랍다운 */}
        <div>
          <Dropdown className='genre-dropBtn'>
            <Dropdown.Toggle id="dropdown-basic-button" variant="danger">
              {getGenreName(selectedGenre)}
          </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-scrollable dropdown-menu-custom-width">
              {genres?.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                  
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* 영화 리스트 */}
        <Col>
          <Row>
            {noMovies ? (
              <Col>
                <Alert variant="warning">
                  검색 결과가 없습니다.
                </Alert>
              </Col>
            ) : (
              data?.results.map((movie, index) => (
                <Col key={index}>
                  <MovieCard movie={movie} className="movie-item" />
                </Col>
              ))
            )}
          </Row>

          {/* 페이지네이션 */}
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages} //전체 페이지가 몇개인지
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1} // 0부터 세서 -1 넣어줘야함.
            />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;

