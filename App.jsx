
import React from 'react';
import {languages} from "./lan.js"
import {clsx} from 'clsx';
import {getFarewellText} from './utilis.js'
export default function AssemblyEndgame(){
const [currentWord,setcurrentWord]=React.useState("react")
const [guessedLetters,setGuessedLetters]=React.useState([])

const wrongguessedCount =guessedLetters.filter(letter => !currentWord.includes(letter)).length
const isGameWon=currentWord.split("").every(letter => guessedLetters.includes(letter))
const isGameLost=wrongguessedCount >= languages.length-1
const isGameOver=isGameWon || isGameLost
const lastGuessedLetter=guessedLetters[guessedLetters.length-1]
const isLastGuessIncorrect=lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
const alphabet="abcdefghijklmnopqrstuvwxyz"
function addGuessedLetter(letter){
    setGuessedLetters(prevLetters => 
        prevLetters.includes(letter)?
        prevLetters : [...prevLetters,letter])
}
    const lanEle=languages.map((lang,index)=> {
        const isLanguageLost=index < wrongguessedCount
        const styles={
            backgroundColor:lang.backgroundColor,
            color:lang.color
        }
        const Name=clsx("chip",isLanguageLost && "lost")
        return(
    
        <span 
        className={Name} 
        key={lang.game} 
        style={styles}
        >{lang.game}</span>
        )
    })

    const letterEle=currentWord.split("").map((letter,index) => (
        <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
    ))
    const keyBoardElements=alphabet.split("").map(letter => {
        const isGuessed=guessedLetters.includes(letter);
        const isCorrect=isGuessed && currentWord.includes(letter);
        const isWrong=isGuessed && !currentWord.includes(letter);
        const className=clsx({
            correct:isCorrect,
            wrong:isWrong
        });
        return(
        <button 
        className={className}
        onClick={() => addGuessedLetter(letter)}
         key={letter}>{letter.toUpperCase()}</button>
        )
})
const gameStatusClass= clsx("game-status",{
    won:isGameWon,
    lost:isGameLost,
    farewell:!isGameOver && isLastGuessIncorrect
})
function renderGameStatus(){
    if(!isGameOver && isLastGuessIncorrect){
        return (
            <p className="farewell">{getFarewellText(languages[wrongguessedCount - 1].name)}</p>
        )
    }
    if(isGameWon){
        return(
 <>
                <h2>You win!</h2>
                <p>Well done!🎉</p>
                </>
        )
    }
    if(isGameLost){
        return(
 <>
        <h2>Game Over!</h2>
                <p>You Lost! Better start Learning Assembly</p>
                </>
        )
    }
}
    return(
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
               {renderGameStatus}
            </section>
            <section className="lan-chips">
                {lanEle}
            </section>
            <section className="word">
  {letterEle}
            </section>
            <section className="keyboard">
                {keyBoardElements}
            </section>
            <section>
                {isGameOver && <button className="newgame">New Game</button>}
            </section>
        </main>
    )
}