import React, { useEffect, useContext, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from '../utils/Axios-config'
import FilmContext from '../context/FilmContext'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardTitle, MDBCardText} from "mdbreact";
import Avatar from "../assets/images/avatar.png"

const FullCastCrew = () => {
    const params = useParams()
    const [load, setLoad] = useState(false)
    const context = useContext(FilmContext)

    useEffect(() => {
        axios.get(`/movie/${params.id}/credits`)
            .then(response => {
                context.setCast(response.data)
                setLoad(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <MDBContainer>
            <MDBRow>
                    {load && context.movieCast.cast.map(cast => {
                        return (
                            <MDBCol size="6" sm="4" md="3" lg="2" key={cast.id}>
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
                    })}
            </MDBRow>
        </MDBContainer>
    )
}

export default FullCastCrew
