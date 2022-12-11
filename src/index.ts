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
type BoardValue = -1 | 1 | 0
type WinLoseTie = -1 | 1 | 'T' | null
type Turn = -1 | 1 //Player O is -1 and Player X is 1

//Variables========================================================
let board: BoardValue [] =[
  -1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]

let turn: Turn
let winner: WinLoseTie = null
let finalCombo: number //the actual winning combination at end of game
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
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]
  turn = 1
  winner = null
  finalCombo = -1
  console.log(board)
  render()
}

function handleClickBoard(sqIdx:number){
  if (board[sqIdx]!==0) return //ignore clicks on occupied squares
  board[sqIdx] = turn //set the board position according to the current player turn
  turn *= -1
  getWinner()
  render()
}

function render(){
  board.forEach(function (element, idx){
    const squareEl = squareEls?.children[idx]
    if (squareEl && element !== 0)
      squareEl.textContent = element === 1 ? 'X' : 'O'
    else if (squareEl)
      squareEl.textContent = ''
      squareEl?.classList.remove('winner')
  })
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
  if (finalCombo !== -1) renderFinal()
}

function getWinner(){// checks for a winning combination on each move and sets the winner 
  
  let i:number = 0
  for (let combo of winningCombos){
    let total:number = board[combo[0]]+board[combo[1]]+board[combo[2]]
    if (total === -3) winner = -1
    if (total === 3) winner = 1   
    if (winner !== null) {
      finalCombo = i
      return
    }
    i++
  }
  winner = board.includes(0)? winner : 'T' //when no more empty spaces and no winner, declare a tie
}

function renderFinal(){//called by the main render function if there is a winner to style the board in a winner state
  for (let boardIdx of winningCombos[finalCombo]){
    const squareEl = document.getElementById(`sq${boardIdx}`)
    squareEl?.classList.add('winner')
  }
}

export{}