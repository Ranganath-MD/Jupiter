
import React, { useEffect, useContext, useState } from 'react'
import axios from '../utils/Axios-config'
import FilmContext from '../context/FilmContext'
import TVContext from "../context/TVShowContext"
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdbreact'
import "../styles/MovieShow.css"
import { useParams, Link, Redirect } from "react-router-dom"
import CircularProgressBar from "../utils/CircularProgressBar"
import CastCard from "./CastCard"
import TVShowDetails from "./TVShowDetails"
import TrailerModal from "../utils/TrailerModal"
import Seo from '../layouts/Seo'

const TVShowComponent = () => {

    const [openModal, setOpenModal] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [suggestedTVShowId, SetSuggestedTVShowId] = useState(0)
    const tvcontext = useContext(TVContext)
    const context = useContext(FilmContext)
    const params = useParams()
    const tvshow = tvcontext.selectedTVShow
    const Background = `https://image.tmdb.org/t/p/original/${tvshow.backdrop_path}`

    const getTVShowDetails = () => {
        axios.get(`/tv/${params.id}`, {
            params: {
                append_to_response: "videos,images,credits"
            }
        })
            .then(response => {
                tvcontext.setSelectedTVShow(response.data)
                tvcontext.setLoading(true)
                context.setHomeImage(response.data.backdrop_path)
                tvcontext.setSelectedShowVideos(response.data.videos.results)
                tvcontext.setSelectedShowImages(response.data.images.backdrops)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const tvShowSuggestion = () => {
        axios.get(`/tv/${params.id}/recommendations`)
            .then(response => {
                tvcontext.setRecommendations(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getTVShowDetails()
        tvShowSuggestion()

    }, [params.id])

    const toggle = () => {
        setOpenModal(!openModal)
    }

    const handleTVShowDetails = (movie) => {
        SetSuggestedTVShowId(movie.id)
        setRedirect(true)
        window.scrollTo(0, 0)
    }

    return (
        <div className="movie-container">
            <Seo
                title={tvshow.name}
                description={tvshow.overview}
            />
            <TrailerModal
                trailer={tvcontext.loading && tvcontext.selectedShowVideos!== undefined ? tvcontext.selectedShowVideos.find(video => video.type === "Trailer") : null}
                openModal={openModal}
                toggle={toggle}
            />
            {
                redirect && <Redirect to={`/discover/tv-shows/${suggestedTVShowId}`} />
            }

            <div
                style={{
                    backgroundImage: `url(${Background})`,
                    backgroundSize: "cover",
                    backgroundColor: "#131111",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                    backgroundBlendMode: "overlay"
                }}
            >
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="12" sm="4" md="4" lg="4">
                            <div>
                                {tvcontext.loading ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${tvshow.poster_path}`}
                                        alt="poster"
                                        className="poster-img"
                                    /> : <div className="poster-img-ph"></div>}
                            </div>
                        </MDBCol>
                        <MDBCol size="12" sm="8" md="8" lg="8" className="details-container">
                            <div className="title-container">
                                {tvcontext.loading ? <h2 className="title">{tvshow.name}</h2> : <div className="title-ph"></div>}
                                {tvcontext.loading ? <h2 className="year">{`(${new Date(tvshow.first_air_date).getFullYear()})`}</h2> : <div className="year-ph" ></div>}
                            </div>
                            <div className="btns">
                                <CircularProgressBar
                                    value={tvcontext.loading ? tvshow.vote_average : 0}
                                />
                                <h2 className="rating-text">User rating</h2>

                                <button className="trailer-btn" onClick={toggle}>
                                    <MDBIcon
                                        icon="play"
                                        className="mr-2"
                                    ></MDBIcon><span>Play trailer</span>
                                </button>
                            </div>
                            <div>
                                <p className="overview-title">Overview</p>
                                {tvcontext.loading ? <p className="overview">{tvshow.overview}</p> :
                                    <div>
                                        <div className="overview-ph"></div>
                                        <div className="overview-ph"></div>
                                        <div className="overview-ph"></div>
                                    </div>
                                }
                                {tvshow.homepage !== "" &&
                                    <div>
                                        <MDBIcon icon="link" size="lg" className="cyan-text pr-3" />
                                        <a target="_blank" href={tvshow.homepage} rel="noopener noreferrer">{tvshow.homepage}  </a>
                                    </div>
                                }
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <div>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="12" sm="8" md="8" lg="8">
                            <div>
                                <h2 className="cast-title">Top Billed Cast</h2>
                                <div className="hr-line"></div>
                                <CastCard loading={tvcontext.loading} movie={tvshow} />
                                <p className="cast-btn">
                                    <Link
                                        to={`/discover/tv/${params.id}/cast-crew`}
                                    >Full Cast & Crew</Link>
                                </p>
                            </div>
                            {
                                tvcontext.loading && tvcontext.selectedShowImages.length !== 0 ?
                                    <div>
                                        <h2 className="cast-title">Images</h2>
                                        <div className="hr-line"></div>
                                        <section className="hr-card">
                                            {
                                                tvcontext.loading && tvcontext.selectedShowImages.map((show, i) => {
                                                    return (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original/${show.file_path}`}
                                                            alt="poster"
                                                            key={i}
                                                            className="backdrop-img"
                                                        />
                                                    )
                                                })
                                            }
                                        </section>
                                    </div> : null
                            }

                        </MDBCol>
                        <MDBCol size="12" sm="4" md="4" lg="4">
                            <TVShowDetails tvshow={tvshow} loading={tvcontext.loading} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        {tvcontext.loading && tvcontext.recommendations.length === 0 ? null :
                            <MDBCol>
                                <div>
                                    <h2 className="cast-title">Recommendations</h2>
                                    <div className="hr-line"></div>

                                    <section className="hr-card">
                                        {
                                            tvcontext.loading && tvcontext.recommendations.map((show, i) => {
                                                return (
                                                    <div className="profile-pic" key={i}>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                                                            alt="poster"
                                                            key={i}
                                                            className="poster-rec-img"
                                                            />
                                                        <div className="edit">
                                                            <div>
                                                                <h2 className="txt">{show.name}</h2>
                                                                <MDBBtn
                                                                    outline
                                                                    size="sm"
                                                                    onClick={() => handleTVShowDetails(show)}
                                                                    className="suggest-btn"
                                                                    color="secondary"
                                                                    >Show Detail</MDBBtn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </section>
                                </div>
                            </MDBCol>
                        }
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    )
}

export default TVShowComponent
