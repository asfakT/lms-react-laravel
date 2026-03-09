import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from "react-player";

const FreePreview = ({ show, handleClose, freeLesson }) => {
    return (
        <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{freeLesson.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: 0 }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <video
                        src={freeLesson.video_url}
                        controls
                        controlsList="nodownload"
                        onContextMenu={(e) => e.preventDefault()}
                        style={{
                            padding: "20px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FreePreview