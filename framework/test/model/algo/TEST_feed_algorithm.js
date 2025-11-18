//////////////// test ////////////////
{
_testAlgo = new FeedAlgorithm();

//_testAccount0 = new Account("accountName", "ok");
//_testPost0 = new DataContentMain(_testAccount0, "media/clips/counter_strike_2_1.mp4", "200k", "🍆🍑💚", "title", "description");
//_testAlgo.add(_testPost0);
//
//_testPost1 = new DataContentMain(_testAccount0, "media/clips/counter_strike_2_5.mp4", "400k", "🍆🍑💚", "title", "description");
//_testAlgo.add(_testPost1);

console.log("TEST_feed_algorithm.js");
NyanTest.assertEquals(_testAlgo.getContent(0), _testPost0);
NyanTest.assertEquals(_testAlgo.getContent(1), _testPost1);
NyanTest.assertEquals(_testAlgo.getContent(2), null);
}