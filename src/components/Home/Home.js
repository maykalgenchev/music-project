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


    let mostLiked = songs.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);

    return (
        <div>
            {mostLiked.length > 0
                ? (<>
                    <div className="d-flex justify-content-center mt-5 mb-3">
                        <p>Most liked songs:</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        {mostLiked.map(x => <SongCard key={x._id} song={x} />)}
                    </div>
                </>
                )
                : <div className="d-flex justify-content-center mt-5 mb-3">
                    <p>There are no songs!</p>
                </div>
            }
        </div>

    )
}

export default Home;