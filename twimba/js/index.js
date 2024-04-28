import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener("click", function (ev) {
  if (ev.target.dataset.like) {
    handleLikeClick(ev.target.dataset.like);
  } else if (ev.target.dataset.retweet) {
    handleRetweetClick(ev.target.dataset.retweet);
  } else if (ev.target.dataset.reply) {
    handleReplyClick(ev.target.dataset.reply);
  } else if (ev.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

function handleLikeClick(tweetId) {
  // console.log(tweetId)

  let likedTweet = tweetsData.filter((item) => {
    return item.uuid === tweetId;
  })[0];

  if (likedTweet.isLiked) {
    likedTweet.likes--;
  } else {
    likedTweet.likes++;
  }

  likedTweet.isLiked = !likedTweet.isLiked;
  render();
}

function handleRetweetClick(tweetId) {
  console.log(tweetId);

  // finding the tweet who's retweet button was clicked
  let RetweetedTweet = tweetsData.filter((item) => {
    return item.uuid === tweetId;
  })[0];

  // incrementing or decrementing retweets and toggling boolean

  if (RetweetedTweet.isRetweeted) {
    RetweetedTweet.retweets--;
  } else {
    RetweetedTweet.retweets++;
  }
  RetweetedTweet.isRetweeted = !RetweetedTweet.isRetweeted;
  render();
}

// toggles replies when reply button is clicked.
function handleReplyClick(tweetId) {
  document.getElementById(`replies-${tweetId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
  let tweetInputEl = document.getElementById("tweet-input");

  console.log(tweetInputEl.value);
  if (tweetInputEl.value) {
    tweetsData.unshift({
      handle: `@Ekam`,
      profilePic: `images/ekam.jpeg`,
      likes: 0,
      retweets: 0,
      tweetText: `${tweetInputEl.value}`,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
  }
  tweetInputEl.value = "";
  render();
}

// creating boilerplate for html feed

function getFeedHtml() {
  let feedHTML = "";

  tweetsData.forEach((item) => {
    // adding color
    let likeIconClass = "";

    if (item.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (item.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    // checking if a tweet has replies, if yes, rendering them
    let replyHtml = "";

    if (item.replies.length > 0) {
      item.replies.forEach((reply) => {
        replyHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" alt="photo"/ class="profile-pic">
                        <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                        </div>

                    </div>
                </div>
                `;
      });
    }

    feedHTML += `
         <div class="tweet">
             <div class="tweet-inner">
                 <img src="${item.profilePic}" class="profile-pic">
                 <div>
                     <p class="handle">${item.handle}</p>
                     <p class="tweet-text">${item.tweetText}</p>
                     <div class="tweet-details">
                         <span class="tweet-detail">
                         <i class="fa-regular fa-comment-dots" data-reply="${item.uuid}"></i>
                             ${item.replies.length}
                         </span>
                         <span class="tweet-detail">
                         <i class="fa-solid fa-heart ${likeIconClass}" data-like="${item.uuid}" ></i>
                             ${item.likes}
                         </span>
                         <span class="tweet-detail">
                         <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${item.uuid}"></i>
                             ${item.retweets}
                         </span>
                     </div>   
                 </div>            
             </div>
             <div class="hidden" id="replies-${item.uuid}">
                ${replyHtml}
             </div>
         </div>
         `;
  });
  return feedHTML;
}

function render() {
  let feed = getFeedHtml();
  document.getElementById("feed").innerHTML = feed;
}
render();
