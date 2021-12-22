
import { useState, useEffect, useContext } from 'react';

import * as songService from '../../services/songService';
import SongCard from '../SongList/SongCard/SongCard.js'


import { AuthContext } from '../../contexts/AuthContext';

const LikedSongs = () => {
    const [songs, setSongs] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        songService.getAll()
            .then(result => {
                console.log("Result: ", result)
                setSongs(result.filter(song => song.likes.includes(user._id)))
            })
    }, [user]);

    return (
        <>
            <div className="card-deck">
                <div className="row d-flex justify-content-center">
                    {songs.map(x => <SongCard key={x._id} song={x} />)}

                </div>
            </div>
        </>
    )

}

export default LikedSongs