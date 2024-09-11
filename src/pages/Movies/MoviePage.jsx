import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovieGenreQuery } from "../../Hook/useMovieGenre";
import { useSearchMovieQuery } from "../../Hook/useSearchMovie";
import { Alert, Col, Container, Row, Spinner, Dropdown, DropdownButton } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./movies.style.css";

const MoviePage = () => {
  const sortType = {
    popAsc: '인기도(올림차순)',
    popDesc: '인기도(내림차순)',
    voteAsc: '평점(올림차순)',
    voteDesc: '평점(내림차순)',
  };

  const [query, setQuery] = useSearchParams();  // 쿼리 파라미터 사용
  const [page, setPage] = useState(0);  // 페이지는 0부터 시작
  const [selectedGenre, setSelectedGenre] = useState(null);  // 장르 ID
  const [selectedGenreName, setSelectedGenreName] = useState("장르 선택");  // 장르 이름 저장
  const [title, setTitle] = useState(sortType.popAsc);
  const [sortKey, setSortKey] = useState('popDesc');
  const [modData, setModData] = useState([]);

  const keyword = query.get("q");
  const genreId = query.get('genre'); // 장르 가져오기

  // 검색 쿼리 실행
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page: page + 1,  // 페이지는 1부터 시작하도록 설정
    genreId: selectedGenre,  // 장르 필터링 추가
  });

  const { data: genreData, isLoading: isGenreLoading, isError: isGenreError } = useMovieGenreQuery();

  // 데이터 변경 시 필터링 적용
  useEffect(() => {
    if (data?.results) {
      applySortAndGenre(data.results);
    }
  }, [data, sortKey, selectedGenre]);

  // keyword나 genre가 변경될 때 page를 1로 설정하는 useEffect 
  useEffect(() => {
    setPage(0);  // 키워드 또는 장르 변경 시 페이지를 0으로 리셋
  }, [keyword, genreId]);

  const applySortAndGenre = (movies) => {
    let filteredMovies = movies;
    if (selectedGenre) {
      filteredMovies = movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)));
    }

    switch (sortKey) {
      case 'popAsc':
        setModData([...filteredMovies].sort((a, b) => a.popularity - b.popularity));
        break;
      case 'popDesc':
        setModData([...filteredMovies].sort((a, b) => b.popularity - a.popularity));
        break;
      case 'voteAsc':
          setModData([...filteredMovies].sort((a, b) => a.vote_average - b.vote_average));
          break;
      case 'voteDesc':
        setModData([...filteredMovies].sort((a, b) => b.vote_average - a.vote_average));
        break;
      default:
        setModData(filteredMovies);
    }
  };

  // 페이지네이션 핸들러
  const handlePageClick = ({ selected }) => {
    setPage(selected);  // 선택된 페이지를 설정
  };

  // 장르 선택
  const sortByGenre = (genreId, genreName) => {
    setSelectedGenre(genreId);
    setSelectedGenreName(genreName || '장르 선택');  // 장르 이름을 설정
    setQuery({ genre: genreId || '' });
    setPage(0); // 장르가 변경될 때 페이지를 0으로 초기화
  };

  // 정렬 드롭다운 핸들러
  const handleSelect = (e) => {
    setSortKey(e);   // 선택된 정렬 기준 설정
    setTitle(sortType[e]);  // 드롭다운 타이틀 업데이트
    setPage(0);  // 정렬이 변경될 때 페이지 번호를 0으로 리셋
  };
  // 페이지네이션을 위한 최대 페이지 수 설정
  const maxPages = 12;
  const totalPages = Math.min(data?.total_pages || 0, maxPages);  // totalPages를 먼저 계산

  if (isLoading || isGenreLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError || isGenreError) {
    return <Alert variant="danger">{error?.message || '데이터를 가져오는 동안 문제가 발생하였습니다.'}</Alert>;
  }

  return (
    <Container>
      <Row id="movies-area">
        {/* 장르 드롭다운 */}
        <Row>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedGenreName}  // 드롭다운 버튼의 타이틀을 선택된 장르 이름으로 설정
            onSelect={(eventKey) => {
              const selectedGenreItem = genreData?.find(genre => genre.id === parseInt(eventKey));
              sortByGenre(selectedGenreItem?.id, selectedGenreItem?.name);
            }}
          >
            <Dropdown.Item eventKey={null}>All</Dropdown.Item>
            {genreData?.map(genre => (
              <Dropdown.Item key={genre.id} eventKey={genre.id}>
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Row>

        {/* 정렬 드롭다운 */}
        <Row className="text-end">
          <DropdownButton
            id={`dropdown-button`}
            title={`${title}`}
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey="popAsc">{sortType.popAsc}</Dropdown.Item>
            <Dropdown.Item eventKey="popDesc">{sortType.popDesc}</Dropdown.Item>
            <Dropdown.Item eventKey="voteAsc">{sortType.voteAsc}</Dropdown.Item>
            <Dropdown.Item eventKey="voteDesc">{sortType.voteDesc}</Dropdown.Item>
          </DropdownButton>
        </Row>

        {/* 영화 리스트 */}
        <Row className="movies-container">
          {modData?.length === 0 ? (
            <Col>
              <Alert variant="danger" className="movie-no-data">
                검색 결과가 없습니다.
              </Alert>
            </Col>
          ) : (
            <Row>
              {modData?.map((movie, index) => (
                <Col key={index} className="movies-list">
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )}
        </Row>

        {/* 페이지네이션 */}
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}  // totalPages가 올바르게 정의된 후 사용
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
          forcePage={page}
        />
      </Row>
    </Container>
  );
};

export default MoviePage;
