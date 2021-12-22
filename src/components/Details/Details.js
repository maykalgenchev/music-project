import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as songService from '../../services/songService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';

const Details = () => {
    const navigate = useNavigate();
    const [song, setSong] = useState({});
    const [songLiked, setSongLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { songId } = useParams();
    const { addNotification } = useNotificationContext();
    const { user } = useContext(AuthContext);


    useEffect(() => {
        songService.getOne(songId)


            .then(songResult => {
                setSong(songResult);
                setLikesCount(songResult.likes.length);

                if (songResult.likes.includes(user._id)) {
                    setSongLiked(true);
                }
            });

    }, [songId, user]);


    const deleteHandler = (e) => {
        e.preventDefault();

        songService.destroy(songId, user.accessToken)
            .then(() => {
                navigate('/all-songs');
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    }

    const likeHandler = (e) => {
        e.preventDefault();

        if (song.likes.includes(user._id)) {
            return;
        }

        song.likes.push(user._id);
        songService.update(song, user.accessToken);
        setLikesCount(song.likes.length);

        setSongLiked(true);
        addNotification(`You liked ${song.name}! Now you can easy find it in Liked songs.`, types.info);

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
        addNotification(`You disliked ${song.name}!`, types.warn);


    }

    const ownerButtons = (
        <>
            <Link className="btn btn-primary mx-2" to={`/edit/${song._id}`}>Edit</Link>
            <button className="btn btn-danger mx-2" onClick={deleteClickHandler}>Delete</button>
        </>
    );

    const likedButtons = (
        <>
            <div className="position-absolute top-75 start-40">


                <Link className="btn btn-primary mx-2" to="/likes" onClick={likeHandler}>Like</Link>
                <Link className="btn btn-danger disabled mx-2" to="/likes" onClick={dislikeHandler}>Dislike</Link>
            </div>

        </>
    )


    const dislikedButtons = (
        <>

            <div className="position-absolute top-75 start-40">

                <Link className="btn btn-primary disabled mx-2 " to="/likes" onClick={likeHandler}>Like</Link>
                <Link className="btn btn-danger mx-2" to="/likes" onClick={dislikeHandler}>Dislike</Link>
            </div>


        </>
    )

    return (
        <>
            <DeleteConfirm show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />
            <section id="details-page" className="d-flex justify-content-center ">
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


                        <div className="my-2 position-absolute top-100 start-40">
                            <div className="d-flex justify-content-center">
                                <h3>Description:</h3>
                            </div>
                            <p>{song.description}</p>
                        </div>

                    </div>


                </div>

            </section>
        </>
    );
}

export default Details;