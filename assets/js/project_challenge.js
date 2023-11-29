import {
  getgenreList,
  getFeaturedGames,
  getGamesBasedOnGenres,
  getGamesBasedOnName,
  BASE_URL,
} from "./callAPI.mjs";

// const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
const categoryPC = document.querySelector(".category-pc");
const categoryTablet = document.querySelector(".category-tablet");
const categoryMobile = document.querySelector(".category-mobile");
const rowContain = document.querySelector(".gae-contain-row");
const genreTextPC = document.querySelector(".text-header-contain h3");
const genreTextMobileTablet = document.querySelector(".genre-text");
const loadBtn = document.getElementById("load-more-btn");
const inputIconPC = document.querySelector(".input-icon-pc");
const inputIconTablet = document.querySelector(".input-icon-tablet");
const inputIconMobile = document.querySelector(".input-icon-mobile");
const inputBoxPC = document.querySelector(".input-box-pc");
const inputBoxTablet = document.querySelector(".input-box-tablet");
const inputBoxMobile = document.querySelector(".input-box-mobile");
const homeIconMobile = document.querySelector(".home-mobile-icon");
const homeIconPCTablet = document.querySelector(".home-pc-tablet-icon");

let numberOfGame = 10;
let genreList = [];
let gameFeaturedList = [];
let gameGenresList = [];
let gameSearchList = [];

let textInInput = "";

// // Show detail of a game
const gameDetail = async (appid) => {
  disableBtnLoadMore();
  try {
    let response = await fetch(`${BASE_URL}/single-game/${appid}`);
    if (response.ok) {
      let data = await response.json();
      console.log(data["data"]["name"]);
      genreTextPC.textContent = `${data["data"]["name"]}`;
      genreTextMobileTablet.textContent = `${data["data"]["name"]}`;
      rowContain.innerHTML = "";
      let divContain = document.createElement("div");

      divContain.className = "col l-12 m-12 c-12 item";
      divContain.innerHTML = `<div class="game-detail-contain">
                    <div class="game-description">
                        <div class="game-description-top">
                            <img src="${
                              data["data"]["header_image"]
                            }" alt="Game image">
                            <div class="game-description-text">
                                <p>${data["data"]["description"]}</p>
                                <p>Positive Rating: ${
                                  data["data"]["positive_ratings"]
                                }</p>
                                <p>Negative Rating: ${
                                  data["data"]["negative_ratings"]
                                }</p>
                                <p>Developer: ${data["data"]["developer"]}</p>
                                <p>Release Date: ${
                                  data["data"]["release_date"].split("T")[0]
                                }</p>
                                <p>Price: ${data["data"]["price"]}</p>
                            </div>
                        </div>
                        <div class="game-description-bottom"></div>
                    </div>

                    <div class="row game-images-contain">
                        <div class="col l-6 m-6 c-12">
                            <img src="${
                              data["data"]["header_image"]
                            }" alt="Game image">
                        </div>
                        <div class="col l-6 m-6 c-12">
                            <img src="${
                              data["data"]["background"]
                            }" alt="Game image">
                        </div>
                    </div>
                </div>`;
      rowContain.appendChild(divContain);
      let divGameTags = document.querySelector(".game-description-bottom");
      data["data"]["steamspy_tags"].forEach((element) => {
        let spanElement = document.createElement("span");
        spanElement.textContent = `${element}`;
        divGameTags.appendChild(spanElement);
      });

      return data;
    }
    return;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

window.gameDetail = gameDetail;

// Disable button load more

const disableBtnLoadMore = () => {
  loadBtn.disabled = true;
};

// Enable button load more

const enableBtnLoadMore = () => {
  loadBtn.disabled = false;
};

// Get game genre for web

// const getgenreList = async () => {
//   let genreListFunc = [];
//   try {
//     let response = await fetch(`${BASE_URL}/genres`);
//     if (response.ok) {
//       let data = await response.json();
//       (data ? data.data : []).forEach((item) => {
//         genreListFunc.push(item["name"]);
//       });
//       // console.log(genreListFunc);
//       return genreListFunc;
//     }
//     return [];
//   } catch (error) {
//     console.log(error.message);
//     return [];
//   }
// };

const applyToUl = async () => {
  try {
    genreList = await getgenreList();
    if (genreList.length === 0) {
      swal({
        text: "Không có danh mục tồn tại",
        icon: "info",
      });
    } else {
      genreList.forEach((element) => {
        // For PC
        const liElementPC = document.createElement("li");
        liElementPC.className = "game-genres-list";
        liElementPC.textContent = `${element}`;
        categoryPC.appendChild(liElementPC);

        // For Tablet
        const liElementTablet = document.createElement("li");
        liElementTablet.textContent = `${element}`;
        liElementTablet.className = "tablet game-genres-list";
        categoryTablet.appendChild(liElementTablet);

        // For mobile
        const liElementMobile = document.createElement("li");
        liElementMobile.textContent = `${element}`;
        liElementMobile.className = "mobile game-genres-list";
        categoryMobile.appendChild(liElementMobile);
      });
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

applyToUl();

// Get games

// const getFeaturedGames = async () => {
//   try {
//     let response = await fetch(`${BASE_URL}/features`);
//     if (response.ok) {
//       let data = await response.json();
//       // console.log(data["data"]);
//       return data["data"];
//     }
//     return [];
//   } catch (error) {
//     console.log(error.message);
//     return [];
//   }
// };

//  Apply  featured games to page

const applyFeaturedGamesToPage = async () => {
  enableBtnLoadMore();
  try {
    gameFeaturedList = await getFeaturedGames();
    if (gameFeaturedList.length === 0) {
      swal({
        text: "Không tìm thấy thông tin tìm kiếm",
        icon: "info",
      });
    } else {
      genreTextPC.textContent = "Best";
      genreTextMobileTablet.textContent = "Best";
      rowContain.innerHTML = "";
      gameFeaturedList.forEach((element) => {
        let divContain = document.createElement("div");
        divContain.className = "col l-3 m-3 c-12 item";
        divContain.innerHTML = `<div class="game-item" onclick="gameDetail(${element["appid"]})">
                        <img src="${element["header_image"]}" alt="Game image" style="width: 100%;">
                        <div class="game-info">
                            <p style="text-align: left">${element["name"]}</p>
                            <p style="text-align: left">Price: ${element["price"]}</p>
                        </div>
                    </div>`;
        rowContain.appendChild(divContain);
      });
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

// Load page first time and display featured games

applyFeaturedGamesToPage();

// Get games based on genres when clicked in ul

// const getGamesBasedOnGenres = async (searchString) => {
//   // console.log(typeof `${numberOfGame}`);
//   try {
//     let response = await fetch(
//       `${BASE_URL}/games/?genres=${searchString}&limit=${numberOfGame}`
//     );
//     if (response.ok) {
//       let data = await response.json();
//       // console.log(data["data"]);
//       return data["data"];
//     }
//     return [];
//   } catch (error) {
//     console.log(error.message);
//     return [];
//   }
// };

const applyGamesBasedOnGenresToPage = async (searchString) => {
  enableBtnLoadMore();
  try {
    gameGenresList = await getGamesBasedOnGenres(searchString, numberOfGame);
    console.log(gameGenresList);
    if (gameGenresList.length === 0) {
      swal({
        text: "Không tìm thấy thông tìn tìm kiếm",
        icon: "info",
      });
    } else {
      genreTextPC.textContent = `${searchString}`;
      genreTextMobileTablet.textContent = `${searchString}`;
      rowContain.innerHTML = "";
      gameGenresList.forEach((element) => {
        let divContain = document.createElement("div");
        divContain.className = "col l-3 m-3 c-12 item";
        divContain.innerHTML = `<div class="game-item" onclick="gameDetail(${element["appid"]})">
                        <img src="${element["header_image"]}" alt="Game image" style="width: 100%;">
                        <div class="game-info">
                            <p style="text-align: left">${element["name"]}</p>
                            <p style="text-align: left">Price: ${element["price"]}</p>
                        </div>
                    </div>`;
        rowContain.appendChild(divContain);
      });
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

categoryPC.addEventListener("click", (event) => {
  if (event.target.classList.contains("game-genres-list")) {
    textInInput = "";
    numberOfGame = 10;
    genreTextPC.textContent = event.target.textContent;
    genreTextMobileTablet.textContent = event.target.textContent;
    applyGamesBasedOnGenresToPage(event.target.textContent);
  }
});

categoryTablet.addEventListener("click", (event) => {
  if (event.target.classList.contains("game-genres-list")) {
    textInInput = "";
    numberOfGame = 10;
    genreTextPC.textContent = event.target.textContent;
    genreTextMobileTablet.textContent = event.target.textContent;
    applyGamesBasedOnGenresToPage(event.target.textContent);
  }
});

categoryMobile.addEventListener("click", (event) => {
  if (event.target.classList.contains("game-genres-list")) {
    textInInput = "";
    numberOfGame = 10;
    genreTextPC.textContent = event.target.textContent;
    genreTextMobileTablet.textContent = event.target.textContent;
    applyGamesBasedOnGenresToPage(event.target.textContent);
  }
});

// Load more games

loadBtn.addEventListener("click", () => {
  if (genreTextMobileTablet.textContent === "Best") {
    return 0;
  }
  // console.log(genreTextMobileTablet.textContent);
  let isGenre = genreList.includes(genreTextMobileTablet.textContent);
  numberOfGame += 10;
  if (isGenre === true && textInInput === "") {
    console.log("1");
    applyGamesBasedOnGenresToPage(genreTextMobileTablet.textContent);
  } else {
    console.log("2");
    applyGamesBasedOnNameToPage(genreTextMobileTablet.textContent);
  }
});

// Search games by input box

// const getGamesBasedOnName = async (searchString) => {
//   try {
//     let response = await fetch(
//       `${BASE_URL}/games?q=${searchString}&limit=${numberOfGame}`
//     );
//     if (response.ok) {
//       let data = await response.json();
//       // console.log(data["data"]);
//       return data["data"];
//     }
//     return [];
//   } catch (error) {
//     console.log(error.message);
//     return [];
//   }
// };

const applyGamesBasedOnNameToPage = async (searchString) => {
  enableBtnLoadMore();
  try {
    gameSearchList = await getGamesBasedOnName(searchString, numberOfGame);
    if (gameSearchList.length === 0) {
      swal({
        text: "Không tìm thấy thông tin tìm kiếm",
        icon: "info",
      });
    } else {
      genreTextPC.textContent = `${searchString}`;
      genreTextMobileTablet.textContent = `${searchString}`;
      rowContain.innerHTML = "";
      gameSearchList.forEach((element) => {
        let divContain = document.createElement("div");
        divContain.className = "col l-3 m-3 c-12 item";
        divContain.innerHTML = `<div class="game-item" onclick="gameDetail(${element["appid"]})">
                        <img src="${element["header_image"]}" alt="Game image" style="width: 100%;">
                        <div class="game-info">
                            <p style="text-align: left">${element["name"]}</p>
                            <p style="text-align: left">Price: ${element["price"]}</p>
                        </div>
                    </div>`;
        rowContain.appendChild(divContain);
      });
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

inputIconPC.addEventListener("click", () => {
  numberOfGame = 10;
  let searchQuery = inputBoxPC.value.trim();
  if (!searchQuery) {
    swal({
      text: "Hãy nhập thông tin vào ô tìm kiếm",
      icon: "info",
    });
  } else {
    applyGamesBasedOnNameToPage(searchQuery);
  }
});

inputIconTablet.addEventListener("click", () => {
  numberOfGame = 10;
  let searchQuery = inputBoxTablet.value.trim();
  if (!searchQuery) {
    swal({
      text: "Hãy nhập thông tin vào ô tìm kiếm",
      icon: "info",
    });
  } else {
    applyGamesBasedOnNameToPage(searchQuery);
  }
});

inputIconMobile.addEventListener("click", () => {
  numberOfGame = 10;
  let searchQuery = inputBoxMobile.value.trim();
  if (!searchQuery) {
    swal({
      text: "Hãy nhập thông tin vào ô tìm kiếm",
      icon: "info",
    });
  } else {
    applyGamesBasedOnNameToPage(searchQuery);
  }
});

inputBoxPC.addEventListener("input", function () {
  textInInput = inputBoxPC.value.trim();
  inputBoxTablet.value = this.value;
  inputBoxMobile.value = this.value;
});

inputBoxTablet.addEventListener("input", function () {
  textInInput = inputBoxTablet.value.trim();
  inputBoxPC.value = this.value;
  inputBoxMobile.value = this.value;
});

inputBoxMobile.addEventListener("input", function () {
  textInInput = inputBoxMobile.value.trim();
  inputBoxTablet.value = this.value;
  inputBoxPC.value = this.value;
});

// Click to li home return featured games

homeIconMobile.addEventListener("click", () => {
  console.log("hi");
  applyFeaturedGamesToPage();
});

homeIconPCTablet.addEventListener("click", () => {
  applyFeaturedGamesToPage();
});

// Apply images to slider images

// const items = document.querySelectorAll(".item-slider-images");
// const circleDots = document.querySelectorAll(".circle-dots li");
const slider = document.querySelector(".list-images");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const circleDotsContain = document.querySelector(".circle-dots");

let active = 0;
let maxindexOfImages = 9;

const reloadSlider = () => {
  slider.style.left =
    -document.querySelectorAll(".item-slider-images")[active].offsetLeft + "px";
  let last_active_dots = document.querySelector(".circle-dots li.active");
  last_active_dots.classList.remove("active");
  document.querySelectorAll(".circle-dots li")[active].classList.add("active");
  clearInterval(refreshInterval);
  refreshInterval = setInterval(moveImagesToTheRight, 3000);
};

const moveImagesToTheRight = () => {
  active += 1;
  if (active > maxindexOfImages) {
    active = 0;
  }
  reloadSlider();
};

const moveImagesToTheLeft = () => {
  active -= 1;
  if (active < 0) {
    active = maxindexOfImages;
  }
  reloadSlider();
};

const clickToTheDots = (index) => {
  active = index;
  reloadSlider();
};

const applyImageToSlider = async () => {
  try {
    gameFeaturedList = await getFeaturedGames();
    if (gameFeaturedList.length === 0) {
      swal({
        text: "Không tìm thấy thông tin tìm kiếm",
        icon: "info",
      });
    } else {
      gameFeaturedList.forEach((element, index) => {
        let divImageSlider = document.createElement("div");
        divImageSlider.className = "item-slider-images";
        divImageSlider.innerHTML = `<img src="${element["header_image"]}" alt="Image slider">`;
        slider.appendChild(divImageSlider);

        let liContain = document.createElement("div");
        liContain.innerHTML = `<li onclick="clickToTheDots(${index})"></li>`;
        circleDotsContain.appendChild(liContain);
      });
      const firstCircleDot = document.querySelector(".circle-dots li");
      firstCircleDot.classList.add("active");
      refreshInterval = setInterval(moveImagesToTheRight, 3000);
    }
    return 0;
  } catch (error) {
    console.log(error.message);
    return 0;
  }
};

// Start slider images

let refreshInterval;
applyImageToSlider();
