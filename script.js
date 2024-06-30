const API_KEY = "096de9d86b7a42c8a867b4f0802ebdd3";
const url = "https://newsapi.org/v2/everything?q=";

const refresh = document.getElementById('company-logo');
refresh.addEventListener('click', ()=>{
    window.location.reload();
})

window.addEventListener('load', ()=>fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML ="";


/*
why we our clearing the innerHTMl = "";

When working with APIs in JavaScript, it is common to bind the retrieved data to the HTML elements dynamically. The process typically involves fetching data from the API, processing it, and updating the HTML content with the new data.

Emptying the `innerHTML` before binding the data serves two primary purposes:

1. **Clearing the existing content**: When you fetch new data from an API, you want to replace the existing content in your HTML elements with the updated information. By emptying the `innerHTML` before binding the data, you ensure that any previous content is removed, preventing it from mixing or conflicting with the new data.

2. **Preventing data duplication**: If you don't clear the `innerHTML`, the new data will be appended to the existing content, resulting in duplication. For example, if you retrieve data from the API multiple times without clearing the `innerHTML`, the content will keep adding up instead of being replaced. This can lead to incorrect or confusing information displayed to the user.

By emptying the `innerHTML` before binding the data, you create a clean slate for the updated content to be inserted into the HTML elements, ensuring that only the most recent data is displayed correctly.
 */

    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
    // used for deep cloning ki jitna bhi data hai na humara template-news-card mein wo sara ka sara data clone krna hai

    /*

   """""""""" const cardClone = newsCardTemplate.content.cloneNode(true);""""""""""

    Here, `newsCardTemplate` seems to be a template element, possibly defined earlier in the code. The `content` property of a template element refers to the content within the `<template>` tags. In this case, it is likely that the template contains the structure for a news card.

The `cloneNode()` method is called on the `content` property, which creates a duplicate or clone of the content. The parameter `true` passed to `cloneNode()` indicates that the clone should include all child elements and their descendants.

The resulting clone, stored in the `cardClone` variable, will be an identical copy of the content within the `newsCardTemplate` template element.

By creating a clone of the template, you can dynamically generate new instances of the news card structure for each news item you fetch from the API. This allows you to generate multiple cards with the same structure but different content, such as headlines, descriptions, and images, based on the data obtained from the API.

You can then manipulate and populate the cloned card with the specific data for each news item before appending it to the DOM, thus creating a news card for each item obtained from the API.

    */
    fillDataInCard(cardClone, article);    
    cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} 🌐${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    else{
    fetchNews(query);
    curSelectedNav.classList.remove('active');
    curSelectedNav = null;
    }
})

// dark-light-mode script

// const toggle = document.getElementsByClassName('check')[0];
// toggle.addEventListener('click', ()=>{
//     toggle.classList.toggle('dark-light-mode');
// })


 