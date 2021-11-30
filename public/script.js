// Main function
async function start() {
	let casa = sessionStorage.getItem("house")

	let historico = localStorage.getItem("historico")
	if (historico == null) {
		historico = localStorage.setItem("historico", JSON.stringify([]))
	}

	if(casa == null) {
		casa = "gryffindor"
	}

	else if(casa == "slytherin") {
		slythTheme()
	}

	else if(casa == "ravenclaw") {
		ravenTheme()
	}

	else if(casa == "hufflepuff") {
		huffTheme()
	}

	const lista = await getLista(casa)

	while(true) {
		let random = getRandomInt(0, 10)
		await new Promise(resolve => setTimeout(() => resolve(showCharacter(lista, random)), 3000))
	}
}

// Minor functions
async function getLista(casa) {
	try{
		// Consumindo back-end no front-end
		// const response = await fetch(`http://localhost:3000/${casa}`)
		const response = await fetch(`https://hp-api.herokuapp.com/api/characters/house/${casa}`)
		const lista = await response.json()
		return lista
	}
	catch(error){	
		throw new Error(error.message) 
	}
}

function showCharacter(lista, index) {
	let character = lista[index]
	let image = document.querySelector("[data-img]")
	let name = document.querySelector("[data-name]")
	let casa = document.querySelector("[data-casa]")
	let dateOfBirth = document.querySelector("[data-birth]")
	image.src = character.image
	name.innerHTML = character.name
	casa.innerHTML = character.house
	dateOfBirth.innerHTML = character.dateOfBirth

	// Definindo o personagem no escopo global
	adicionado = character
}

var adicionado
async function adicionar() {
	let dados = localStorage.getItem("historico")
	let historico =  JSON.parse(dados)

	historico.push(adicionado)
	console.log(adicionado)
	console.log(historico)
	sessionStorage.setItem("historico", historico)
	alert("Personagem adicionado!")
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function setHouse(house) {
	sessionStorage.setItem("house", house)
	document.location.reload()
}

// Theme functions
function gryffTheme()
{
	let mainBox = document.querySelector(".main")
	let optionsBox = document.querySelector(".options-box")
	
	mainBox.style.background= "#AE0001"
	optionsBox.style.background = "#EEBA30"
}

function slythTheme()
{
	let mainBox = document.querySelector(".main")
	let optionsBox = document.querySelector(".options-box")
	
	mainBox.style.background= "#2A623D"
	optionsBox.style.background = "#AAAAAA"
}

function ravenTheme()
{
	let mainBox = document.querySelector(".main")
	let optionsBox = document.querySelector(".options-box")
	
	mainBox.style.background= "#222F5B"
	optionsBox.style.background = "#5D5D5D"
}

function huffTheme()
{
	let mainBox = document.querySelector(".main")
	let optionsBox = document.querySelector(".options-box")
	let textBox = document.querySelector(".text-box")
	
	mainBox.style.background= "#FFED86"
	optionsBox.style.background = "#60605C"
	textBox.style.color = "black"
}


// Start
window.onload = start()