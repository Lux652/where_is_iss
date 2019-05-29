const ISSmap = L.map('map').setView([0,0], 4);

const ISSicon = L.icon({
    iconUrl:"img/ss.png",
    iconSize: [70,52],
    iconAnchor: [25,16]
});

const marker = L.marker([0,0], {icon:ISSicon}).addTo(ISSmap);
const tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const tileAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const tiles = L.tileLayer(tileUrl, { tileAttr });
tiles.addTo(ISSmap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstLoad = true;

async function getISS(){
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    marker.setLatLng([latitude, longitude]);
    if(firstLoad){
        ISSmap.setView([latitude,longitude],3);
        firstLoad = false;
    }
}

getISS();
setInterval(getISS, 1500)