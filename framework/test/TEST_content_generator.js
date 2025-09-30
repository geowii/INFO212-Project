//////////////// test ////////////////
{
_testAccount0 = new Account("accountName", "ok");
_testPost0 = new DataContentMain(_testAccount0, "media/clips/counter_strike_2_1.mp4", "200k", "🍆🍑💚", "title", "description");
_testPost0.addComment(new DataComment(_testAccount0, "", "so hot omg"));
_testPost1 = new DataContentMain(_testAccount0, "media/clips/counter_strike_2_5.mp4", "400k", "🍆🍑💚", "title", "description");

console.log("TEST_content_generator.js");
NyanTest.assertEquals(ContentGenerator.genMainFrom(_testPost0), "<div class=\"video\"><video autoplay><source src=\"media/clips/counter_strike_2_1.mp4\" type=\"video/mp4\"></video><div id=\"info\"><p class=\"viewCount\">200k</p><p class=\"reaction\">🍆🍑💚</p><p class=\"description\">description</p></div><div id=\"commentSection\"><div class=\"userComments\"><span class=\"user\">accountName</span><span class=\"comment\">so hot omg</span></div></div></div>");
NyanTest.assertEquals(ContentGenerator.genMainFrom(_testPost1), "<div class=\"video\"><video autoplay><source src=\"media/clips/counter_strike_2_5.mp4\" type=\"video/mp4\"></video><div id=\"info\"><p class=\"viewCount\">400k</p><p class=\"reaction\">🍆🍑💚</p><p class=\"description\">description</p></div><div id=\"commentSection\"></div></div>");
}
