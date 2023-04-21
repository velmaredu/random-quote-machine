import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import quotes from "../utils/quotes";

class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: quotes[0],
      darkMode: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ darkMode: !this.state.darkMode });
  }

  returnQuote() {
    let key = Math.floor(Math.random() * (quotes.length - 1));
    return quotes[key];
  }

  handleClick() {
    const randomQuote = this.returnQuote();
    this.setState({
      quote: randomQuote,
    });
  }

  randomColor() {
    const color = `rgb(
        ${Math.floor(Math.random() * 155)},
        ${Math.floor(Math.random() * 155)},
        ${Math.floor(Math.random() * 155)})`;
    return color;
  }

  render() {
    let modeClass = this.state.darkMode ? "dark-mode" : "light-mode";
    let checked = this.state.darkMode ? "checked" : "unchecked";

    return (
      <>
        <nav className={`${modeClass}`}>
        <h1 className={`title ${modeClass}`}>Random Quote Machine</h1>
          <label className="checkbox">
            <input
              type="checkbox"
              defaultChecked={checked}
              onChange={this.handleChange}
            />
            Dark Mode
          </label>
        </nav>
        <section>
          <div className={`box content ${modeClass}`} id="quote-box">
            <QuoteChild
              displayColor={this.randomColor}
              handleClick={this.handleClick}
              {...this.state}
            />
          </div>
        </section>
      </>
    );
  }
}

class QuoteChild extends React.Component {
  createTweetLink() {
    let ahref = ["https://twitter.com/intent/tweet?text=", this.props.quote];
    return ahref.join("");
  }
  render() {
    const randomColor = this.props.displayColor();
    const html = document.documentElement;
    html.style.backgroundColor = randomColor;
    return (
      <div>
        <h3 id="text">"{this.props.quote[0]}"</h3>
        <h5 id="author">
          -{this.props.quote[1] ? this.props.quote[1] : "Unknown"}-
        </h5>
        <div className="button-group">
          <button id="new-quote" onClick={this.props.handleClick}>
            new quote
          </button>
          <a
            href={this.createTweetLink()}
            target="_blank"
            rel="noreferrer"
            id="tweet-quote"
          >
            Tweet Quote <FontAwesomeIcon icon={faTwitter} style={{ color: '#007bff' }} />
          </a>
        </div>
      </div>
    );
  }
}

export default RandomQuoteMachine;
