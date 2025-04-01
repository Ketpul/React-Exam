import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Зареждаме снимки (тук ще използваме примерен API за изображение)
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.example.com/images'); // Примерен API
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="home-page">
      <section className="intro-section">
        <h1>Добре дошли в нашето приложение!</h1>
        <p>Тук можете да откриете най-новите и най-популярни снимки, качени от нашите потребители.</p>
      </section>
      
      <section className="image-gallery">
        <h2>Нашата галерия</h2>
        <div className="images-grid">
          {images.length > 0 ? (
            images.map((image) => (
              <div className="image-card" key={image.id}>
                <img src={image.url} alt={image.title} />
                <h3>{image.title}</h3>
              </div>
            ))
          ) : (
            <p>Зареждаме снимките...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
