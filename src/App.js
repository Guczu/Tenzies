import React from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
    const [randomNumbers, setRandomNumbers] = React.useState(allNewDice)
    const [tenzies, setTenzies] = React.useState(false)
    const [points, setPoints] = React.useState(0)

    React.useEffect(()=>{
        const number = randomNumbers[0]
        let gameover = true
        for(let i=0; i<randomNumbers.length; i++) {
            let die = randomNumbers[i]
            if(!gameover) {
                break
            }
            die.value === number.value && die.isHeld ? gameover = true : gameover = false
        }
        gameover ? setTenzies(true) : setTenzies(false)
    },[randomNumbers])

    function allNewDice() {
        const arr = [];
        for(let i=0; i<10; i++) {
            let number = Math.floor(Math.random() * 6 + 1);
            arr.push({id: nanoid(), value: number, isHeld: false});
        }
        return arr;
    }

    function newGame() {
        setRandomNumbers(allNewDice)
        setTenzies(false)
        setPoints(0)
    }

    function swapNumbers() {
        addPoint()
        tenzies && newGame()
        setRandomNumbers( oldNumbers => {
            return oldNumbers.map( oldNumber => {
                if(oldNumber.isHeld) {
                    return {
                        ...oldNumber
                    }
                }
                else {
                    return {
                        id: nanoid(),
                        value: Math.floor(Math.random() * 6 + 1),
                        isHeld: false
                    }
                }
            })
        })
    }

    function holdDice(id) {
        setRandomNumbers( oldNumbers => {
            return oldNumbers.map(oldNumber => {
                if(oldNumber.id === id) {
                    return {
                        ...oldNumber,
                        isHeld: !oldNumber.isHeld
                    }
                }
                else {
                    return {
                        ...oldNumber
                    }
                }
            })
        })
    }

    function addPoint() {
        setPoints( oldPoints => {
            return oldPoints + 1;
        })
    }

    const dieElements = randomNumbers.map(prevRand => (
        <Die
            key={prevRand.id}
            id={prevRand.id}
            value={prevRand.value}
            isHeld={prevRand.isHeld}
            holdDice={holdDice}
        />
    ))

    return (
        <main className="app--main">
            {tenzies && <Confetti />}
            <div className="app--tenzies">
                <p className="app--title">TENZIES</p>
                <div className="app--description">
                    <p className="app--text">
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </p>
                </div>
                <div className="app--dies">
                    {dieElements}
                </div>
                <button className="app--roll" onClick={swapNumbers}>
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <p className="app--points">ROLLS: {points}</p>
            </div>
        </main>
    )
}