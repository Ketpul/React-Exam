import React from "react";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>Welcome to ArtShare</h1>
                <p>
                    ArtShare is a platform where everyone can upload their drawings and
                    photos, find inspiration from others, and share their art with the world.
                </p>
                <p>
                    Join our community, rate and comment on artworks, add favorite images, and
                    discover amazing artists!
                </p>

            </div>
            <div className="map-container">
                <iframe
                    title="SoftUni Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.7269129346815!2d23.345682676506462!3d42.66443841695954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8578a4331f35%3A0xf7b98f6aa1873697!2sSoftware%20University!5e0!3m2!1sen!2sbg!4v1712039184856!5m2!1sen!2sbg"
                    width="100%"
                    height="450px"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default About;
