window.addEventListener("DOMContentLoaded", function(event){

var par = document.getElementById("img")
console.log(par)


let seasons= [
  "https://www.zooplus.it/magazine/wp-content/uploads/2020/02/1-768x512.jpg",
    "https://www.larcadinoepetshop.it/wp-content/uploads/2019/03/articolo-gatto.jpg",
    "https://www.zoomiguana.com/wp-content/uploads/2018/08/gatto06.jpg"
]


let i=1

setInterval(function(){

    img.src = seasons[i]
   if(i == seasons.lenght-1){
       i=0
    } else {
        i++
   }
    
}, 1000)

});