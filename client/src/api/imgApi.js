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

// Функция за създаване на ново изображение
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
