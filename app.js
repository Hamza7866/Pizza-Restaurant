const Mymap = L.map("map").setView([40.678177, -73.94416], 12);

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(Mymap);

function generateList() {
  const ul = document.querySelector(".list");
  storeList.forEach((shop) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const a = document.createElement("a");
    const p = document.createElement("p");
    a.addEventListener("click", () => {
      flyToStore(shop);
    });
    div.classList.add("shop-item");
    a.innerText = shop.properties.name;
    a.href = "#";
    p.innerText = shop.properties.address;

    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div);
    ul.appendChild(li);
  });
}

generateList();

function makePopup(shop) {
  return `
    <div>
    <h4>${shop.properties.name}</h4>
    <p>${shop.properties.address}</p>
    <div class="phone-number">
    <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
    </div>
    </div>
    `;
}

function onEachFeature(feature, layer) {
  layer.bindPopup(makePopup(feature), {
    closeButton: false,
    offset: L.point(0, -8),
  });
}

const myIcon = L.icon({
  iconUrl: "./piz.jpg",
  iconSize: [30, 40],
});

const shopLayer = L.geoJson(storeList, {
  onEachFeature: onEachFeature,
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: myIcon });
  },
});

shopLayer.addTo(Mymap);

function flyToStore(store) {
  const lat = store.geometry.coordinates[1];
  const lng = store.geometry.coordinates[0];
  Mymap.flyTo(
    [store.geometry.coordinates[1], store.geometry.coordinates[0]],
    14
  );
  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -8) })
      .setLatLng([lat, lng])
      .setContent(makePopup(store))
      .openOn(Mymap);
  }, 2000);
}
