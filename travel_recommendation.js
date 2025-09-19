const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", filterRecommendations);

const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("recommendations").innerHTML = "";
});

// function for implementing a serch filter on the travel recommendations
function filterRecommendations() {
  const input = document.getElementById("searchInput").value.toLowerCase();

  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      displayRecommendations(data, input);
    })
    .catch((error) => console.error("Error loading recommendations:", error));
}

function displayRecommendations(data, filter) {
  const container = document.getElementById("recommendations");
  container.innerHTML = ""; // Clear previous recommendations
  const countryData = data.countries;
  const templesData = data.temples;
  const beachesData = data.beaches;

  //   filter and display based on user input
  if (filter) {
    filter = filter.toLowerCase();
    if (filter.includes("country") || filter.includes("countries")) {
      //   countries data
      countryData.forEach((country) => {
        country.cities.forEach((city) => {
          const card = document.createElement("div");
          card.className = "recommendation recommendation-card";
          card.innerHTML = `
                <img src="${city.imageUrl}" alt="${city.destination}">   
                <h3>${city.name}</h3>
                <p>${city.description}</p>
                <button>Choose</button>
            `;
          container.appendChild(card);
        });
      });
    }
    if (filter.includes("temple") || filter.includes("temples")) {
      //   temples
      templesData.forEach((rec) => {
        const card = document.createElement("div");
        card.className = "recommendation recommendation-card";
        card.innerHTML = `
                <img src="${rec.imageUrl}" alt="${rec.destination}">   
                <h3>${rec.name}</h3>
                <p>${rec.description}</p>
            `;
        container.appendChild(card);
      });
    }
    if (filter.includes("beach") || filter.includes("beaches")) {
      //   beaches data
      beachesData.forEach((rec) => {
        const card = document.createElement("div");
        card.className = "recommendation recommendation-card";
        card.innerHTML = `
                <img src="${rec.imageUrl}" alt="${rec.destination}">   
                <h3>${rec.name}</h3>
                <p>${rec.description}</p>
            `;
        container.appendChild(card);
      });
    }
  }
}

function thankyou() {
  alert("Thank you for contacting us!");
}
