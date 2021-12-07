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
        <div className="d-flex justify-content-center">
            <form className="w-50" onSubmit={onSongCreate} method="POST">
                <div className="form-group my-2">
                    <label>Song name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter song name..." />
                </div>
                <div className="form-group my-2">
                    <label>Song author</label>
                    <input type="text" className="form-control" id="author" name="author" placeholder="Enter song author..." />
                </div>
                <div className="form-group my-2">
                    <label>Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter description..." />
                </div>
                <div className="form-group my-2">
                    <label>Type</label>
                    <input type="text" className="form-control" id="type" name="type" placeholder="Enter type..." />
                </div>
                <div className="form-group">
                    <label>Image Url</label>
                    <input type="text" className="form-control" id="imageUrl" name="imageUrl" placeholder="Enter imageUrl..." />
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>
    )

}

export default CreateSong;