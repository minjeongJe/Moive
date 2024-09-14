import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import './Reviews.style.css'
import {Col, Row} from "react-bootstrap";

const Review = ({item}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const limit = 400;
    const toggleExpand = ()=> {
        setIsExpanded(!isExpanded)
    }

    const removeTags = (string)=> {
        return string.replace(/<\/?[^>]+(>|$)/g, " ");
    }
    const content = removeTags(item.content);
    const wrightDate = item.created_at.split('T')[0];

    return (
        <div style={{
            border: 'solid 3px darkred',
            borderRadius: '0.5rem',
            padding: '0.7rem',
            marginBottom: '0.5rem'
        }}><Row>
            <Col xs={6}>
            <h5>{item.author}</h5>
            </Col>
            <Col className={'d-flex justify-content-end align-items-end'}>
                <h6>{wrightDate}</h6>
            </Col>
        </Row>
            <div style={{fontSize: '0.9rem'}}>
                <span>{isExpanded ? content
                        : content.length > limit
                            ? `${content.slice(0, limit)}.....`
                            : content}</span>
            </div>
            {content.length > limit && (
                <Button size={"sm"} variant={'danger'} style={{
                    marginTop: '0.5rem',
                    backgroundColor: 'black',
                    border: '0'
                }} onClick={toggleExpand}>{isExpanded ? '접기' : '더보기'}</Button>
            )}
        </div>
    )
};

export default Review;