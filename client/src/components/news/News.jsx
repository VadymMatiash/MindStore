import React, { Component } from 'react';
import Article from './Article';
import ArticleDesc from './ArticleDesc';

import './News.css';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      position: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e){
    let pos = e.target.innerHTML * 5;

    this.setState({position: pos});
  }

  componentDidMount() {

    let time = 5000;

    let rec = ()=>{
      console.log(time);
      fetch('/api/articles')
      .then((response) => {

          return response.json();
        })
        .then((data) => {
        this.setState({articles: data});

        })
        .catch((err)=>{
          console.log(err);
          time = time*2;
          if(time > 360000){
            return;
          }
          setTimeout(rec, time);
        });
    }

    rec();

      //<Article id = {elem.id} title = {elem.title} text = {elem.text} key = {elem.id} tests = {elem.tests} tags = {elem.tags}/>

  };

  render() {
    
    let arr = this.state.articles.map((elem, i) =>{
      return (
        
        <ArticleDesc id = {elem._id} title = {elem.title} key = {elem.id} tags = {elem.tags} text={elem.text}/>
      );
    });

    let pages = Math.ceil(arr.length/5)

    let generatePages = () => {
     
      let arrPages = [];
      let i = 1;
      while(i < pages+1){
        arrPages.push((<div onClick = {this.handleClick} key = {i} className = "page gradient">{i}</div>));
        i++;
      }
      return arrPages;
    }
    
    return (

        <div>
          <div>Total articles: {arr.length} </div>
          <div className = "pagesContainer">{generatePages()}</div>

          <div className="news">
            
            {arr.length? arr.splice(this.state.position, 5):"Loading..."}
            
          </div>
        </div>

    );
  }
}

export default News;