import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {

	constructor(){
		super();

		this.state = {
			article: {},
			prevAnswers: {},
			correctAnswers: {},
		};

		this.sendTests = this.sendTests.bind(this);
	}

	displayTags(){
		const arr = this.state.article.tags.map((item, index) =>{
			return (<div key = {`tags${index}`} className = "tags">{item}</div>)
		});

		return arr;
	}

/*	setClass(text, id){
		let prevAnswers = this.state.prevAnswers;
  		let correctAnswers = this.state.correctAnswers.correctAnswers;

  		let arr1 = prevAnswers[prevAnswers.indexOf(item => item._id === id)];
  		let arr2 = correctAnswers.find(item=> item._id === id);
  		console.log(arr1);
	}*/

	componentDidMount(){
		let id = this.props.match.params.id;
		console.log('/api/articles' + id);
		fetch('/api/articles/'+id)
    		.then((response) => {

        	return response.json();
      	})
      	.then((data) => {
      		
      		this.setState({article: data});
      		console.log(this.state);
      	})
      .catch("Fail");
	}

	displayTests(){
		let i = 0;
		let arr = [];
		if(!this.state.correctAnswers.correctAnswers){
			while(i < this.state.article.tests.length){

	        	let arr2 = [];
	        	let {type, question, answers, _id} = this.state.article.tests[i];

	        	arr2 = answers.map((item, index) =>{
	        		return (<div key = {index.toString()}  className = "news__tests list__item">
			    			<input name = {`name${i}`}  type = {type}></input><span>{item}</span><br/>  
			    			
			    	</div>);
	        	});

	        	arr.push((<div key = {i.toString()} className = "contTest">
	        					<div className = "numTest">{`#${i+1} `}</div>
	        					<div className = "question">{question}
	        					</div>{arr2}
	        			</div>));

	        	i++;
	      	}
	      	arr.push((<button key = "" onClick = {this.sendTests} className = "btnSendTests">Send tests</button>));
      	}else{

      		let prevAnswers = this.state.prevAnswers;
  			let correctAnswers = this.state.correctAnswers.correctAnswers;

      		while(i < this.state.article.tests.length){

      			/*prevAnswers[i].correctAnswers.filter((item, index)=>{
      				if(item)
      			});
*/
	        	let arr2 = [];
	        	let {type, question, answers} = this.state.article.tests[i];



	        	arr2 = answers.map((item, index) =>{
	        		return (<div key = {index.toString()}  className = "news__tests list__item">
			    			<input name = {`name${i}`} type = {type}></input><span>{item}</span><br/>    		
			    	</div>);
	        	});

	        	arr.push((<div key = {i.toString()} className = "contTest">
	        					<div className = "numTest">{`#${i+1} `}</div>
	        					<div className = "question">{question}
	        					</div>{arr2}
	        			</div>));

	        	i++;
	      	}
      	}

      	return arr;	
	}

	sendTests(e){
		let container = e.target.parentNode;

		const results = [];

		for(let i = 0; i < container.childNodes.length-1; i++){

			const buf = {};
			const correctAnswers = [];

			for(let j = 0; j < container.childNodes[i].childNodes.length; j++){
				let elem = container.childNodes[i].childNodes[j].childNodes[0];
				
				if(elem.checked){
					correctAnswers.push(elem.nextElementSibling.innerHTML);
				}
			};

			buf._id = this.state.article.tests[i]._id;
			console.log(buf._id);
			buf.correctAnswers = correctAnswers;

			results.push(buf);
		}

		let xhr = new XMLHttpRequest();

		//xhr.open("POST", 'http://5be832ae8d650800131e2759.mockapi.io/results');

		console.log(`/api/articles/${this.state.article._id}`);
		xhr.open("POST", `/api/articles/${this.state.article._id}`);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("Authorization", localStorage.jwtToken);
		xhr.onreadystatechange = function() {
  			if (this.readyState != 4) return;
		}



		let data = JSON.stringify({answers: results});
		this.setState({prevAnswers: results});

		xhr.onload = () => {

  // Process our return data
		  	if (xhr.status >= 200 && xhr.status < 300) {
		    // Runs when the request is successful
		    	this.setState({correctAnswers: JSON.parse(xhr.responseText)});

		    	let textNode = document.createTextNode("Your result: "+this.state.correctAnswers.score + " / "+ 
		    											this.state.correctAnswers.correctAnswers.length);
		    	document.getElementsByClassName("article")[0].appendChild(textNode);

		    	//console.log(textNode, document.getElementsByClassName("article")[0]);
		  	} else {
		    // Runs when it's not
		    	console.log(xhr.responseText);
		  	}

		};

		let obj = xhr.send(data);

	}
  	render() {

  		//console.log(this.state);

  		let prevAnswers = this.state.prevAnswers;
  		let correctAnswers = this.state.correctAnswers.correctAnswers;

  		console.log(prevAnswers);
  		console.log(correctAnswers);

	    return (
	        <div className="article">
	        	<div className = "tagsContainer">{this.state.article.tags? this.displayTags():null}</div>
	        	<h3>{this.state.article.title}</h3>
	        	<div className = "content">{this.state.article.text}</div>
	        	<div className = "content">{this.state.article.tests? this.displayTests():null}</div>
	        </div>

	    );
  }
}

export default Article;