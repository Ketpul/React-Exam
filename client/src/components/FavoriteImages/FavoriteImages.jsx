import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import { getFavorites, getAllImages } from '../../api/imgApi.js';

const FavoriteImages = () => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    // Вземи любими снимки, свързани с потребителя
                    const userFavorites = await getFavorites(user.username); // Използваме user.username тук
                    setFavorites(userFavorites.map(fav => fav.imageId)); // Вземи само imageId
                    
                    // Вземи всички снимки
                    const imagesData = await getAllImages();
                    setImages(imagesData);
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    return (
        <div className="favorites-container">
            {error && <p className="error">{error}</p>}
            <div className="favorites-grid">
                {favorites.length > 0 ? (
                    favorites.map(favId => {
                        const img = images.find(img => img._id === favId);
                        return img ? (
                            <div key={img._id} className="image-card">
                                <img src={img.imageUrl} alt={img.title} />
                                <h3>{img.title}</h3>
                            </div>
                        ) : null;
                    })
                ) : (
                    <p>No favorites found.</p>
                )}
            </div>
        </div>
    );
};

export default FavoriteImages;
