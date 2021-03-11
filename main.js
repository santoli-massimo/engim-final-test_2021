let pageLinks = document.querySelectorAll('.page-link')
let pages = document.querySelectorAll('.page')

for(let pageLink of pageLinks){
    pageLink.addEventListener('click', function (e){
        for(let page of pages){ page.style.display = 'none' }
        let pageName = e.target.dataset.page
        let nextPage = document.getElementById(pageName)
        if(nextPage){
            nextPage.style.display = 'block'
        }
    })
}









