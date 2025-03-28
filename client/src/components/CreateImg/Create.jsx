import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router';
import { createImage, updateImage, getAllImages } from '../../api/imgApi.js';

const baseUrl = 'http://localhost:3030/jsonstore/images';

const Create = () => {
    const { user } = useContext(UserContext);
    const { imageId } = useParams(); // Extract imageId from URL params
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch existing image if imageId exists
    useEffect(() => {
        if (imageId) {
            const fetchImage = async () => {
                try {
                    const images = await getAllImages(); // Fetch all images
                    const foundImage = images.find(img => img._id === imageId);
                    if (foundImage) {
                        setImageUrl(foundImage.imageUrl);
                        setTitle(foundImage.title);
                    } else {
                        setError('Image not found');
                    }
                } catch (err) {
                    setError('Error fetching image');
                    console.error(err);
                }
            };
            fetchImage();
        }
    }, [imageId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to upload or edit an image.');
            return;
        }

        if (!imageUrl || !title) {
            setError('Please provide both image URL and title.');
            return;
        }

        const newImage = {
            userId: user.username,  // Use username instead of token for identifying the user
            title,
            imageUrl
        };

        try {
            let response;
            if (imageId) {
                // Update existing image
                response = await updateImage(imageId, newImage);
            } else {
                // Create new image
                response = await createImage(newImage);
            }

            if (response) {
                navigate('/gallery');  // Redirect to gallery after submission
            }
        } catch (err) {
            setError('An error occurred while uploading the image.');
            console.error(err);
        }
    };

    return (
        <div className="upload-container">
            <h2>{imageId ? 'Edit Image' : 'Upload Image'}</h2>
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
                <button type="submit">{imageId ? 'Update' : 'Upload'}</button>
            </form>
        </div>
    );
};

export default Create;
