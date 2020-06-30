import React, { useState, useContext, useEffect } from 'react'
import "../styles/home.css"
import { MDBContainer, MDBCol, MDBIcon, MDBAnimation, MDBBtn, MDBBtnGroup } from "mdbreact";
import { Redirect } from "react-router-dom"
import FilmContext from "../context/FilmContext"
import backgroundImage from "../assets/images/captain.jpg"
import PopularMovie from "./PopularMovie"
import TrendingMoviesToday from "./TrendingMoviesToday"
import TrendingTVToday from "./TrendingTVToday"
import TrendingMoviesWeek from "./TrendingMoviesWeek"
import TrendingTVWeek from "./TrendingTvWeek"
import UpComingMovies from "./UpcomingMovies"
import TopRatedMovieTrailers from "./TopRatedMovieTrailers"

const Home = () => {
    const [query, setQuery] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [showTrMovies, setShowTrMovies] = useState(false)
    const [show, setshow] = useState(false)

    const context = useContext(FilmContext)
    const backdrop = context.homeImage === "" ? backgroundImage : `https://image.tmdb.org/t/p/original/${context.homeImage}`

    const handleSearch = () => {
        if (query === "") {
            console.log("There is no query")
        } else {
            localStorage.setItem("query", query)
            setRedirect(true)
        }
    }

    useEffect(() => {
        setShowTrMovies(true)
        // setshow(true)
    }, [])

    return (
        <>
            {
                redirect && <Redirect
                    to={{
                        pathname: `/search`,
                    }}
                />
            }
            <div className="home-component" style={{
                backgroundImage: `url(${backdrop})`
            }}>
                <MDBContainer>
                    <MDBAnimation type="bounce">
                        <p className="Heading">Welcome</p>
                        <p className="subtitle">Browse your favourite Movies and TV Shows</p>
                    </MDBAnimation>
                    <MDBCol sm="12" md="12" lg="12">
                        <form className="form-inline mt-4 mb-4">
                            <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for movie/TV shows"
                                aria-label="Search"
                            />
                        </form>
                        <MDBBtn
                            size="sm"
                            color="success"
                            onClick={handleSearch}
                            className="search_btn">Search <MDBIcon icon="search" />
                        </MDBBtn>
                    </MDBCol>
                </MDBContainer>
            </div>
            <div className="container2">


            {/* <MDBContainer className="container2"> */}
                <div>
                    <h2 className="category_headings">Popular movies</h2>
                    <PopularMovie />
                </div>
                <div>
                    <TopRatedMovieTrailers />
                </div>
                <div className="trending_container">
                    <h2 className="category_headings">Trending today</h2>
                    <div>
                        <button
                            onClick={() => setShowTrMovies(true)}
                            className={showTrMovies ? "btn_active1": "btn1"}
                        >Movies</button>
                        <button
                            onClick={() => setShowTrMovies(false)}
                            className={!showTrMovies ? "btn_active2" : "btn2"}
                        >Tv</button>
                    </div>
                </div>
                <div>
                    {showTrMovies ? <TrendingMoviesToday /> : <TrendingTVToday />}
                </div>
                <div className="trending_container">
                    <h2 className="category_headings">Trending this week</h2>
                    <div>
                        <button
                            onClick={() => setshow(true)}
                            className={show ? "btn_active1" : "btn1"}
                        >Movies</button>
                        <button
                            onClick={() => setshow(false)}
                            className={!show ? "btn_active2" : "btn2"}
                        >Tv</button>
                    </div>
                </div>
                <div>
                    {show ? <TrendingMoviesWeek /> : <TrendingTVWeek />}
                </div>
                <div>
                    <h2 className="category_headings">Upcoming movies</h2>
                    <UpComingMovies />
                </div>
                {/* </MDBContainer> */}
            </div>
        </>
    )
}

export default Home
