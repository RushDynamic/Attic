import { ATTIC_CONSTANTS, SERVER_ENDPOINTS } from '../constants/attic-constants.js'

export async function deleteNote(_id, user) {
    const response = await fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.DELETE_NOTE}` + _id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        },
        credentials: 'include'
    });

    if (!response.ok) return false;
    return true;
}

export async function updateNote(_id, _newData, user) {
    const response = await fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.UPDATE_NOTE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify({
            id: _id,
            note_title: _newData.title,
            note_body: _newData.body,
            last_edited: _newData.edited
        })
    });

    if (!response.ok) return false;
    return true;
}

export async function createNote(currentData, user) {
    const response = await fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.CREATE_NOTE}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
            username: user.username,
            note_title: currentData.title,
            note_body: currentData.body,
            last_edited: currentData.edited
        })
    });

    const data = await response.json();
    if (data.success) return true;
    return false;
}

export async function fetchNotes(user) {
    return await fetch(`${ATTIC_CONSTANTS.BASE_URI}${SERVER_ENDPOINTS.FETCH_NOTES}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username }),
        credentials: 'include'
    });
}