import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Footer from './layouts/Footer'
import Home from './components/Home'
import TVShows from "./components/TVShows"
import TVShowComponent from "./components/TVShowComponent"
import MovieShow from "./components/MovieShow"
import Discover from "./components/Discover"
import FullCastCrew from "./components/FullCastCrew"
import TVShowCast from "./components/TVShowCast"
import Header from './layouts/Header'
import FilmProvider from "./context/FilmProvider"
import TVShowProvider from "./context/TVShowProvider"
import SearchResults from "./components/SearchResults"
import NotFound from "./layouts/404"

function App() {
  console.log("%cMatinee Movie", "color: maroon; font-weight: 900; font-size: 50px; font-family: monospace");
  return (
    <BrowserRouter>
      <FilmProvider>
        <TVShowProvider>
          <Header />
          <div style={{ minHeight: "90vh" }}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/discover/tv-shows" component={TVShows} exact />
              <Route path="/discover/tv-shows/:id" component={TVShowComponent} exact />
              <Route path="/discover/movie" component={Discover} exact />
              <Route path="/discover/movie/:id" component={MovieShow} exact />
              <Route path="/discover/movie/:id/cast-crew" component={FullCastCrew} exact />
              <Route path="/discover/tv/:id/cast-crew" component={TVShowCast} exact />
              <Route path="/search" component={SearchResults} exact />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </TVShowProvider>
      </FilmProvider>
    </BrowserRouter>
  );
}

export default App;
