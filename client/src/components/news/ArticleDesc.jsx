import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Article from './Article';

class ArticleDesc extends Component{

  	constructor(props) {
    	super(props);
    	this.handleClick = this.handleClick.bind(this);
    }

	handleClick(){
		let id = this.props.id;
  		let str = "/news/"+id;
	}

  	render() {

  		let id = this.props.id;
  		let str = "/news/"+id;

	    return (
	        <div className="article">
	        	<h3>{this.props.title}</h3>

	        	<button onClick = {this.handleClick}>BTN</button>
	        	<Link className="nav-link" to= {str}>
            		Read more
          		</Link>
	        </div>

	    );
  }
}

export default ArticleDesc;