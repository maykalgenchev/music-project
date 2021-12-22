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
        <div className="card-deck">
            {songs.length > 0
                ? (
                    <div className="row d-flex justify-content-center">
                        {songs.map(x => <SongCard key={x._id} song={x} />)}
                    </div>
                )
                : <p className="no-pets">No songs in database!</p>
            }
        </div>
    );
}

export default SongList;