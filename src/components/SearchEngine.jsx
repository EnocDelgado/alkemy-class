import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const SearchEngine = () => {

    const history = useNavigate();

    const submitHandler = ( event ) => {
        event.preventDefault();

        const keyword = event.currentTarget.keyword.value.trim();
        
        if ( keyword.length === 0 ) {
            Swal.fire('Tienes que escribir una palabra clave');
        } else if ( keyword.length < 4 ) {
            Swal.fire('Tienes que escribir mas de 4 caracteres');
        } else {
            event.currentTarget.keyword.value = '';
            history(`/resultados?keyword=${ keyword }`)
        }


    }
    return (
        <>
            <form className='d-flex align-items-center' onSubmit={ submitHandler }>
                <label className="form-label mb-0 mx-2">
                    <input className="form-control" type="text" name='keyword' placeholder='Buscar'/>
                </label>
                <button className="btn btn-success" type='submit'>Buscar</button>
            </form>
        </>
  )
}
