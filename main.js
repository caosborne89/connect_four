function buildBoard() {
    let board = document.getElementById("board")
    let first_row = document.getElementById("first-row")

    for(let i = 0; i < 7; i++) {
        let space = document.createElement("div")
        space.classList.add("first-row-board-space")
        space.setAttribute('data-row', `${i}`)
        space.setAttribute('onclick', "moveChecker(this)")
        first_row.appendChild(space)
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

function moveChecker(element) {
    let curr_user = document.getElementById("user-turn").getAttribute("data-curr-user")

    row = element.getAttribute('data-row')

    let request = new XMLHttpRequest();
    let params = "row=" + element.getAttribute("data-row") + "&curr_user=" + curr_user
    console.log(params)

    request.open("GET", "http://localhost:8000/cgi-bin/app.py?" + params);
    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status == 200) {
            let data = request.responseText;
            console.log(data)
          } else {
            console.log("Can't reach server")
          }
        }
      };
}

window.onload = function() {
    buildBoard()
};