import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlCreateGenre } from '../endpoints';
import DisplayErrors from '../utils/DisplayErrors';
import GenreForm from './GenreForm';
import { genreCreationDTO } from './genres.model';

export default function CreateGenre() {
    const history = useHistory();
    const [errors,setErrors] = useState<string[]>([]);

    async function CreateGenre(genre: genreCreationDTO) {
        try {
            await axios.post(urlCreateGenre, genre);
            history.push('/genres');

        } catch (error1) {
            if (error1 && error1.response) {
                setErrors(error1.response.data);
            }
        }
    }

   async function SubmitGenre(value:any) {
     await CreateGenre(value)
   } 
    return (
        <>
            <h3>Create Genre</h3>
            <DisplayErrors errors={errors}></DisplayErrors>
            <GenreForm model={{ name: '' }} onSubmit={async value => await SubmitGenre(value)}
                // onSubmit={async value => {
                //     // when the form is posted
                //     await CreateGenre(value);
                // }}
            />
        </>
    )
}