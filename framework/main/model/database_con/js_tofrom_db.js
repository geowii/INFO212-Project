class DatabaseToFrom {
    connect;
    constructor() {
        this.connect = 1;
    }

    static sendDataToFlask() {
        const dataToSend = { message: "Hello from JavaScript!" };

        fetch('http://127.0.0.1:5000/process_data', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
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

    insertIntoDB(data) {
        console.log(JSON.stringify(data));
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

    deleteFromDB(data) {
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

    async getFromDB(data) {
        try {
            const response = await fetch('http://127.0.0.1:5000/get', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            // Check for HTTP errors (e.g., 404, 500)
            if (!response.ok) {
                console.error(`HTTP Error in getFromDB: ${response.status} ${response.statusText}`);
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Response from Flask:', result.result);
            return result.result;
        } catch (error) {
            console.error('Error in getFromDB:', error);
            return null; 
        }
    }

    updateDB(data) {
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

    async getAllCorI(data) {
        try {
            const response = await fetch('http://127.0.0.1:5000/getAllCorI', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            // Check for HTTP errors
            if (!response.ok) {
                console.error(`HTTP Error in getAllCorI: ${response.status} ${response.statusText}`);
                throw new Error(`HTTP Error: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Response from Flask:', result.result);
            return result.result;
        } catch (error) {
            console.error('Error in getAllCorI:', error);
            return [];
        }
    }

    getAllDB(mode) {
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

    delAllDB(mode) {
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
}