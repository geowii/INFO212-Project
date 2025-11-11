contentSpace = document.getElementsByClassName("clipsContainer")[0];
buttonUp = document.getElementById("buttonUp");
buttonDown = document.getElementById("buttonDown");

algo = new FeedAlgorithm();

viewer = new ContentViewer(contentSpace, algo);

addEventListener("load", function() { viewer.loadInitial(); });
contentSpace.addEventListener("scroll", function( _event ) { viewer.scroll(_event); });
buttonUp.addEventListener("click", function() { viewer.moveUp(); });
buttonDown.addEventListener("click", function() { viewer.moveDown(); });
addEventListener("resize",  function( _event ) { viewer.resize(_event) })



_localEscape = "./../../";

account0 = new Account("accountName", "ok");
account1 = new Account("accountName2", "ya");

post0 = new DataContentMain(account0, _localEscape + "media/clips/counter_strike_2_1.mp4", "200k", "🍆🍑💚", "title", "description");
post0.addComment(new DataComment(account0, "", "so hot omg"));
algo.add(post0);

post1 = new DataContentMain(account1, _localEscape + "media/clips/fortnite_1.mp4", "40k", "🍆🍑💚", "title", "description");
post1.addComment(new DataComment(account1, "", "epic"));
algo.add(post1);

post2 = new DataContentMain(account0, _localEscape + "media/clips/counter_strike_2_3.mp4", "237", "🍆🍑💚", "title", "description");
post2.addComment(new DataComment(account0, "", "yo too sick ngl"));
algo.add(post2);

post3 = new DataContentMain(account0, _localEscape + "media/clips/counter_strike_2_7.mp4", "521M", "🍆🍑💚", "title", "description");
post3.addComment(new DataComment(account0, "", "yo you have a wife? impressive feat for a gamer"));
algo.add(post3);

post4 = new DataContentMain(account1, _localEscape + "media/clips/fortnite_3.mp4", "69 trillion", "🍆🍑💚", "title", "description");
post4.addComment(new DataComment(account1, "", "based opinion mate, what are your thoughts on current issues"));
algo.add(post4);

viewer.start();


