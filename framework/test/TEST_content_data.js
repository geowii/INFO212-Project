//////////////// test ////////////////
import * as conDB from '../database_con/js_tofrom_db.js';

{
conDB.insertIntoDB(['users', ['accountName', 0, 'ok', '', '']]);
_testAccount0 = new Account("0", "ok");
conDB.insertIntoDB(['content', ['0', '0', 'media/clips/counter_strike_2_1.mp4', 'my_video', 'HOLY', 200, 'counter_strike_2', 'fps', 0]]);
conDB.insertIntoDB(['user_interactions', ['accountName', '0', '0', '🍆']]);
conDB.insertIntoDB(['user_interactions', ['accountName', '0', '0', '🍑']]);
conDB.insertIntoDB(['user_interactions', ['accountName', '0', '0', '💚']]);
_testPost0 = new DataContentMain(0);
_testPost0.addComment(new DataComment(_testAccount0, "ok", "so hot omg"));
_testPost0.addComment(new DataComment(_testAccount0, "ok", "pls follow"));

console.log("TEST_content_data.js");
NyanTest.assertEquals(_testPost0.getProfile(), _testAccount0.getProfile());
NyanTest.assertEquals(_testPost0.getDescription(), "HOLY");
NyanTest.assertEquals(_testPost0.getViews(), "200");
NyanTest.assertEquals(_testPost0.getEmojis(), "🍆🍑💚");
NyanTest.assertEquals(_testPost0.getSource(), "media/clips/counter_strike_2_1.mp4");
NyanTest.assertEquals(_testPost0.getComments().getComments(0, 1)[0].getText(), "so hot omg");
NyanTest.assertEquals(_testPost0.getComments().getComments(1, 2)[0].getText(), "pls follow");
NyanTest.assertEquals(_testPost0.getComments().getSize(), 2);
}