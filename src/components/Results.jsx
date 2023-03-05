import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Results = () => {

    let query = new URLSearchParams( window.location.search );
    let keyword = query.get('keyword');

    const [movieResults, setMovieResults] = useState([]);

    useEffect( () => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=f81980ff410e46f422d64ddf3a56dddd&language=es-ES&query=${ keyword }`

        axios.get( endPoint ).then( response => {
            const movieArrays = response.data.results;

            if ( movieArrays.length === 0 ) {
                Swal.fire(`Tu busqueda no tiene resultados`);
            }

            setMovieResults( movieArrays);
        })
        .catch( error => {
            console.log( error );
        })

    }, [])

    return (
        <>
            <h2>Buscaste: <em>{ keyword }</em> </h2>
            { movieResults.length === 0 && <h3>No hay resultados</h3>}
            <div className="row">
                {/* Basic Structure */}
                {
                    movieResults.map( ( oneMovie, idx ) => {
                        return(
                            <div className="col-4" key={ idx }>
                                <div className="card my-4">
                                    <img src={ `https://image.tmdb.org/t/p/w500/${ oneMovie.poster_path }` } className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{ oneMovie.title.substring(0, 30) }...</h5>
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
