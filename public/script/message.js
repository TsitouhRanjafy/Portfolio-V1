const affichageConteneur = document.getElementById("affiche-conteneur");
const listConteneur = document.getElementById("list")
const titleVide = document.getElementById("vide")

let affiche = (elementParent) =>{
    let email = elementParent.children[0].textContent
    let name = elementParent.children[1].textContent
    let tel = elementParent.children[2].textContent
    let message = elementParent.children[3].textContent
    titleVide.classList.add('cacher')
    affichageConteneur.classList.remove('cacher')

    affichageConteneur.children[1].value = email
    affichageConteneur.children[3].value = name
    affichageConteneur.children[5].value = tel
    affichageConteneur.children[7].value = message
}


let id,email;
let nom = 'unknow',tel,message = ' .... ';

let htmlList = ``;
let html = ``;
fetch('/postMessage')
.then((res) => res.json())
.then((data) => {
    data.forEach((objet,index) => {
        email = objet.email;
        nom = objet.name;
        tel = objet.tel;
        message = objet.message
        html = `
            <div class="message ms${id}" id="ms${id}" onclick="affiche(this)">
                <span>${email}</span>
                <h3>${nom}</h3>
                <span>${tel}</span>
                <p class="preview">${message}</p>
            </div>
        `
        htmlList += html;
    });
    // console.log(htmlList)
    listConteneur.innerHTML = htmlList
})


