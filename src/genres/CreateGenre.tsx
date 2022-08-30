import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { urlCreateGenre } from '../endpoints';
import GenreForm from './GenreForm';
import { genreCreationDTO } from './genres.model';

export default function CreateGenre() {
    const history = useHistory();

    async function CreateGenre(genre: genreCreationDTO) {
        try {
            axios.post(urlCreateGenre, genre);
            history.push('/genres');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h3>Create Genre</h3>
            <GenreForm model={{ name: '' }}
                onSubmit={async value => {
                    // when the form is posted
                    await CreateGenre(value);
                }}
            />
        </>
    )
}