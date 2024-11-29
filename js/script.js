let page=0;
let api =`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`;
const appdiv=document.getElementById("app");
const searchBtn=document.getElementById("searchBtn");
const searchInput=document.getElementById("searchInput");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const resetBtn=document.getElementById("resetBtn");

const apiCall = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se ha podido cargar la API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

const showPokemon = (data)=>{
    const lista=document.createElement("ul");
    
    data.results.forEach(element => {
        //sprites.other.home.front_default
        apiCall(element.url).then(pokemon=>{
            const pokemonli=document.createElement("li");
           pokemonli.innerHTML+=
             `<img src="${pokemon.sprites.other.home.front_default}" alt="Imagen ${element.name}">
                <p>${pokemon.name}</p>`
            lista.appendChild(pokemonli);
        })
        console.log(element.url)
    });
    appdiv.innerHTML="";
    appdiv.appendChild(lista);
}

const fetchPokemon = async () => {
    const results = await apiCall(api);
    showPokemon(results);
  };
  
  fetchPokemon();

prevBtn.addEventListener("click",()=>{
    if (page>0){
        page-=10;
        api =`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`;
        fetchPokemon();
    }
})
nextBtn.addEventListener("click",()=>{
    if(page<1300){
        page+=10;
        api =`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`;
        fetchPokemon();
    }}
)
resetBtn.addEventListener("click", () => {
    page = 0;
    api = `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=10`;
    fetchPokemon();
  });

searchBtn.addEventListener("click", () => {

});