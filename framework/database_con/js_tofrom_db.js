export function insertIntoDB(data) {
    fetch('http://127.0.0.1:5000/insert', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function deleteFromDB(data) {
    fetch('http://127.0.0.1:5000/delete', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function getFromDB(data) {
    fetch('http://127.0.0.1:5000/get', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function updateDB(data) {
    fetch('http://127.0.0.1:5000/update', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function getAllCorI(data) {
    fetch('http://127.0.0.1:5000/getAllCorI', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function getAllDB(mode) {
    fetch(`http://127.0.0.1:5000/getAll?mode=${encodeURIComponent(mode)}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export function delAllDB(mode) {
    fetch(`http://127.0.0.1:5000/delAll?mode=${encodeURIComponent(mode)}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data.result);
        return data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}