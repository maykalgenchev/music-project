import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as songService from '../../services/songService';
import { AuthContext } from '../../contexts/AuthContext';

const Details = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [song, setSong] = useState({});
    const [songLiked, setSongLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const { songId } = useParams();


    useEffect(() => {
        songService.getOne(songId)


            .then(songResult => {
                setSong(songResult);
                setLikesCount(songResult.likes.length);

                if (songResult.likes.includes(user._id)) {
                    setSongLiked(true);
                }
            });

    }, []);


    const deleteHandler = (e) => {
        e.preventDefault();

        songService.destroy(songId, user.accessToken)
            .then(() => {
                navigate('/all-songs');
            });
    };

    const likeHandler = (e) => {
        e.preventDefault();

        if (song.likes.includes(user._id)) {
            return;
        }

        song.likes.push(user._id);
        songService.update(song, user.accessToken);
        setLikesCount(song.likes.length);

        setSongLiked(true);
    }

    const dislikeHandler = (e) => {
        e.preventDefault();

        let userIndex = 0;


        song.likes.forEach((element, index) => {
            if (element === user._id) {
                userIndex = index;
            }
        });

        song.likes.splice(userIndex, 1);
        songService.update(song, user.accessToken);
        setLikesCount(song.likes.length);

        setSongLiked(false);

    }

    const ownerButtons = (
        <>
            <Link className="btn btn-primary" to={`/edit/${song._id}`}>Edit</Link>
            <button className="btn btn-primary" onClick={deleteHandler}>Delete</button>
        </>
    );

    const likeButton = <Link className="btn btn-primary" to="/likes" onClick={likeHandler}>Like</Link>;
    const dislikeButton = <Link className="btn btn-primary" to="/likes" onClick={dislikeHandler}>Dislike</Link>;

    return (
        <section id="details-page" className="details">
            <div className="pet-information">
                <h3>Name: {song.name}</h3>
                <p className="type">Type: {song.type}</p>
                <p className="img"><img src={song.imageUrl} alt="Invalid imageUrl" /></p>
                <div className="actions">
                    {user._id && (user._id === song._ownerId
                        ? ownerButtons
                        : songLiked
                            ? dislikeButton
                            : likeButton
                    )}

                    <div className="likes">
                        <span id="total-likes">Likes: {likesCount} </span>
                    </div>
                </div>
            </div>
            <div className="pet-description">
                <h3>Description:</h3>
                <p>{song.description}</p>
            </div>
        </section>
    );
}

export default Details;