/*global google*/
/*global fetch*/
/*global geocoder*/
/*global geocodeAddress*/
/*global executeQuery*/
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.Maps_API_Key
});


let map;
let geocoder;


async function initMap() {
  try {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    map = new Map(document.getElementById("map"), {
      center: { lat: 35.681236, lng: 139.767125 },
      zoom: 15,
      mapId: "DEMO_MAP_ID",
      mapTypeControl: false
    });

    map.addListener("click", (e) => {
      placeMarkerAndPanTo(e.latLng, map);
    });

    geocoder = new google.maps.Geocoder();

    function placeMarkerAndPanTo(latLng, map) {
      new google.maps.marker.AdvancedMarkerElement({
        position: latLng,
        map: map,
      });

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const { formatted_address, address_components } = results[0];
            const addressArray = [];

            address_components.forEach((component) => {
              if (!component.types.includes("country") && !component.types.includes("postal_code")) {
                addressArray.unshift(component.long_name);
              }
            });

            const address = addressArray.join(" ");
            const addressInput = document.getElementById("address");
            addressInput.value = address;
          }
        }
      });

      map.panTo(latLng);
    }

    const response = await fetch("/posts.json");
    if (!response.ok) throw new Error('Network response was not ok');

    const { data: { items } } = await response.json();
    if (!Array.isArray(items)) throw new Error("Items is not an array");

    items.forEach(item => {
      const { latitude, longitude, address, user: { image: userImage, name: userName }, image, body } = item;
      
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map,
      });

      const contentString = `
        <div class="information container p-0">
          <div class="mb-3 d-flex align-items-center">
            <img class="rounded-circle mr-2" src="${userImage}" width="40" height="40">
            <p class="lead m-0 font-weight-bold">${userName}</p>
          </div>
          <div class="mb-3">
            <img class="thumbnail" src="${image}" loading="lazy">
          </div>
          <div>
            <p class="text-muted">${address}</p>
            <p class="lead">${body}</p>
          </div>
        </div>
      `;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    });
  } catch (error) {
    console.error('Error initializing map or fetching posts:', error);
  }
}

document.addEventListener("turbolinks:load", () => {
  initMap();
});











