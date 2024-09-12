import React from 'react';
import { Modal, Button } from "react-bootstrap";
import YouTube from "react-youtube";
import { useMovieTrailerQuery } from '../../../Hook/useMovieTrailer';
import './TrailerVideoModal.style.css';

const TrailerVideoModal = ({ movieId, ...props }) => {
    const { data } = useMovieTrailerQuery(movieId);
    const trailerKey = data?.results?.[0]?.key; // Safely access the first trailer's key

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton />
            <Modal.Body className="d-flex justify-content-center">
                <div className="youtube-video-container">
                    {trailerKey ? (
                        <YouTube videoId={trailerKey} />
                    ) : (
                        <div className='no-trailer'>No Trailer Available</div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TrailerVideoModal;
