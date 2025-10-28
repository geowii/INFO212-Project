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
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

window.addEventListener('beforeunload', function(e) {
    if (window.testRunning) {
        e.preventDefault();
        e.returnValue = '';
    }
});

function testAllDbMethods() {
    window.testRunning = true; // Set flag
    console.log("Test of all methods, delete database for a clean check.")
    let delAllTest = 'all';
    delAllDB(delAllTest);

    setTimeout(() => {
        console.log("Test 1: Insert a user into DB.")
        let userInsertTest = ['users', ['test', 0, '', 'pol;dha;ire:twi', 'ninja;pol;ire', 24, 'counter_strike_2,12;counter_strike_s2,43,baldurs_gate_3,27']];
        insertIntoDB(userInsertTest);
    }, 200);

    setTimeout(() => {
        console.log("Test 2: Delete said user from DB.")
        let userDeleteTest = ['users', 0];
        deleteFromDB(userDeleteTest);
    }, 400);

    setTimeout(() => {
        console.log("Test 3: Insert the same user to DB for update check.")
        let userInsertTest = ['users', ['test', 0, '', 'pol;dha;ire:twi', 'ninja;pol;ire', 24, 'counter_strike_2,12;counter_strike_s2,43,baldurs_gate_3,27']];
        insertIntoDB(userInsertTest);
    }, 600);
    
    setTimeout(() => {
        console.log("Test 4: Update said user in DB.")
        let userUpdateTest = ['users', 0, ['test', 2, '', '', '', 0, '']];
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
            ['content', [32, 'league_clip.mp4', 54, 82, 'league_of_legends', 'moba', 12, 2]],
            ['user_interactions', ['admin', 1, 5, true, false, true, '😂']],
            ['user_comment', ['dha', true, 2, 5, 'du e så drit', 2, 4]]
        ]
        for(let i=0; i<arrayTest.length;i++) {
            console.log(arrayTest[i]);
            insertIntoDB(arrayTest[i]);
        }
    }, 1200); 

    setTimeout(() => {
        console.log("Test 7: Check if we added all before deleting them.")
        getAllDB('all');
    }, 1400);

    setTimeout(() => {
        console.log('Test 8: Delete only the users.')
        let delAllTest = 'users';
        delAllDB(delAllTest);
    }, 1600);

    setTimeout(() => {
        console.log("Test 9: Check if content, user i and user c is still saved.")
        getAllDB('all');
    }, 1800);

    setTimeout(() => {
        console.log("✅ ALL TESTS COMPLETED!");
        window.testRunning = false; // Clear flag
    }, 2000);
}