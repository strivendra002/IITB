class Animal {
  constructor(species, name, size, location, imageUrl) {
    this.species = species;
    this.name = name;
    this.size = size;
    this.location = location;
    this.imageUrl = imageUrl || "https://via.placeholder.com/150";
  }

  editAnimal(index) {
    const animal = this.data[index];
    const newName = prompt("Enter new name:", animal.name);
    const newSpecies = prompt("Enter new species:", animal.species);
    const newSize = prompt("Enter new size:", animal.size);
    const newLocation = prompt("Enter new location:", animal.location);
    const newImageUrl = prompt("Enter new image URL:", animal.imageUrl);

    if (newName) animal.name = newName;
    if (newSpecies) animal.species = newSpecies;
    if (newSize) animal.size = newSize;
    if (newLocation) animal.location = newLocation;
    if (newImageUrl) animal.imageUrl = newImageUrl;

    this.renderCards();
  }
}

class AnimalCards {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data.map(
      (animal) =>
        new Animal(
          animal.Species,
          animal.Name,
          animal.Size,
          animal.Location,
          animal.ImageUrl
        )
    );
    this.renderCards();
    this.addSearchFunctionality();
  }

  renderCards(filteredData = this.data) {
    this.container.innerHTML = "";
    filteredData.forEach((animal, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
                <div class="card p-3 shadow-sm">
                    <img src="${animal.imageUrl}" class="card-img-top hover-effect" alt="${animal.name}">
                    <div class="card-body">
                        <h5 class="card-title bold">${animal.name}</h5>
                        <p class="card-text"><strong>Species:</strong> ${animal.species}</p>
                        <p class="card-text"><strong>Size:</strong> ${animal.size}</p>
                        <p class="card-text"><strong>Location:</strong> ${animal.location}</p>
                        <button class="btn btn-dark edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-warning delete-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
      this.container.appendChild(card);
    });
    this.addEventListeners();
  }

  addEventListeners() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) =>
        this.deleteAnimal(event.target.dataset.index)
      );
    });
  }

  deleteAnimal(index) {
    this.data.splice(index, 1);
    this.renderCards();
  }

  addSearchFunctionality() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filteredData = this.data.filter(
        (animal) =>
          animal.name.toLowerCase().includes(query) ||
          animal.species.toLowerCase().includes(query) ||
          animal.location.toLowerCase().includes(query)
      );
      this.renderCards(filteredData);
    });
  }
}

// Example Data
const bigCatsData = [
  {
    Species: "Big Cats",
    Name: "Tiger",
    Size: "10 ft",
    Location: "Asia",
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/Siberian_Tiger_sf.jpg",
  },
  {
    Species: "Big Cats",
    Name: "Lion",
    Size: "8 ft",
    Location: "Africa",
    ImageUrl:
      "https://2.bp.blogspot.com/-xUhDTeNaeCY/UWk0hyEf0rI/AAAAAAAAAFk/kp79USw5ubE/s1600/Wild-Lion.jpg",
  },
  {
    Species: "Big Cats",
    Name: "Leopard",
    Size: "5 ft",
    Location: "Africa and Asia",
    ImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Amur_Leopard_(1970226951).jpg",
  },
];

// Instantiate Cards
document.addEventListener("DOMContentLoaded", () => {
  new AnimalCards("bigCatsContainer", bigCatsData);
});
