function main() {
    const btnForYou = document.getElementById("");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Page ready");

  const clipsContainer = document.getElementsByClassName("clipsContainer")[0];
  const generateButton = document.getElementById("generateButton");

  // Function to create one video card with its comment panel
  function createVideoElement(videoSrc, description, comments = []) {
    const content = document.createElement("div");
    content.classList.add("content");

    content.innerHTML = `
      <div class="video">
        <video autoplay loop muted>
          <source src="${videoSrc}" type="video/mp4">
        </video>

        <div id="info">
          <p class="viewCount">${Math.floor(Math.random() * 900 + 100)}M</p>
          <p class="reaction">🔥💬💚</p>
          <p class="description">${description}</p>
        </div>

        <div id="commentSection">
          <div class="userComments">
            <span class="user">user123</span>
            <span class="comment">awesome clip 🔥</span>
          </div>
        </div>

        <!-- Comment Side Panel -->
        <div class="wrapper">
          <button class="side-panel-toggle" type="button">
            <span class="sp-icon-open">←</span>
            <span class="sp-icon-close">→</span>
          </button>

          <div class="side-panel">
            <h3>Comments</h3>
            ${comments.map(c => `<p>${c}</p>`).join("")}
          </div>
        </div>
      </div>
    `;

    // Hook up the toggle logic for this video’s panel
    const wrapper = content.querySelector(".wrapper");
    const button = wrapper.querySelector(".side-panel-toggle");
    button.addEventListener("click", () => {
      wrapper.classList.toggle("side-panel-open");
    });

    return content;
  }

  // When "Generate" button is clicked
  generateButton.addEventListener("click", () => {
    const videoSrc = "media/clips/counter_strike_2_7.mp4"; 
    const randomComments = [
      "This is wild 😂",
      "Why does this go so hard?",
      "Peak gaming moment 🎮",
      "He really did that..."
    ];

    const newVideo = createVideoElement(videoSrc, "New generated video", randomComments);
    clipsContainer.appendChild(newVideo);
  });
});
