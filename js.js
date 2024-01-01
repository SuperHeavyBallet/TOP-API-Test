const img = document.querySelector('img');
const regenButton = document.getElementById('regen-button');
const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');
const searchInputDisplay = document.getElementById('search-input-display')
let tmpSearchTerm = "";


getImage("nothing");

// old function using promises
function OldgetImage(searchTerm){
        fetch(`https://api.giphy.com/v1/gifs/translate?api_key=E2ET6vZ00hUX8Go2d6mucfSJ6r6DvDXU&s=${searchTerm}`, { mode: "cors"})
        .then(function(response) {

            if (!response.ok)
            {
                throw new Error(`Network response was not ok; Status: ${response.status}`);
            }
            return response.json();
        })
        .then(function(response) {
            img.src = (response.data.images.original.url);
        })
        .catch(function (error) {
            console.error('Error during fetch:', error);
        })
        
    }

// New function using async/await
    async function getImage(searchTerm){

        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=E2ET6vZ00hUX8Go2d6mucfSJ6r6DvDXU&s=${searchTerm}`, { mode: "cors"});
            
            if (!response.ok){
                throw new Error(`Network response was not ok; Status: ${response.status}`);
            }

            const responseData = await response.json();
            img.src = (responseData.data.images.original.url);

        } catch (error) {
            console.error('Error during fetch:', error);
        }
        
        

    }

    regenButton.addEventListener('click', () => {
        if (tmpSearchTerm !== "")
        {
            getImage(tmpSearchTerm);
        }
        else
        {
            getImage("nothing");
        }
        
    });

    searchInput.addEventListener('input', () =>{
        tmpSearchTerm = searchInput.value;
        searchInputDisplay.textContent = tmpSearchTerm;
        
        
    });

    searchSubmit.addEventListener('click', () => {

        
        {
            tmpSearchTerm = tmpSearchTerm.toLowerCase();
            console.log(tmpSearchTerm);
            getImage(tmpSearchTerm);
            searchInput.value = "";
     
        }
   });