
import { useState, useEffect, useContext } from 'react';

import * as songService from '../../services/songService';
import SongCard from '../../components/SongList/SongCard/SongCard.js'

import { AuthContext } from '../../contexts/AuthContext';

const MySongs = () => {
    const [songs, setSongs] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        songService.getAll()
            .then(result => {
                setSongs(result);
            })
    }, []);


    return (
        <>

            <div className="card-deck">
                <div className="row d-flex justify-content-center">
                    {songs.filter(x => x._ownerId === user._id).map(x => <SongCard key={x._id} song={x} />)}


                </div>
            </div>
        </>
    )

}

export default MySongs