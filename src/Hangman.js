import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
        className="Hangman-ltr-buttons"
      >
        {ltr}
      </button>
    ));
  }

  reset() {
    this.setState(st => {
      return { nWrong: 0, guessed: new Set(), answer: randomWord()}
    })
  }

  displayWin() {
    const isWin = this.guessedWord().join('') === this.state.answer
    const winMsg = isWin ? <h1>You Win!</h1> : <h1>&nbsp;</h1>
    return winMsg
  }

  render() {
    const gameOn = this.state.nWrong < this.props.maxWrong
    return (
      <div className='Hangman'>
        <div>
          <h1>Hangman</h1>
          <img 
            src={(this.state.nWrong <= this.props.maxWrong) 
              ? this.props.images[this.state.nWrong] 
              : this.props.images[this.props.maxWrong]} 
            alt={this.state.nWrong + ' wrong guesses'}
          />
        </div>
        <div>
          <div>{this.displayWin()}</div>
          <h2>Wrong guesses: {this.state.nWrong}</h2>
          <p className='Hangman-word'>
            {(gameOn) ? this.guessedWord() : this.state.answer}
          </p>
          <p className='Hangman-btns'>
            {(gameOn) ? this.generateButtons() : <h2>You loose</h2>}
          </p>
          <div>
            <button className='Hangman-reset' onClick={this.reset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
