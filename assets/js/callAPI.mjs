export const BASE_URL =
  "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";

export const getgenreList = async () => {
  let genreListFunc = [];
  try {
    let response = await fetch(`${BASE_URL}/genres`);
    if (response.ok) {
      let data = await response.json();
      (data ? data.data : []).forEach((item) => {
        genreListFunc.push(item["name"]);
      });
      // console.log(genreListFunc);
      return genreListFunc;
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getFeaturedGames = async () => {
  try {
    let response = await fetch(`${BASE_URL}/features`);
    if (response.ok) {
      let data = await response.json();
      // console.log(data["data"]);
      return data["data"];
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getGamesBasedOnGenres = async (searchString, numberOfGame) => {
  // console.log(typeof `${numberOfGame}`);
  try {
    let response = await fetch(
      `${BASE_URL}/games/?genres=${searchString}&limit=${numberOfGame}`
    );
    if (response.ok) {
      let data = await response.json();
      // console.log(data["data"]);
      return data["data"];
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getGamesBasedOnName = async (searchString, numberOfGame) => {
  try {
    let response = await fetch(
      `${BASE_URL}/games?q=${searchString}&limit=${numberOfGame}`
    );
    if (response.ok) {
      let data = await response.json();
      // console.log(data["data"]);
      return data["data"];
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
