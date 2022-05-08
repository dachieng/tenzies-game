import React from "react";
import Dice from "./components/Dice";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

/** initialize the Dice component with random numbers from the array ie call addNewDice() */
let [dice, setDice] = React.useState(addNewDice())

/** state to determine if the user has won or not */
let [tenzies, setTenzies] = React.useState(false)



/** create a function to generate a die */
function generateDie(){
  return {
    value: Math.ceil(Math.random() * 6), 
    isHeld: false,
    id:nanoid()
  }
}

/** Generate an array of length 10 with an object of random numbers between 1 and 6 inclusive  and an isHeld property*/
function addNewDice(){
  const newDice = []
  for (let i = 0; i < 10; i++) {
    newDice.push(generateDie())
  } 
  return newDice

}


/** roll new dice buuton 
 * only roll the ones with isHeld=false
*/

function rollDice(){
 if(!tenzies){
  setDice(prev => {
    return prev.map(die => {
      return die.isHeld ? die : generateDie()
    })
  })
 }else{
   setTenzies(false)
   setDice(addNewDice())
 }
}

/** function to flip isHeld property */
function holdDice(id){
  setDice(prev => {
    return prev.map(die => {
      return die.id === id ? {...die, isHeld:!die.isHeld} : die
    })
  })
}


/** end game if all dice have the same value and isHeld = True */

React.useEffect(()=>{
  let allHeld = dice.every(die => die.isHeld)
  let firstVal = dice[0].value
  let allValuesHeld = dice.every(die => die.value === firstVal)

  if(allHeld && allValuesHeld){
    setTenzies(true)
    console.log("You Won")
  }
}, [dice])

const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld} handleisHeld={() => holdDice(die.id)}/>)

console.log(addNewDice())
  return (
  
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
                {diceElements} 
        </div> 
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        
    </main>
    
  
  );
}

export default App;
