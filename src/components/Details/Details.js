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
            <Link className="btn btn-primary mx-2" to={`/edit/${song._id}`}>Edit</Link>
            <button className="btn btn-danger mx-2" onClick={deleteHandler}>Delete</button>
        </>
    );

    const likedButtons = (
        <>
            <div>
                <p>You like this song?</p>

            </div>
            <div>
                <Link className="btn btn-primary mx-2" to="/likes" onClick={likeHandler}>Like</Link>
                <Link className="btn btn-danger disabled mx-2" to="/likes" onClick={dislikeHandler}>Dislike</Link>
            </div>

        </>
    )


    const dislikedButtons = (
        <>
            <div>
                <p>You have already liked this song</p>
            </div>
            <div>
                <Link className="btn btn-primary disabled mx-2" to="/likes" onClick={likeHandler}>Like</Link>
                <Link className="btn btn-danger mx-2" to="/likes" onClick={dislikeHandler}>Dislike</Link>
            </div>


        </>
    )


    return (
        <section id="details-page" className="d-flex justify-content-center">
            <div>
                <h3>Name: {song.name}</h3>
                <p>Type: {song.type}</p>
                <p><img src={song.imageUrl} alt="Invalid imageUrl" /></p>

                <div className="d-flex justify-content-center my-3">
                    <span id="total-likes">Likes: {likesCount} </span>
                </div>
                <div className="d-flex justify-content-center">
                    {user._id && (user._id === song._ownerId
                        ? ownerButtons
                        : songLiked
                            ? dislikedButtons
                            : likedButtons
                    )}




                </div>

                <div className="my-2">
                    <h3>Description:</h3>
                    <p>{song.description}</p>
                </div>
            </div>

        </section>
    );
}

export default Details;