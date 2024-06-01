/*global google*/
/*global fetch*/
/*global geocoder*/
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.Maps_API_Key
});


let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker")
  
map = new Map(document.getElementById("map"), {
    center: { lat: 35.681236, lng: 139.767125 }, 
    zoom: 15,
    mapId: "DEMO_MAP_ID",
    mapTypeControl: false
  });
  
    map.addListener("click", (e) => {
      placeMarkerAndPanTo(e.latLng, map);
    });
    
  const geocoder = new google.maps.Geocoder();  
  
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

         // 住所要素から国名を省略する
         address_components.forEach((component) => {
         if (!component.types.includes("country") && !component.types.includes("postal_code")) {
          addressArray.unshift(component.long_name);
           }
         });
        const address = addressArray.join(" ");
        
        console.log(results[0].formatted_address);
        console.log(address);
        
        const splitAddress = address.split(" ");
  　　  　const postcodePattern = /^\d{3}-?\d{4}$/
　　　  const postcodeIndex = splitAddress.findIndex((element) => postcodePattern.test(element));
　　　
　　　 console.log(splitAddress);
       console.log(postcodeIndex);
　　　
    　　const addressAfter =
          postcodeIndex !== -1 ? splitAddress.slice(postcodeIndex + 1).join(" ") : "";
          
        const addressInput = document.getElementById("address");
         addressInput.value= address;
      } else {
        console.log("住所が見つかりませんでした");
      }
    } else {
      console.log("逆ジオコーディングが失敗しました: " + status);
    }
  });

  // 地図を移動
  map.panTo(latLng);
}
  

  try {
    const response = await fetch("/posts.json");
    if (!response.ok) throw new Error('Network response was not ok');

    const { data: { items } } = await response.json();
    if (!Array.isArray(items)) throw new Error("Items is not an array");

    items.forEach( item => {
      const latitude = item.latitude;
      const longitude = item.longitude;
      
      const userImage = item.user.image;
      const userName = item.user.name;
      const address  = item.address;
      const Image = item.image;
      
      const marker = new google.maps.marker.AdvancedMarkerElement ({
        position: { lat: latitude, lng: longitude },
        map,
        // 他の任意のオプションもここに追加可能
      });
      
      const contentString = `
        <div class="information container p-0">
          <div class="mb-3 d-flex align-items-center">
            <img class="rounded-circle mr-2" src="${userImage}" width="40" height="40">
            <p class="lead m-0 font-weight-bold">${userName}</p>
          </div> 
          <div class="mb-3">
            <img class="thumbnail" src="${Image}" loading="lazy">
          </div>
          <div>
            <p class="text-muted">${address}</p>
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
        })
      });
    });
  } catch (error) {
    console.error('Error fetching or processing post images :', error);
  }
}

initMap()