const accessKey = "CGND2nYpvXhpvimG2BZlt7Ghu3TFCILgFbrzWhX7WMs"
const searchForm = document.querySelector("#search-form")
const searchBox = document.querySelector("#search-box")
const searchResult= document.querySelector("#search-result")
const showMoreBtn = document.querySelector("#show-more-btn")

let keyword = "";
let page = 1;
async function searchImages(){
    keyword = searchBox.value;
    const url =  `https://api.unsplash.com/search/photos?page= ${page} &query=${keyword}&client_id=${accessKey}&per_page=12` // hr ek page me 12 img aayegi

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){  // page 1 h ya nhi pehle check krege(ek cheej search krne ke bad jaise hi dusra kuch search kre to dusre page pr na aaye  pehle wala ht jaye )
        searchResult.innerHTML = "";
    }

   // console.log(data);
   const results = data.results;

   results.map((result)=>{
   const image = document.createElement("img")
     image.src = result.urls.small // data.json(console se)

     const imageLink = document.createElement("a");
     imageLink.href = result.links.html
     imageLink.target = "_blank" // image dusre tab me open ho
    
        imageLink.appendChild(image); //img tag ko imagelink ke andr
        searchResult.appendChild(imageLink) // imgLink ko searchRes ke andr

        showMoreBtn.style.display = "block"
   })
}

searchForm.addEventListener("submit",  (e)=> {
e.preventDefault();
page = 1; // jb v koi nya keyword add krege to page 1 hi ho jayega
searchImages()
})

showMoreBtn.addEventListener("click" , ()=> {
  page++ ;  //jaise showMore btn pr click kre to increse the value in page or imges load ho jaye
  searchImages();
})