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
        <>
            {songs.length > 0
                ? (
                    <ul className="other-pets-list">
                        {songs.map(x => <SongCard key={x._id} song={x} />)}
                    </ul>
                )
                : <p className="no-pets">No songs in database!</p>
            }
        </>
    );
}

export default SongList;