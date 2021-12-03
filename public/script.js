// Main function
async function start() {
	let casa = sessionStorage.getItem("house")

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

	const character = await getCharacter(casa)
	showCharacter(character)
}

// Minor functions
async function getCharacter(casa) {
	try{
		const response = await fetch(casa)
		const lista = await response.json()
		return lista
	}
	catch(error){	
		throw new Error(error.message) 
	}
}

function showCharacter(character) {
	let image = document.querySelector("[data-img]")
	let name = document.querySelector("[data-name]")
	let casa = document.querySelector("[data-casa]")
	let dateOfBirth = document.querySelector("[data-birth]")
	image.src = character.image
	name.innerHTML = character.name
	casa.innerHTML = character.house
	dateOfBirth.innerHTML = character.dateOfBirth
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