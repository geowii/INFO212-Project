contentSpace = document.getElementsByClassName("ClipsContainer")[0];
generateButton = document.getElementById("generateButton");

function generate() {
    contentSpace.innerHTML += ContentGenerator.genMainFrom(post0);
}
generateButton.addEventListener("click", generate);



account0 = new Account("accountName", "ok");
post0 = new DataContentMain(account0, "test/media.jpeg", "400k", "🍆🍑💚", "title", "description");
post0.addComment(new DataComment(account0, "", "so hot omg"));
