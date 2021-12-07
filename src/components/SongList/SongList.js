import { useEffect, useState } from "react";
import SongCard from "./SongCard/SongCard.js";
import * as songService from '../../services/songService';

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        songService.getAll()
            .then(result => {
                setSongs(result);
            })
    }, []);

    return (
        <div className="container">
            {songs.length > 0
                ? (
                    <ul className="d-flex flex-nowrap">
                        {songs.map(x => <SongCard key={x._id} song={x} />)}
                    </ul>
                )
                : <p className="no-pets">No songs in database!</p>
            }
        </div>
    );
}

export default SongList;