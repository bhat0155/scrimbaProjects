import { catsData } from "./data.js";

let radioEl = document.getElementById("emotion-radios");
let buttonEl = document.getElementById("get-image-btn");
let gifsOnly = document.getElementById("gifs-only-option");
let memeModalEl= document.getElementById("meme-modal");
let memeModalInner= document.getElementById("meme-modal-inner");

buttonEl.addEventListener("click", renderCat);

// changing the color of radios upon changing them

radioEl.addEventListener("change", function (ev) {
  // clearing all elements of highlighted class and reassign to only one which is selected
  let highlighted = document.getElementsByClassName("radio");

  for (let radio of highlighted) {
    radio.classList.remove("highlight");
  }
  document
    .getElementById(ev.target.id)
    .parentElement.classList.add("highlight");
});

// creating a function which will return an array of cat emotions

function getCatEmotions(cats) {
  let catsArray = [];

  for (let cat of cats) {
    for (let emotions of cat.emotionTags) {
      if (!catsArray.includes(emotions)) {
        catsArray.push(emotions);
      }
    }
  }
  return catsArray;
}

// creating a function which will render emotions radios

function renderRadio(cats) {
  const emotions = getCatEmotions(cats);
  // console.log(emotions)
  let radioInput = "";
  for (let emotion of emotions) {
    radioInput += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" name="emotion value="${emotion}" >
        </div>
        `;
  }

  radioEl.innerHTML = radioInput;
}

renderRadio(catsData);

function getMatchingCatsArray() {
  if (document.querySelector("input[type='radio']:checked")) {
    let selectedEmotion = document.querySelector(
      "input[type='radio']:checked"
    ).id;
    console.log(selectedEmotion);
    let checkIfGif = gifsOnly.checked;

    let matchingCatsArray = catsData.filter((item) => {
      if (checkIfGif) {
        return item.emotionTags.includes(selectedEmotion) && item.isGif;
      } else {
        return item.emotionTags.includes(selectedEmotion);
      }
    });

    return matchingCatsArray;
  } else {
    console.log("nothing selected");
  }
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  // getting only one object
  if (catsArray.length == 1) {
    return catsArray[0];
  } else {
    let randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

function renderCat() {
    let catObject=getSingleCatObject();
    memeModalInner.innerHTML=  
    `<img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >`

    memeModalEl.style.display="flex";
    document.getElementById("meme-modal-close-btn").addEventListener("click", function(){
        memeModalEl.style.display="none";

    })
  
}
