function sendDataToFlask() {
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

function insertIntoDB(data) {
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

function deleteFromDB(data) {
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

function getFromDB(data) {
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

function updateDB(data) {
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

function getAllCorI(data) {
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

function getAllDB(mode) {
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

function delAllDB(mode) {
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

function testAllDbMethods() {
    // TEST FOR DATABASE ONLY BEFORE USING IT, NOT WHEN IN USE, REMEMBER TO CHANGE DB PATH TO DB_TEST.db
    console.log("Test of all methods, delete database for a clean check.")
    let delAllTest = 'all';
    delAllDB(delAllTest);

    setTimeout(() => {
        console.log("Test 1: Insert a user into DB.")
        let userInsertTest = ['users', ['test', 0, '1234', 'pol;dha;ire:twi', 'ninja;pol;ire']];
        console.log(insertIntoDB(userInsertTest));
    }, 200);

    setTimeout(() => {
        console.log("Test 2: Delete said user from DB.")
        let userDeleteTest = ['users', 0];
        deleteFromDB(userDeleteTest);
    }, 400);

    setTimeout(() => {
        console.log("Test 3: Insert the same user to DB for update check.")
        let userInsertTest = ['users', ['test', 0, '1', 'pol;dha;ire:twi', 'ninja;pol;ire']];
        insertIntoDB(userInsertTest);
    }, 600);
    
    setTimeout(() => {
        console.log("Test 4: Update said user in DB.")
        let userUpdateTest = ['users', 0, ['test', 0, '34', '', '']];
        updateDB(userUpdateTest);
    }, 800);

    setTimeout(() => {
        console.log("Test 5: Get all users from DB.")
        let getAllTest = 'users';
        getAllDB(getAllTest);
    }, 1000);

    setTimeout(() => {
        console.log("Test 6: Add content, user interaction and user comment into DB.")
        let arrayTest = [
            ['content', [0, 11, 'my_video', 'CHOVY IS INSANE', 'league_clip.mp4', 54, 'league_of_legends', 'moba', 12]],
            ['content', [1, 12, 'new_video2', 'FAKER', 'league_clip.mp4', 54, 'league_of_legends', 'moba', 6]],
            ['user_interactions', ['admin', 1, 5, '😂']],
            ['user_comment', ['dha', 2, 5, 'du e så drit', 2, 4]],
            ['user_comment', ['po', 1, 5, 'oi shit!', 3, 1]],
            ['user_comment', ['admin', 3, 5, 'test', 0, 0]],
            ['user_comment', ['admin', 3, 4, 'test', 0, 0]]
        ]
        for(let i=0; i<arrayTest.length;i++) {
            console.log(arrayTest[i]);
            insertIntoDB(arrayTest[i]);
        }
    }, 1200); 

    setTimeout(() => {
        console.log("Test 7: Get all comments.");
        getAllCorI(['user_comment', 5]);
        getAllCorI(['user_interactions', 5]);
    }, 1400);

    setTimeout(() => {
        console.log("Test 8: Check if we added all before deleting them.");
        getAllDB('all');
    }, 1600);

    setTimeout(() => {
        console.log('Test 9: Delete only the users.');
        let delAllTest = 'users';
        delAllDB(delAllTest);
    }, 1800);

    setTimeout(() => {
        console.log("Test 10: Check if content, user_i and user_c is still saved.");
        getAllDB('all');
    }, 2000);

    setTimeout(() => {
        console.log("Test 11: Test the get function");
        // [mode, [content_id, user_id]] 
        getFromDB(['content', [32, 2]]);
        // [mode, [content_id, user_id, comment]] 
        getFromDB(['user_comment', [5, 2, 'du e så drit']]);
        // [mode, [content_id, user_id]] 
        getFromDB(['user_interactions', [5, 1]]);
    }, 2200);

    setTimeout(() => {
        console.log("✅ ALL TESTS COMPLETED! Deleting test database.");
        delAllDB('all');
    }, 2400);
}