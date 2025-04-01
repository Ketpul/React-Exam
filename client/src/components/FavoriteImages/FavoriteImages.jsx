import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import { getFavorites, getAllImages } from '../../api/imgApi.js';
import { useNavigate } from 'react-router';

const FavoriteImages = () => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login'); 
            return;
        }

        const fetchFavorites = async () => {
            try {
                const userFavorites = await getFavorites(user.username); 
                setFavorites(userFavorites.map(fav => fav.imageId)); 
                
                const imagesData = await getAllImages();
                setImages(imagesData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFavorites();
    }, [user, navigate]); 

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
