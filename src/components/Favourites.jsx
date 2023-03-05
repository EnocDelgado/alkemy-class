import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Favourites = ({ favourites, props }) => {

    return (
        <>
            <h2>Seccion de Favoritos</h2>
            <div className="row">
                { !favourites.length && <div className="col-12 text-danger">No hay nada en</div>}
                {/* Basic Structure */}
                {
                    favourites.map( ( oneMovie, idx ) => {
                        return(
                            <div className="col-3" key={ idx }>
                                <div className="card my-4">
                                    <img src={ oneMovie.imgURL  } className="card-img-top" alt="..." />
                                    <button 
                                        className="farourite-btn"
                                        onClick={ props }
                                        data-movie-id={ oneMovie.id }
                                    >
                                        🖤
                                        </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{ oneMovie.title.substring(0, 30) }...</h5>
                                        <p className="card-text">{ oneMovie.overview.substring(0, 100) }...</p> {/* substring is to get an specific characters of a string */}
                                        <Link to={ `/detalle?movieID=${ oneMovie.id }` } className="btn btn-primary">View Detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
        </>
    )
}
