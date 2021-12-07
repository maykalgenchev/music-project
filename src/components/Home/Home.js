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
        <div>
            <div className="d-flex justify-content-center mt-5 mb-3">
                <p>Top 3 most liked songs:</p>
            </div>
            <div className="d-flex justify-content-center">
                <ul className="position-center d-inline-flex">
                    {asd.map(x => <SongCard key={x._id} song={x} />)}
                </ul>
            </div>
        </div>
    )
}

export default Home;