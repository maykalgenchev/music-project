import { useNavigate } from 'react-router-dom';
import * as songService from '../../services/songService';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
const CreateSong = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    const onSongCreate = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let author = formData.get('author');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let type = formData.get('type');

        songService.create({
            name,
            author,
            description,
            type,
            imageUrl,
            likes: [],
            _ownerId: user._id
        }, user.accessToken).then(result => {
            navigate('/all-songs');
        })
    }

    return (
        <form onSubmit={onSongCreate} method="POST">
            <div className="form-group">
                <label>Song name</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter song name..." />
            </div>
            <div className="form-group">
                <label>Song author</label>
                <input type="text" className="form-control" id="author" name="author" placeholder="Enter song author..." />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" id="description" name="description" placeholder="Enter description..." />
            </div>
            <div className="form-group">
                <label>Type</label>
                <input type="text" className="form-control" id="type" name="type" placeholder="Enter type..." />
            </div>
            <div className="form-group">
                <label>Image Url</label>
                <input type="text" className="form-control" id="imageUrl" name="imageUrl" placeholder="Enter imageUrl..." />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )

}

export default CreateSong;