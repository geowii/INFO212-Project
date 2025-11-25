//////////////// test ////////////////
{
conDB = new DatabaseToFrom();

async function runTest() {
    await conDB.delAllDB('all');
    await conDB.insertIntoDB(['users', ['contentTestName', 1, 'ok', '', '']]);
    await conDB.insertIntoDB(['content', [1, 1, 'media/clips/counter_strike_2_1.mp4', 'nice 4k', 'im too good', 200, 'counter_strike_2', 'fps', 0]]);

    emojiArray =[
        ['user_interactions', ['contentTestName', 1, 1, '🍆']],
        ['user_interactions', ['contentTestName', 1, 1, '🍑']],
        ['user_interactions', ['contentTestName', 1, 1, '💚']],
        ['user_comment', ['contentTestName', 1, 1, 'so hot omg', 0, 0]],
        ['user_comment', ['contentTestName', 1, 1, 'pls follow', 0, 0]]
    ]

    for(let i=0; i<emojiArray.length; i++) {
        await conDB.insertIntoDB(emojiArray[i]);
    }

    let _testAccount0 = new Account(1, "ok");
    _testAccount0.init();

    let _testPost0 = new DataContentMain(1);
    await _testPost0.init();

    console.log("TEST_content_data.js");
    NyanTest.assertEquals(_testPost0.getProfile(), _testAccount0.getProfile());
    NyanTest.assertEquals(_testPost0.getDescription(), "im too good");
    NyanTest.assertEquals(_testPost0.getViews(), 200);
    NyanTest.assertEquals(_testPost0.getEmojis(), "🍆🍑💚");
    NyanTest.assertEquals(_testPost0.getSource(), "media/clips/counter_strike_2_1.mp4");
    // NyanTest.assertEquals(_testPost0.getComments().getComments(0, 1)[0].getText(), "so hot omg");
    // NyanTest.assertEquals(_testPost0.getComments().getComments(1, 2)[0].getText(), "pls follow");
    // NyanTest.assertEquals(_testPost0.getComments().getSize(), 2);
}

runTest();
}