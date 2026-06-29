const urlInput = document.querySelector('#url-input');
const shortenBtn = document.querySelector('#shorten-btn');
const result = document.querySelector('.result');
const shortenedLink = document.querySelector("#shortenedUrl-link");
const copyBtn = document.querySelector("#copy-btn");



async function shortenUrl(longUrl){
    const apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(longUrl)

    try{
        const response = await fetch(apiUrl);

        if(!response.ok) {
           throw new Error('Invalid URL');
        }

        const shortUrl = await response.text();
        return shortUrl;
    }catch(error){
        console.error("Failed to fetch data:", error.message);
    }
    
}

async function copyText(text) {
    try{
        await navigator.clipboard.writeText(text);
    }catch(error){
        console.error('Failed to copy text: ', err);
    }
}

async function renderUi(){
    const link = await shortenUrl(urlInput.value);

    if(link){
        urlInput.value = "";

        result.style.display = 'flex';
        shortenedLink.href = link;
        shortenedLink.textContent = link;

        copyBtn.addEventListener('click', () => {
            copyText(link);

            copyBtn.innerHTML = 'Copied!';

            setTimeout(() => {
                copyBtn.innerHTML = '<img src="assets/copy.png" alt="copy-icon">';
            }, 200)
        })

    }
    else{
        alert('please enter a valid URL');
        urlInput.value = "";
    }
    
}

shortenBtn.addEventListener('click', ()  => {
    if(!urlInput.value) return;
    renderUi();
})

