import { Link } from 'react-router-dom';

const SongCard = ({
    song
}) => {

    return (
        <div className="card m-3" style={{ width: "13rem" }}>
            <img className="card-img-top" src={song.imageUrl} alt="Card cap" />
            <div className="card-body">
                <h5 className="card-title">{song.name}</h5>
                <p className="card-text">Author: {song.author}</p>
                <p className="card-text">Type: {song.type}</p>
                <Link to={`/details/${song._id}`} className="btn btn-primary">Details</Link>
            </div>
        </div>

    )

}

export default SongCard;