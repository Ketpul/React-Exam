// imgApi.js

const baseUrl = 'http://localhost:3030/jsonstore/images';

export const getAllImages = async () => {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error('Failed to fetch images');
        return Object.values(await response.json());
    } catch (err) {
        throw new Error(err.message);
    }
};

export const deleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
        const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete image');
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

// Добавяне на любима снимка
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

// Премахване на любима снимка
export const removeFavorite = async (username, imageId) => {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/favorites`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, imageId }),
        });
        if (!response.ok) throw new Error('Failed to remove favorite');
    } catch (err) {
        throw new Error(err.message);
    }
};

// Получаване на любими снимки на потребител, като филтрираме на клиента по username
// Извличане на всички любими снимки, филтрирани по username
export const getFavorites = async (username) => {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/favorites`);
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const data = await response.json();

        // Преобразуване на данните в масив и филтриране по username
        const userFavorites = Object.values(data).filter(fav => fav.username === username);

        return userFavorites;
    } catch (err) {
        throw new Error(err.message);
    }
};
