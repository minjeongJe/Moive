import React, {useEffect, useState} from 'react';
import {Col} from "react-bootstrap";
import { useRecommendationsQuery } from '../../../Hook/useRecommendations'
import MovieCard from "../../../common/MovieCard/MovieCard";

const Recommend = (movie) => {

    const [sliceData, setSliceData] = useState([]);
    const {data, isLoading} = useRecommendationsQuery(movie.id);

    useEffect(()=>{
        if(data?.results){
            setSliceData(data.results.slice(0,6))
        }
    },[data])
    return (
        <>
            {!isLoading?sliceData.length !== 0
                ?sliceData.map((item, index)=>(
                <Col key={index} xs={4} style={{
                    marginTop: '0.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <MovieCard movie={item} pageType={'detail'}></MovieCard>
                </Col>
            ))
            : <div className={'d-flex justify-content-center'}>
                    <h2 style={{
                        marginTop: '1rem',
                        marginBottom: '1.5rem'
                    }}>관련영화 정보가 없습니다.</h2>
                </div>:""}
        </>

    );
};

export default Recommend;