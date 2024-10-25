function buildBoard() {
    let board = document.getElementById("board")
    let firstRow = document.getElementById("first-row")

    for(let i = 0; i < 7; i++) {
        let space = document.createElement("div")
        space.classList.add("first-row-board-space", "red-turn")
        space.setAttribute('data-row', `${i}`)
        space.setAttribute('onclick', "moveChecker(this)")
        firstRow.appendChild(space)
    }

    for(let i = 0; i < 7; i++) {
        let column = document.createElement("div")
        column.classList.add("board-column")
        for(let j = 0; j < 6; j++) {
            let space = document.createElement("div")
            space.classList.add("board-space")
            space.setAttribute('data-row', `${j}`)
            space.setAttribute('data-col', `${i}`)
            column.appendChild(space)
        }
        board.appendChild(column)
    }
}

function changeUser(nextUser) {
  let userTurnElement = document.getElementById("user-turn")
  userTurnElement.setAttribute('data-curr-user', nextUser)

  let topRowElements = Array.prototype.slice.call(document.getElementsByClassName("first-row-board-space"))
  
  if(nextUser == "black") {
    topRowElements.forEach((element) => {
      element.classList.remove("red-turn")
      element.classList.add("black-turn")
    })
  } else {
    topRowElements.forEach((element) => {
      element.classList.remove("black-turn")
      element.classList.add("red-turn")
    })
  }

}

function moveChecker(element) {
    let currUser = document.getElementById("user-turn").getAttribute("data-curr-user")

    row = element.getAttribute('data-row')

    let request = new XMLHttpRequest();
    let params = "row=" + element.getAttribute("data-row") + "&curr_user=" + currUser
    console.log(params)

    request.open("GET", "http://localhost:8000/cgi-bin/app.py?" + params)
    request.send()

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status == 200) {
            let data = request.responseText
            let turn = JSON.parse(data)
            changeUser(turn.nextUser)
          } else {
            console.log("Can't reach server")
          }
        }
      };
}

window.onload = function() {
    buildBoard()
};