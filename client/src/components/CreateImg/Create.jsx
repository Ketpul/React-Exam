import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';

const baseUrl = 'http://localhost:3030/jsonstore/images';

const Create = () => {
    const { user } = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to upload an image.');
            return;
        }

        const newImage = {
            userId: user.token,  // Записваме токена като идентификатор на потребителя
            title,
            imageUrl
        };

        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newImage),
            });

            if (!response.ok) throw new Error('Failed to upload image');

            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Image</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Create;
