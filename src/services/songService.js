const baseUrl = 'http://localhost:3030/jsonstore';

export const getAll = async () => {
    let response = await fetch(`${baseUrl}/songs`)

    let songs = await response.json();

    let result = Object.values(songs)

    return result;
};

export const create = async (songData) => {
    let response = await fetch(`${baseUrl}/songs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ ...songData, likes: [] })
    });

    let result = await response.json();

    return result;
};