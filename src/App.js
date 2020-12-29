import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { compose } from 'ramda';
import detectBrowserLanguage from 'detect-browser-language'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      charCount: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      lang: "Shows Browser's Language"
    };
  }

  removeBreaks = arr => {
    const index = arr.findIndex(el => el.match(/\r?\n|\r/g));
    if (index === -1)
      return arr;
    const newArray = [
      ...arr.slice(0, index),
      ...arr[index].split(/\r?\n|\r/),
      ...arr.slice(index + 1, arr.length)
    ];
    return this.removeBreaks(newArray);
  }


  removeEmptyElements = arr => {
    const index = arr.findIndex(el => el.trim() === '');
    if (index === -1)
      return arr;
    arr.splice(index, 1);
    return this.removeEmptyElements(arr)
  };

  reSet(value) {
    const trimmedValue = value.trim();
    const words = compose(this.removeEmptyElements, this.removeBreaks)(trimmedValue.split(' '));
    const sentences = compose(this.removeEmptyElements, this.removeBreaks)(trimmedValue.split('.'));
    const paragraphs = this.removeEmptyElements(trimmedValue.split(/\r?\n|\r/));
    this.setState({
      text: value,
      charCount: trimmedValue.length,
      wordCount: value === '' ? 0 : words.length,
      sentenceCount: value === '' ? 0 : sentences.length,
      paragraphCount: value === '' ? 0 : paragraphs.length,
      lang: value === '' ? 'unknown' : detectBrowserLanguage()
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          Word Counter
          </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea rows="10" cols="30" className="form-control" type="file" name="json" id=""
              placeholder='Type or paste...'
              onChange={event => this.reSet(event.target.value)}
              required></textarea>
          </div>
        </form>

        <nav class="navbar navbar-expand navbar-dark bg-dark">
          <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" >Language: {this.state.lang}</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" >Characters: {this.state.charCount}</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" >Words: {this.state.wordCount}</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link">Sentences:  {this.state.sentenceCount}</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" >Paragraphs: {this.state.paragraphCount}</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="mt-3">
          <p class="col-xs-12" className="text-center text-muted" >© Copyright SekharTech 2020 Word Counter</p>
        </div>

      </div>
    );
  }
}



