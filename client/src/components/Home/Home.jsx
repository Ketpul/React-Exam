import React, { useEffect, useState } from 'react';
import { getAllImages } from '../../api/imgApi'; 
const HomePage = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesData = await getAllImages();
                setImages(imagesData.slice(0, 3)); 
            } catch (err) {
                setError(err.message);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="home-page">
            <section className="intro-section">
                <h1>Welcome to our app!</h1>
                <p>Here you can discover the latest and most popular images uploaded by our users.</p>

            </section>

            <section className="image-gallery">
                {error && <p className="error">{error}</p>}
                <div className="image-frame">
                    <div className="images-grid">
                        {images.length > 0 ? (
                            images.map((image) => (
                                <div className="image-card" key={image._id}>
                                    <img src={image.imageUrl} alt={image.title} />
                                    <h3>{image.title}</h3>
                                </div>
                            ))
                        ) : (
                            <p>Зареждаме снимките...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
