//////////////// test ////////////////
{
_testAccount0 = new Account("accountName", "ok");
_testPost0 = new DataContentMain(_testAccount0, "media/clips/counter_strike_2_1.mp4", "200k", "🍆🍑💚", "title", "description");
_testPost0.addComment(new DataComment(_testAccount0, "", "so hot omg"));
_testPost0.addComment(new DataComment(_testAccount0, "", "pls follow"));

console.log("TEST_content_data.js");
NyanTest.assertEquals(_testPost0.getProfile(), _testAccount0.getProfile());
NyanTest.assertEquals(_testPost0.getDescription(), "description");
NyanTest.assertEquals(_testPost0.getViews(), "200k");
NyanTest.assertEquals(_testPost0.getEmojis(), "🍆🍑💚");
NyanTest.assertEquals(_testPost0.getSource(), "media/clips/counter_strike_2_1.mp4");
NyanTest.assertEquals(_testPost0.getComments().getComments(0, 1)[0].getText(), "so hot omg");
NyanTest.assertEquals(_testPost0.getComments().getComments(1, 2)[0].getText(), "pls follow");
NyanTest.assertEquals(_testPost0.getComments().getSize(), 2);
}