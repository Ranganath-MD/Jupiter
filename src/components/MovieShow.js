import React, { useEffect, useContext, useState } from 'react'
import axios from '../utils/Axios-config'
import FilmContext from '../context/FilmContext'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdbreact'
import "../styles/MovieShow.css"
import {useParams, Link, Redirect} from "react-router-dom"
import CircularProgressBar from "../utils/CircularProgressBar"
// import MultiCarouselPage from "../utils/MultiItemCarousel"
import CastCard from "./CastCard"
import MovieDetails from "./MovieDetails"
import TrailerModal from "../utils/TrailerModal"
import avatar from "../assets/images/avatar1.png"
import Seo from '../layouts/Seo'

const MovieShow = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [suggestedMovieId, SetSuggestedMovieId] = useState(0)
    const context = useContext(FilmContext)
    const params = useParams()
    const movie = context.selectedMovie
    const Background = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`

    const getMovieDetails = () => {
        context.loading = false
        axios.get(`/movie/${params.id}`, {
            params: {
                append_to_response: "videos,images,credits"
            }
        })
        .then(response => {
                context.setSelectedMovie(response.data)
                context.setHomeImage(response.data.backdrop_path)
                context.setSelectedMovieVideos(response.data.videos.results)
                context.setSelectedMovieImages(response.data.images.backdrops)
                context.setLoading(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const movieSuggestions = () => {
        axios.get(`/movie/${params.id}/recommendations`)
            .then(response => {
                context.setRecommendations(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const movieReviews = () => {
        axios.get(`/movie/${params.id}/reviews`)
            .then(response => {
                context.setReviews(response.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        getMovieDetails()
        movieSuggestions()
        movieReviews()

    }, [params.id])

    const toggle = () => {
        setOpenModal(!openModal)
    }

    const handleSuggestMovies = (movie) => {
        SetSuggestedMovieId(movie.id)
        setRedirect(true)
        window.scrollTo(0, 0)
    }

    return (
        <div className="movie-container">
            <TrailerModal
                trailer={context.loading && context.selectedMovieVideos !== null ? context.selectedMovieVideos.length === 0 ? null : context.selectedMovieVideos.find(video => video.type === "Trailer") : null}
                openModal={openModal}
                toggle={toggle}
            />
            {
                redirect && <Redirect to={`/discover/movie/${suggestedMovieId}`} />
            }
            <Seo
                title={movie.title}
                description={movie.overview}
            />
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
                                {context.loading ?
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt="poster"
                                        className="poster-img"
                                    /> : <div className="poster-img-ph"></div>}
                            </div>
                        </MDBCol>
                        <MDBCol size="12" sm="8" md="8" lg="8" className="details-container">
                            <div className="title-container">
                                {context.loading ? <h2 className="title">{movie.title}</h2> : <div className="title-ph"></div>}
                                {context.loading ? <h2 className="year">{`(${new Date(movie.release_date).getFullYear()})`}</h2> : <div className="year-ph" ></div>}
                            </div>
                            <div>
                                <p className="tagline">{movie.tagline}</p>
                            </div>
                            <div className="btns">
                                <CircularProgressBar
                                    value={context.loading ? movie.vote_average : 0}
                                />
                                <h2 className="rating-text">User rating</h2>
                                {
                                    context.loading && context.selectedMovieVideos.length !== 0 ?
                                        <button className="trailer-btn" onClick={toggle}>
                                            <MDBIcon
                                                icon="play"
                                                className="mr-2"
                                            ></MDBIcon><span>Play trailer</span>
                                        </button> :
                                        <button className="trailer-btn">
                                            <MDBIcon
                                                icon="play"
                                                className="mr-2"
                                            ></MDBIcon><span>Play trailer</span>
                                        </button>
                                }
                            </div>
                            <div>
                                <p className="overview-title">Overview</p>
                                {context.loading ? <p className="overview">{movie.overview}</p> :
                                    <div>
                                        <div className="overview-ph"></div>
                                        <div className="overview-ph"></div>
                                        <div className="overview-ph"></div>
                                    </div>
                                }
                                {movie.homepage !== "" &&
                                    <div>
                                        <MDBIcon icon="link" size="lg" className="cyan-text pr-3" />
                                        <a target="_blank" rel="noopener noreferrer" href={movie.homepage}>{movie.homepage}  </a>
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
                                <CastCard loading={context.loading} movie={movie} />
                                <p className="cast-btn">
                                    <Link
                                        to={`/discover/movie/${params.id}/cast-crew`}
                                    >Full Cast & Crew</Link>
                                </p>
                            </div>
                            {
                                context.loading && context.selectedMovieImages.length !== 0 ?
                                    <div>
                                        <h2 className="cast-title">Images</h2>
                                        <div className="hr-line"></div>
                                        <section className="hr-card">
                                            {
                                                context.loading && context.selectedMovieImages.map((movie, i) => {
                                                    return (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original/${movie.file_path}`}
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
                            {
                                context.loading && context.reviews.length !== 0 ?
                                    <div>
                                        <h2 className="cast-title">Reviews</h2>
                                        <div className="hr-line"></div>
                                        <section>
                                            {
                                                context.loading && context.reviews.map((review, i) => {
                                                    return (
                                                        <div className="review-card" key={i}>
                                                            <div style={{ display: "flex"}}>
                                                                <img src={avatar} alt="review-avatar" width="30px" height="30px" />
                                                                <p className="review-author">{review.author}</p>
                                                            </div>
                                                            <p className="review-content">{review.content}</p>
                                                            <a href={review.url} rel="noopener noreferrer" target="_blank" className="review-url">Read more here</a>
                                                       </div>
                                                    )
                                                })
                                            }
                                        </section>
                                    </div> : null
                            }

                        </MDBCol>
                        <MDBCol size="12" sm="4" md="4" lg="4">
                            <MovieDetails movie={movie} loading={context.loading}/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            {
                                context.loading && context.recommendations.length === 0 ? null :
                                <div>
                                    <h2 className="cast-title">Recommendations</h2>
                                    <div className="hr-line"></div>

                                    <section className="hr-card">
                                        {
                                            context.loading && context.recommendations.map((movie, i) => {
                                                return (
                                                    <div className="profile-pic" key={i}>
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                                            alt="poster"
                                                            key={i}
                                                            className="poster-rec-img"
                                                            />
                                                        <div className="edit">
                                                            <div>
                                                                <h2 className="txt">{movie.title}</h2>
                                                                <MDBBtn
                                                                    outline
                                                                    size="sm"
                                                                    onClick={() => handleSuggestMovies(movie)}
                                                                    className="suggest-btn"
                                                                    color="secondary"
                                                                    >Movie Detail</MDBBtn>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </section>
                                </div>
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    )
}

export default MovieShow
