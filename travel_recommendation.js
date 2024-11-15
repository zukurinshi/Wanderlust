async function fetchRecommendations() {
  try {
    const response = await fetch("./travel_recommendation_api.json");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.getElementById("searchButton").addEventListener("click", async () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const data = await fetchRecommendations();

  if (searchInput.includes("beach")) {
    displayRecommendations(data.beaches);
  } else if (searchInput.includes("temple")) {
    displayRecommendations(data.temples);
  } else if (searchInput.includes("country")) {
    displayCountryRecommendations(data.countries);
  } else {
    console.log("No matching recommendations found.");
  }
});

function displayRecommendations(categoryData) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  categoryData.slice(0, 2).forEach((item) => {
    const recommendationElement = document.createElement("div");
    recommendationElement.classList.add("recommendation");

    recommendationElement.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button style="border:none;padding-top:1%;padding-bottom:1%;border-radius:5%;width:20%;background-color:blue;color:white;font-size:1rem">Visit</button>
        <br><br>
      `;

    resultsContainer.appendChild(recommendationElement);
  });
}

function displayCountryRecommendations(countries) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  countries.slice(0, 2).forEach((country) => {
    country.cities.forEach((city) => {
      const recommendationElement = document.createElement("div");
      recommendationElement.classList.add("recommendation");

      recommendationElement.innerHTML = `
          <img src="${city.imageUrl}" alt="${city.name}">
          <h3>${city.name}</h3>
          <p>${city.description}</p>
          <button style="border:none;cursor:pointer;padding-top:1%;padding-bottom:1%;border-radius:5%;width:20%;background-color:blue;color:white;font-size:1rem">Visit</button>
          <br><br>
        `;

      resultsContainer.appendChild(recommendationElement);
    });
  });
}

document.getElementById("clearButton").addEventListener("click", clearResults);

function clearResults() {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
}
