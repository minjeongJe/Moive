import React, {useState} from 'react';
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import {useMovieReview} from "../../../../hooks/useMovieReview";
import { useMovieReviewsQuery } from "../../../../Hook/useMovieReviews"
// import Review from "./Review";
import Reviews from "./Reviews"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";


const MovieReview = (movie) => {

    const [countReview, setCountReview] = useState(3);
    const [btnState, setBtnState] = useState(false);
    const {data,isLoading,isError} = useMovieReviewsQuery(movie.id);

    const handleShowReview=()=>{
        if(btnState){
            setCountReview(3);
        }else {
            setCountReview(data?.results.length);
        }
        setBtnState(!btnState)
        if(btnState){
            window.scrollTo({
                top:0,
                behavior: 'smooth'
            })
        }
    }
    return (
        <Col style={{
            position: 'relative',
            marginBottom: '1rem'
        }}>
            {isError||data?.results.length===0
            ? <div className={'d-flex justify-content-center'}>
                    <h2 style={{
                        marginTop: '1rem'
                    }}>리뷰 정보가 없습니다.</h2>
                </div>
            : !isLoading
                ? data?.results.slice(0,countReview).map((item,index)=>(
                  <Reviews item={item} key={index}/>
            )):""}
            {!isLoading?
                data?.results.length <= 3?"":
            <Button onClick={handleShowReview} style={{
                position: 'absolute',
                bottom:'-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '100%'
            }} variant={'danger'}>
                {btnState?<FontAwesomeIcon icon={faCaretUp} />:<FontAwesomeIcon icon={faCaretDown} />}
            </Button>:""
            }
        </Col>
    );
};

export default MovieReview;