import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext.jsx';
import { deleteImage, getAllImages } from '../../api/imgApi.js';

const Images = () => {
    const { user } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await getAllImages();  
                setImages(imagesData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteImage(id); 
            setImages(images.filter(img => img._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="images-container">
            {error && <p className="error">{error}</p>}
            <div className="images-grid">
                {images.map((img) => (
                    <div key={img._id} className="image-card">
                        <img src={img.imageUrl} alt={img.title} />
                        <h3>{img.title}</h3>
                        {user && user.token === img.userId ? (
                            <div className="actions">
                                <button onClick={() => navigate(`/edit/${img._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(img._id)} className="delete">Delete</button>
                            </div>
                        ) : (
                            <button className="favorite">Favorite</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
