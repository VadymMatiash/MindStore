import React, { Component } from 'react';
import Article from './Article';

import './News.css';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    fetch('http://5be832ae8d650800131e2759.mockapi.io/articles')
    .then((response) => {

        return response.json();
      })
      .then((user) => {
      this.setState({articles: user});

      })
      .catch("Fail");

    };

  kek(){}

  render() {
    let arr = this.state.articles.map((elem, i) =>{
      return (
        <Article id = {elem.id} name = {elem.name} content = {elem.content} key = {elem.id}/>
      );
    });
    
    return (
        <div className="news">
          {arr.length? arr:0}
        </div>

    );
  }
}

export default News;