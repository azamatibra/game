let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time")
let $result = document.querySelector("#result")
let $timeHeader = document.querySelector("#time-header")
let $resultHeader = document.querySelector("#result-header")
let $gameTime = document.querySelector("#game-time")
let score = 0;
let isGameStarted = false;
let colors = ["red","blue","green","#ccc","purple","yellow"]

for (var i = 0; i < colors.length; i++) {
	console.log(Math.random(colors[i]))
}
function show($el) {
	$el.classList.remove("hide")
}

function hide($el) {
	$el.classList.add("hide")
}


$gameTime.addEventListener("input", setGameTime)
$game.addEventListener("click", handleBoxClick)

$start.addEventListener("click", game => {
	isGameStarted = true;
	score = 0;
	$gameTime.setAttribute("disabled", "true")
	setGameTime()
	let interval = setInterval(function(){
		let time = parseFloat($time.textContent) 
		if (time <= 0) {
			clearInterval(interval)
			endGame()
		}else{
			$time.textContent = (time - 1).toFixed(1)
		}
	}, 1000)
	$game.style.backgroundColor = '#fff'
	hide($start)
	renderBox();
})
function endGame() {
	$gameTime.removeAttribute("disabled")
	isGameStarted = false;
	show($start)
	$game.innerHTML = ""
	$game.style.background = '#ccc'
	hide($timeHeader)
	show($resultHeader)
	result()
}

function handleBoxClick(event) {
	if (!isGameStarted) {
		return
	}
	if (event.target.dataset.box) {
		renderBox()
		score++;
	}
}

function setGameTime() {
	let time = +$gameTime.value;
	$time.textContent = time.toFixed(1)
	show($timeHeader)
	hide($resultHeader)

}
function result() {
	$result.textContent = score.toString()
}
function renderBox() {	
	$game.innerHTML = "";
	let boxSize = getRandom(30, 100);
	let box = document.createElement("div")
	let gameSize = $game.getBoundingClientRect()
	let maxTop = gameSize.height - boxSize  
	let maxLeft = gameSize.width - boxSize  
	let randomColors = getRandom(0, colors.length)

	console.log(gameSize)
	box.style.height = box.style.width = boxSize +'px'
	box.style.backgroundColor = colors[randomColors]
	box.style.position = 'absolute'
	box.style.top = getRandom(0, maxTop ) + "px"
	box.style.left = getRandom(0, maxLeft ) + "px"
	box.style.cursor = "pointer"
	box.setAttribute("data-box", "true")
	$game.insertAdjacentElement("afterbegin", box)
}


function getRandom(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}























