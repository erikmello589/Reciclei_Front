coletaPontos("http://localhost:8080/PontosMapa", localStorage.getItem('acessToken'))

//token
mapboxgl.accessToken =
  "pk.eyJ1IjoianVsaWFzbnRuIiwiYSI6ImNtMjEwMDMxbDBwZW4yam9lNTE2a3h2M3UifQ.6MCCunBBWkyYEmwxP-u7fA";

// cria o mapa
var map = new mapboxgl.Map({
  container: "map", // id de onde o mapa vai está relacionado
  style: "mapbox://styles/mapbox/streets-v12", // style map
  center: [-43.6348223, -22.9292316], // Coordenadas [longitud, latitud]
  zoom: 9, // zoom inicial
});

//AZUL: papel/papelão;
var azul = document.createElement("div");
azul.className = "custom-marker";
azul.style.backgroundColor = "rgba(0, 0, 255, 0.5)"; // cor
azul.style.width = "30px";
azul.style.height = "30px";
azul.style.borderRadius = "50%";

//VERMELHO: plástico;
var vermelho = document.createElement("div");
vermelho.className = "custom-marker";
vermelho.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
vermelho.style.width = "30px";
vermelho.style.height = "30px";
vermelho.style.borderRadius = "50%";

//VERDE: vidro;
var verde = document.createElement("div");
verde.className = "custom-marker";
verde.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
verde.style.width = "30px";
verde.style.height = "30px";
verde.style.borderRadius = "50%";

//AMARELO: metal;
var amerelo = document.createElement("div");
amerelo.className = "custom-marker";
amerelo.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
amerelo.style.width = "30px";
amerelo.style.height = "30px";
amerelo.style.borderRadius = "50%";

//PRETO: madeira;
var preto = document.createElement("div");
preto.className = "custom-marker";
preto.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
preto.style.width = "30px";
preto.style.height = "30px";
preto.style.borderRadius = "50%";

//LARANJA: resíduos perigosos (como pilhas e baterias);
var laranja = document.createElement("div");
laranja.className = "custom-marker";
laranja.style.backgroundColor = "rgba(255, 165, 0, 0.5)";
laranja.style.width = "30px";
laranja.style.height = "30px";
laranja.style.borderRadius = "50%";

var popup = new mapboxgl.Popup({ offset: 25 }) //cria o popup
  .setText("minha casa"); // texto popup
var marker = new mapboxgl.Marker(azul) //cria o marcador
  .setLngLat([-43.6348223, -22.9292316]) //coodernada
  .setPopup(popup) //marcador
  .addTo(map); //adiciona mapa

var popupt = new mapboxgl.Popup({ offset: 25 }).setText("trabalho");
var markert = new mapboxgl.Marker(vermelho)
  .setLngLat([-43.6090246, -22.8682655])
  .setPopup(popupt)
  .addTo(map);

var popupv = new mapboxgl.Popup({ offset: 25 }).setText("algo");
var markerv = new mapboxgl.Marker(preto)
  .setLngLat([-43.560778, -22.9015072])
  .setPopup(popupv)
  .addTo(map);


  
 // lightdark abaixo
  const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.classList.add(`${currentTheme}-theme`);

    themeToggle.onclick = function() {
        if (document.documentElement.classList.contains('dark-theme')) {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.classList.replace('bx-moon', 'bx-sun');
        } else {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.classList.replace('bx-sun', 'bx-moon');
        }
    };

    if (currentTheme === 'light') {
        themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    let fontSize = 10; 

   
    zoomInBtn.addEventListener('click', () => {
      if (fontSize < 20) { 
          fontSize += 1;
          document.documentElement.style.fontSize = fontSize + 'px';
      }
    });


    zoomOutBtn.addEventListener('click', () => {
        if (fontSize > 8) { 
            fontSize -= 1;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });

    async function coletaPontos(url, accessToken) 
    {
      try {
          // Configuração dos headers, incluindo o access token para autenticação
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${accessToken}`, // Envia o access token
                  'Content-Type': 'application/json' // Define o tipo de conteúdo
              }
          });
  
          // Verifica se a resposta da API foi bem-sucedida (status 200)
          if (!response.ok) {
              console.log("Erro ao consumir a API");
              throw new Error(`Erro: ${response.status} - ${response.statusText}`);
          }
  
          // Converte a resposta para JSON
          const data = await response.json();
          console.log(data);
          return data; // Retorna os dados obtidos da API
  
      } catch (error) {
          console.error("Erro ao fazer a requisição:", error);
          throw error; // Relança o erro para tratamento adicional
      }
    }
  