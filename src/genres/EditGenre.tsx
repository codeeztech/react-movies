import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlGenres } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from '../utils/Loading';
import GenreForm from './GenreForm'
import { genreCreationDTO, genreDTO } from "./genres.model";
import EditEntity from '../utils/EditEntity';

export default function EditGenre() {



    return (
        <>
            <EditEntity<genreCreationDTO, genreDTO> url={urlGenres} entityName="Genres" indexURL="/Genres" >
                {(entity, edit) => 
                        <GenreForm model={entity} onSubmit={async value => { await edit(value) }}></GenreForm>
                }
            </EditEntity>
        </>
    )
}


