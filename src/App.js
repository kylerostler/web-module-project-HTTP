import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';
import AddMovieForm from './components/AddMovieForm'
import FavoriteMovieList from './components/FavoriteMovieList';
import EditMovieForm from "./components/EditMovieForm";
import axios from 'axios';

const apiUrl = 'http://localhost:9000/api/movies'

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movieId, setMovieId] = useState()

  const { push } = useHistory()

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    axios.delete(`${apiUrl}/${id}`)
    .then(res => {
      setMovies(movies.filter((mov) => {
        return mov.id != id
      }))
      push('/movies')
    })
    .catch(err => {
      debugger
    })
  }

  const postMovie = (movie) => {
    axios.post(`http://localhost:9000/api/movies/`, movie)
          .then(res=>{
              setMovies(movies.concat(res.data.movie))
              debugger
          })
          .catch(err=>{
              debugger
          })
  }


  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm currentMovie={movies.find((movie) => {
                return movie.id === movieId
              })}
              setMovies={setMovies}
              />
            </Route>

            <Route path="/movies/:id">
              <Movie setMovieId={setMovieId} deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/movies/add">
              <AddMovieForm postMovie={postMovie} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

