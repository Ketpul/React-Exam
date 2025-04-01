const baseUrl = 'http://localhost:3030/jsonstore/images';

export const getAllImages = async () => {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error('Failed to fetch images');
        
        const text = await response.text(); // Взимаме съдържанието като текст
        if (!text) return []; // Ако няма съдържание, връщаме празен масив

        return Object.values(JSON.parse(text));
    } catch (err) {
        throw new Error(err.message);
    }
};


export const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
        const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete image');

        const text = await response.text();
        return text ? JSON.parse(text) : null;
    } catch (err) {
        throw new Error(err.message);
    }
};


export const updateImage = async (id, updatedImage) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedImage),
        });

        if (!response.ok) throw new Error('Failed to update image');
        return await response.json(); 
    } catch (err) {
        throw new Error(err.message);
    }
};

export const createImage = async (newImage) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newImage),
        });

        if (!response.ok) throw new Error('Failed to upload image');
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const addFavorite = async (username, imageId) => {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, imageId }),
        });
        if (!response.ok) throw new Error('Failed to add favorite');
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const removeFavorite = async (username, imageId) => {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/favorites`);
        if (!response.ok) throw new Error('Failed to fetch favorites');

        const data = await response.json();

        const favoriteToRemove = Object.values(data).find(fav => fav.username === username && fav.imageId === imageId);

        if (favoriteToRemove) {
            const deleteResponse = await fetch(`http://localhost:3030/jsonstore/favorites/${favoriteToRemove._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!deleteResponse.ok) throw new Error('Failed to remove favorite');

        } else {
            throw new Error('Favorite not found');
        }

    } catch (err) {
        throw new Error(err.message);
    }
};


export const getFavorites = async (username) => {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/favorites`);
        if (!response.ok) throw new Error('Failed to fetch favorites');

        const text = await response.text();
        if (!text) return [];

        const data = JSON.parse(text);
        return Object.values(data).filter(fav => fav.username === username);
    } catch (err) {
        throw new Error(err.message);
    }
};

