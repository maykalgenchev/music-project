import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as songService from '../../services/songService';
import { AuthContext } from '../../contexts/AuthContext';

const Edit = () => {
    const [song, setSong] = useState({});
    const { songId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

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
            navigate('/all-songs');
        })
    }

    return (
        <form method="POST" onSubmit={onSongEdit}>
            <div className="form-group">
                <label>Song name</label>
                <input type="text" className="form-control" id="name" name="name" defaultValue={song.name} placeholder="Enter song name..." />
            </div>
            <div className="form-group">
                <label>Song author</label>
                <input type="text" className="form-control" id="author" name="author" defaultValue={song.author} placeholder="Enter song author..." />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" id="description" name="description" defaultValue={song.description} placeholder="Enter description..." />
            </div>
            <div className="form-group">
                <label>Type</label>
                <input type="text" className="form-control" id="type" name="type" defaultValue={song.type} placeholder="Enter type..." />
            </div>
            <div className="form-group">
                <label>Image Url</label>
                <input type="text" className="form-control" id="imageUrl" name="imageUrl" defaultValue={song.imageUrl} placeholder="Enter imageUrl..." />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>)



}

export default Edit;