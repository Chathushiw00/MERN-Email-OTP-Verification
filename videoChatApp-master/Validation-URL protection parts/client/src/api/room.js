export const createRoomAPI = async (author) => {
    const rawResponse = await fetch(`${process.env.REACT_APP_BACKEND_EXPRESS_HOST}/rooms`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author })
    });
    const data = await rawResponse.json();
    return data;
};

export const fetchRoomAPI = async (roomId) => {
    const rawResponse = await fetch(`${process.env.REACT_APP_BACKEND_EXPRESS_HOST}/rooms/${roomId}`, {
        method: 'GET',
    });
    const data = await rawResponse.json();
    return data;
};

export const joinRoomAPI = async (roomId, participant) => {
    const rawResponse = await fetch(`${process.env.REACT_APP_BACKEND_EXPRESS_HOST}/rooms/${roomId}/join`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ participant })
    });
    const data = await rawResponse.json();
    return data;
};
