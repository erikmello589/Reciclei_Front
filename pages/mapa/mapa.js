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

    async function fetchEmpresas(apiUrl) {
      try {
          // Recupera o token do localStorage
          const token = localStorage.getItem('acessToken');
          if (!token) {
              alert("Usuário não autenticado para acessar a página");
              console.log("Usuário não autenticado para acessar a página")
              throw new Error('Token não encontrado no localStorage');
          }
  
          // Faz a requisição GET
          const response = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });
  
          if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
          }
  
          const data = await response.json();
  
          return data;
      } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
          return null;
      }
  }

  async function getCoordinates(address, proximityCoordinates) {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?proximity=${proximityCoordinates.join(',')}&access_token=${mapboxgl.accessToken}`;

    try {
        const response = await fetch(geocodeUrl);
        if (!response.ok) {
            console.log("API não retornou OK");
            throw new Error(`Erro na Geocoding API: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)

        if (data.features && data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;
            return { longitude, latitude };
        } else {
            console.log('Endereço não encontrado.');
            return null;
        }
    } catch (error) {
        console.log('Erro ao buscar coordenadas:', error.message);
        return null;
    }
}

  const apiUrl = 'http://localhost:8080/PontosMapa';
  
  fetchEmpresas(apiUrl)
    .then(async data => {
        if (data && data.listaEmpresas) {
            const empresas = data.listaEmpresas;

            for (const empresa of empresas) {
                // Cria o marcador com estilo customizado
                var marcador = document.createElement("div");
                marcador.className = "custom-marker";
                marcador.style.backgroundColor = gerarCorAleatoria();
                marcador.style.width = "30px";
                marcador.style.height = "30px";
                marcador.style.borderRadius = "50%";

                // Texto do popup
                const textoPopup = `
                    Nome: ${empresa.nomeEmpresa}
                    CNPJ: ${empresa.cnpj}
                    Endereço: ${empresa.endereco}, ${empresa.numeroEndereco}
                    Telefone: ${empresa.telefone}
                `;

                // Criar popup para a empresa
                var popup = new mapboxgl.Popup({ offset: 25 })
                    .setText(textoPopup);

                const endereco = `${empresa.endereco}, ${empresa.numeroEndereco}`;
                const proximidade = [-43.6348223, -22.9292316]; // Coordenadas de proximidade

                try {
                    const coordenadas = await getCoordinates(endereco, proximidade);

                    if (coordenadas) {
                        console.log(`Longitude: ${coordenadas.longitude}, Latitude: ${coordenadas.latitude}`);
                        var marker = new mapboxgl.Marker(marcador)
                            .setLngLat([coordenadas.longitude, coordenadas.latitude])
                            .setPopup(popup)
                            .addTo(map);
                    } else {
                        console.log("Não foi possível obter as coordenadas.");
                    }
                } catch (error) {
                    console.error("Erro ao obter coordenadas:", error);
                }
            }
        } else {
            console.error('Nenhuma empresa encontrada.');
        }
    })
    .catch(error => {
        console.error('Erro ao buscar empresas:', error);
    });


function gerarCorAleatoria() {
    const r = Math.floor(Math.random() * 256); // Vermelho
    const g = Math.floor(Math.random() * 256); // Verde
    const b = Math.floor(Math.random() * 256); // Azul
    const a = 0.5; // Transparência
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

  
  