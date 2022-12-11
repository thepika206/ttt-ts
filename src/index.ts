console.log('hello')

//Constants========================================================
const winningCombos: Number[][] = [
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
type nullNum = number | null
type winLoseTie = number | 'T' | null

//Variables========================================================
let board: nullNum [] =[
  0,
  1,
  null,
  null,
  null,
  null,
  null,
  null,
  null
]

let turn: nullNum = 0
let winner: winLoseTie = null
let finalCombo: Number[]
//Cached Element References========================================
//Event Listeners==================================================
//Functions========================================================
