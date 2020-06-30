import React, { useState, useEffect, useContext } from 'react'
import "../styles/Toptrailers.css"
import axios from '../utils/Axios-config'
import FilmContext from "../context/FilmContext"
import backgroundImage from "../assets/images/thor.jpg"
import play from "../assets/images/play.png"
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

const TopRatedMovieTrailers = () => {
    const context = useContext(FilmContext)
    const [background, setBackgroud] = useState("")
    const [video, setVideo] = useState({})
    const [modal, setModal] = useState(false)
    const videoSrc = video === null ? `https://www.youtube.com/embed/bz9dOy3Zd6s` : `https://www.youtube.com/embed/${video.key}`

    useEffect(() => {
        axios.get("movie/top_rated")
            .then(response => {
                context.setLoading(true)
                context.setTopRatedMovies(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleTrailerModal = (id) => {
        setModal(true)
        axios.get(`/movie/${id}/videos`)
            .then(response => {
                if (response.data.results.length === 0) {
                    setVideo(null)
                } else {
                    const trailer = response.data.results.find(dt => dt.type === "Trailer")
                    if (trailer !== undefined) {
                        setVideo(trailer)
                    } else {
                        const teaser = response.data.results.find(dt => dt.type === "Teaser")
                        setVideo(teaser)
                    }
                }
            })
            .catch(() => {
                setVideo(null)
            })
    }

    const handleImage = (img) => {
        const url = `https://image.tmdb.org/t/p/original/${img}`
        setBackgroud(url)
    }
    return (
        <div
            className="trailer-container"
            style={{
                backgroundImage: `url(${background ? background : backgroundImage })`
            }}
        >
            <div style={{ background: "transparent"}}>
                <MDBModal
                    isOpen={modal}
                    toggle={() => setModal(!modal)}
                    centered
                    size="lg"
                    backdrop={false}
                >
                    <MDBModalHeader toggle={() => setModal(!modal)} className="modal_head">
                        {
                            video === null ? <span className="modal_title">There is no trailer found</span> :
                                <span className="modal_title">Play</span>
                        }
                    </MDBModalHeader>
                    <MDBModalBody className="modal_body">
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
            </div>
            <section className="hr_trailers_cards">
                {
                    context.loading && context.topRatedMovies.map((movie, i) => {
                        return (
                            <div
                                className="top_card"
                                key={i}
                                onClick={() => handleTrailerModal(movie.id)}
                                onMouseOver={() => handleImage(movie.backdrop_path)}
                            >
                                <div style={{ position: "relative" }} className="view overlay zoom">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                        alt="top rated movie trailers"
                                        key={i}
                                        className="backdrop"
                                        onError={(e) => { e.target.onerror = null; e.target.src = backgroundImage}}
                                    />
                                    <img src={play} aly="play-button" alt="play" className="play-btn"/>
                                </div>

                                <p className="p_movie_title">{movie.title}</p>
                                <p className="p_date">{movie.release_date}</p>
                            </div>

                        )
                    })
                }
            </section>
        </div>
    )
}

export default TopRatedMovieTrailers
