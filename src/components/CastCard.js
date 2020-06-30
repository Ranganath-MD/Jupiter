import React from 'react'
import { MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact'
import "../styles/MovieShow.css"
import Avatar from "../assets/images/avatar.png"

const CastCard = ({ loading, movie }) => {

    const getCast = () => {
        if (loading && movie.credits !== undefined) {
            if (movie.credits.cast !== undefined || movie.credits.cast !== 0) {
                return movie.credits.cast
            } else if (movie.credits.crew !== undefined || movie.credits.crew !== 0) {
                return movie.credits.crew
            } else {
                return null
            }
        } else {
            return null
        }
    }
    return (
        <MDBRow>
            {
                loading && getCast() !== null ? getCast().slice(0, 4).map(cast => {
                    return (
                        <MDBCol size="6" sm="4" md="3" lg="3" key={cast.id}>
                            <MDBCard className="cast-card">
                                <MDBCardImage
                                    onError={(e) => { e.target.onerror = null; e.target.src = Avatar }}
                                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                    className="cast-img"
                                />
                                <MDBCardTitle className="cast-name">{cast.name}</MDBCardTitle>
                                <MDBCardText className="cast-character">{cast.character}</MDBCardText>
                            </MDBCard>
                        </MDBCol>
                    )
                }) : null
            }
        </MDBRow>
    )
}

export default CastCard
