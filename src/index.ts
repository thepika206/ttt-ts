// console.log('hello')

//Constants========================================================
const winningCombos: number[][] = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2],
]

// type BoardArray = [number, ...board(number | null)[]]
type NullNum = -1 | 1 | null
type WinLoseTie = -1 | 1 | 'T' | null
type Turn = -1 | 1 //Player O is -1 and Player X is 1

//Variables========================================================
let board: NullNum [] =[
  -1,
  1,
  null,
  null,
  null,
  null,
  null,
  null,
  null
]

let turn: Turn
let winner: WinLoseTie = null
let finalCombo: NullNum
//Cached Element References========================================
const messageEl = document.querySelector<HTMLElement>('#message')
const resetBtn = document.querySelector<HTMLButtonElement>('#reset')
const squareEls = document.querySelector<HTMLElement>('main.board')
//Event Listeners==================================================
squareEls?.addEventListener('click', function(evt){
  const move = (evt.target as HTMLElement).id
  if (!winner && move) {
    let sqIdx:number = parseInt(move.charAt(2))
    handleClickBoard(sqIdx)
  }

})
resetBtn?.addEventListener('click', init)

//Functions========================================================
init()
function init (){
  board = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  turn = 1
  winner = null
  finalCombo = null
  console.log(board)
  render()
}

function handleClickBoard(sqIdx:number){
  if (board[sqIdx]!==null) return //ignore clicks on occupied squares
  console.log(sqIdx)
  board[sqIdx] = turn //set the board position according to the current player turn
  turn *= -1
  console.log('board',board, 'turn', turn)
  render()
}

function render(){
  renderMessage()
}

function renderMessage(){
  let messageText =''
  if (winner === 'T') {
    messageText = `No empty spaces remain, looks like a tie game`
  } else if (winner === null) {
    let player = turn === -1 ? 'O' : 'X' 
    messageText = `It's player ${player}'s turn: click any open space` 
  } else {
    let winningPlayer = winner -1 ? 'O' : 'X' 
    messageText = `The winner is ${winningPlayer}!!`
  } 
  if (messageEl) messageEl.textContent = messageText
  // if (finalCombo !== null) renderFinal()
}

export{}