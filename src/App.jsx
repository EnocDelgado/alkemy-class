import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Lists } from "./components/Lists";
import { Login } from './components/Login';
import { Details } from './components/Details';
import { Results } from "./components/Results";
import { Favourites } from "./components/Favourites";
import './css/App.css';

function App() {

  const [ favourites, setFavourites ] = useState([]);

    useEffect( () => {
        const favsInLocal = localStorage.getItem('favs');

        if ( favsInLocal !== null )  {
            const favsArray = JSON.parse( favsInLocal );
            setFavourites( favsArray );
        }
    }, [])
  
  const addOrRemoveFromFavs = ( event ) => {
    // To Know if this user has favourites
    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if ( favMovies === null ) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse( favMovies );
    }

    const btn = event.currentTarget;
    // get parent element ( html element that is interacting with)
    const parent = btn.parentElement;
    // get information
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;

    const movieData = { 
      imgURL,
      title,
      overview,
      // html5 Data attribute, store
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find( oneMovie => {
      return oneMovie.id === movieData.id
    })

    if ( !movieIsInArray ) {
      // Add to favourites
      tempMoviesInFavs.push( movieData );
      //
      localStorage.setItem( 'favs', JSON.stringify( tempMoviesInFavs ) );

      setFavourites( tempMoviesInFavs ); // State
    } else {
      let moviesLeft = tempMoviesInFavs.filter( oneMovie => {
        return oneMovie.id !== movieData.id
      })

      localStorage.setItem( 'favs', JSON.stringify( moviesLeft ) );

      setFavourites( moviesLeft );

    }

  }

  return (
    <>
    {/* Header */}
      <Header favourites={ favourites }/>

    <div className="container mt-3">
      {/* Routes */}
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/listado" element={ <Lists  props={ addOrRemoveFromFavs } />} />
          <Route path="/detalle" element={ <Details />} />
          <Route path="/resultados" element={ <Results props={ addOrRemoveFromFavs } />} />
          <Route path="/favoritos" element={ <Favourites favourites={ favourites } props={ addOrRemoveFromFavs } />} />
        </Routes>
    </div>

    {/* Footer */}
      {/* <Footer /> */}
    </>
  )
}

export default App
