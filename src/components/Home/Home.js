import * as songService from '../../services/songService';
import { useState, useEffect } from 'react';
import SongCard from '../SongList/SongCard/SongCard.js'


const Home = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        songService.getAll()
            .then(result => {
                setSongs(result)
            })
    }, []);


    let asd = songs.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);

    return (
        <>
            <ul>
                {asd.map(x => <SongCard key={x._id} song={x} />)}
            </ul>
        </>
    )
}

export default Home;