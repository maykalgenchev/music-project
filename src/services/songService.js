const baseUrl = 'http://localhost:3030/jsonstore';


export const getAll = async () => {
    let response = await fetch(`${baseUrl}/songs`)

    let songs = await response.json();

    let result = Object.values(songs)

    return result;
};

export const create = async (songData, token) => {
    let response = await fetch(`${baseUrl}/songs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...songData })
    });

    let result = await response.json();

    return result;
};

export const edit = (songData, token) => {
    return fetch(`${baseUrl}/songs/${songData._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json; charset=UTF-8',
            'X-Authorization': token
        },
        body: JSON.stringify({ ...songData })
    }).then(res => res.json());
}

export const getOne = (songId) => {
    return fetch(`${baseUrl}/songs/${songId}`)
        .then(res => res.json())
};

export const destroy = (songId, token) => {
    return fetch(`${baseUrl}/songs/${songId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
}

export const update = (songData, token) => {
    return fetch(`${baseUrl}/songs/${songData._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ ...songData }),
    })
        .then(res => res.json())
};

