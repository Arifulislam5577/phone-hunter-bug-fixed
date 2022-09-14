const loadPhones = async (searchText, dataLimit) => {
  console.log(searchText, dataLimit);
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
  toggleSpinner(false);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  // display 10 phones only
  const showAll = document.getElementById("show-all");

  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-hidden");
  }

  //   console.log(dataLimit);

  // display no phones found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.classList.add("h-100");
    phoneDiv.innerHTML = `
        <div class="card p-4  shadow border-0">
            <img src="${phone.image}" class="card-img-top" alt="${phone.name}" style="height:8rem; object-fit:contain" />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a ...</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary rounded-0" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop spinner or loader
};

const processSearch = (dataLimit) => {
  let searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
  //   searchField.value = "";
};

// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

// search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// not the best way to load show All
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const { name, image, releaseDate, mainFeatures, others } = phone;

  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <div class="container">
        <img src="${image}" class="card-img-top my-3" alt="${name}" style="height:10rem; object-fit:contain" />
        <div class="p-4">
            <h3 class="text-secondary fw-bold">${name}</h3>
            <p>Release Date: ${releaseDate}</p>
            <p>Storage: ${mainFeatures.storage}</p>
            <p>Others: ${
              others ? others.Bluetooth : "No Bluetooth Information"
            }</p>
            <p>Sensor: ${
              mainFeatures.sensors ? mainFeatures.sensors[0] : "no sensor"
            }</p>
        </div>
    </div>

    `;
};

loadPhones("iphone");
