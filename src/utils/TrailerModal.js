import React from 'react'
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
const modalStyle = {
    modal: {
        height: 400,
        padding: 0
    },
    modalHeader: {
        padding: "10px 20px",
        borderBottom: "none",
        backgroundColor: "black",
    },
    title: {
        fontSize: 16,
        color: "white"
    },
    title1: {
        color: "red",
    }
}

const TrailerModal = ({ openModal, toggle, trailer }) => {
    const key = trailer === undefined || trailer === null ? "bz9dOy3Zd6s" : trailer.key
    const videoSrc = `https://www.youtube.com/embed/${key}`
    return (
        <MDBModal
            isOpen={openModal}
            toggle={toggle}
            centered
            backdrop={false}
            size="lg"
        >
            <MDBModalHeader toggle={toggle} style={modalStyle.modalHeader}>
                {
                    trailer === undefined || trailer === null ? <span style={modalStyle.title1}>There is no trailer found</span>:
                    <span style={modalStyle.title}>Play</span>
                }

            </MDBModalHeader>
            <MDBModalBody style={modalStyle.modal}>
                <iframe
                    width="100%"
                    height="100%"
                    title="trailer"
                    src={videoSrc}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
                </iframe>
          </MDBModalBody>
        </MDBModal>
    )
}

export default TrailerModal
