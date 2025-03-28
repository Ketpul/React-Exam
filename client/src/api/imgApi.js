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
