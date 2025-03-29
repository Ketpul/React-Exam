import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../context/UserContext.jsx';
import { deleteImage, getAllImages, addFavorite, removeFavorite, getFavorites } from '../../api/imgApi.js';

const Images = () => {
    const { user } = useContext(UserContext);
    const [images, setImages] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await getAllImages();  
                setImages(imagesData);
                if (user) {
                    const userFavorites = await getFavorites(user.username); 
                    setFavorites(userFavorites.map(fav => fav.imageId)); 
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchImages();
    }, [user]);

    const handleDelete = async (id) => {
        try {
            await deleteImage(id);
            setImages(images.filter(img => img._id !== id));
            setFavorites(favorites.filter(favId => favId !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFavorite = async (id) => {
        if (!user) return alert('You must be logged in to favorite an image.');

        try {
            if (favorites.includes(id)) {
                await removeFavorite(user.username, id); 
                setFavorites(favorites.filter(favId => favId !== id));
            } else {
                await addFavorite(user.username, id); 
                setFavorites([...favorites, id]);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="images-container">
            {error && <p className="error">{error}</p>}
            <div className="images-grid">
                {images.map((img, index) => (
                    <div key={img._id || `image-${index}`} className="image-card">
                        <img src={img.imageUrl} alt={img.title} />
                        <h3>{img.title}</h3>
                        {user && user.username === img.userId ? (
                            <div className="actions">
                                <button onClick={() => navigate(`/edit/${img._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(img._id)} className="delete">Delete</button>
                            </div>
                        ) : (
                            <button 
                                className={favorites.includes(img._id) ? 'favorite active' : 'favorite'}
                                onClick={() => handleFavorite(img._id)}
                            >
                                {favorites.includes(img._id) ? 'Unfavorite' : 'Favorite'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
