import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as songService from '../../services/songService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';


const Edit = () => {
    const [song, setSong] = useState({});
    const { songId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { addNotification } = useNotificationContext();


    useEffect(() => {
        songService.getOne(songId)
            .then(songResult => {
                setSong(songResult);
            })
    }, [songId]);



    const onSongEdit = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let author = formData.get('author');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let type = formData.get('type');


        if (name.length < 3 || name.length > 25) {
            addNotification('Song name should be at least 3 and max 25 characters!', types.info);
            return;
        }

        if (author.length < 4 || author.length > 15) {
            addNotification('Author name should be at least 4 and max 15 characters!', types.info);
            return;
        }

        if (description.length < 15 || description.length > 150) {
            addNotification('Song description should be at least 15 and max 150 characters!', types.info);
            return;
        }

        if (type.length < 3 || type.length > 10) {
            addNotification('Song type should be at least 3 and max 10 characters!', types.info);
            return;
        }

        songService.edit({
            name,
            author,
            description,
            type,
            imageUrl,
            likes: song.likes,
            _ownerId: user._id,
            _id: songId
        }, user.accessToken).then(result => {
            addNotification(`You edited ${name}!`, types.success);
            navigate('/all-songs');
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <form className="w-50" method="POST" onSubmit={onSongEdit}>
                <div className="form-group my-2">
                    <label>Song name</label>
                    <input type="text" className="form-control" id="name" name="name" defaultValue={song.name} placeholder="Enter song name..." />
                </div>
                <div className="form-group my-2">
                    <label>Song author</label>
                    <input type="text" className="form-control" id="author" name="author" defaultValue={song.author} placeholder="Enter song author..." />
                </div>
                <div className="form-group my-2">
                    <label>Description</label>
                    <input type="text" className="form-control" id="description" name="description" defaultValue={song.description} placeholder="Enter description..." />
                </div>
                <div className="form-group my-2">
                    <label>Type</label>
                    <input type="text" className="form-control" id="type" name="type" defaultValue={song.type} placeholder="Enter type..." />
                </div>
                <div className="form-group">
                    <label>Image Url</label>
                    <input type="text" className="form-control" id="imageUrl" name="imageUrl" defaultValue={song.imageUrl} placeholder="Enter imageUrl..." />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )



}

export default Edit;