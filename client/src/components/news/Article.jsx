import React, { Component } from 'react';

class Article extends Component {
  render() {
    return (
        <div className="article">
        	<h3>{this.props.name}</h3>
        	<div>{this.props.content}</div>
        </div>

    );
  }
}

export default Article;