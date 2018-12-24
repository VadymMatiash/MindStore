import React, { Component } from 'react';

class Article extends Component {

	displayTags(){
		let i = 0;

		const arr = this.props.tags.map((item, index) =>{
			return (<div key = {`tags${index}`} className = "tags">{item}</div>)
		});


		return arr;
	}

	displayTests(){
		let i = 0;
		let arr = [];
		while(i < this.props.tests.length){

        	let arr2 = [];
        	let {type, question, answers} = this.props.tests[i];

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

      	arr.push((<button key = "" onClick = {this.sendTests} className = "btnSendTests">Send tests</button>));

      	return arr;	
	}

	sendTests(e){
		let container = e.target.parentNode;
		let title = container.parentNode.childNodes[0].innerHTML;

		const results = [];

		for(let i = 0; i < container.childNodes.length-1; i++){

			const buf = [];

			for(let j = 0; j < container.childNodes[i].childNodes.length; j++){
				let elem = container.childNodes[i].childNodes[j].childNodes[0];
				if(elem.checked){
					buf.push(elem.nextElementSibling.innerHTML);
				}
			};

			results.push(buf);
		}

		let xhr = new XMLHttpRequest();

		xhr.open("POST", 'http://5be832ae8d650800131e2759.mockapi.io/results');
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function() {
  			if (this.readyState != 4) return;
		}

		let data = JSON.stringify({ "title": title,
									"results": results});
		//console.log(data);

		xhr.send(data);
	}
  	render() {

	    return (
	        <div className="article">
	        	<div className = "tagsContainer">{this.props.tags? this.displayTags():null}</div>
	        	<h3>{this.props.title}</h3>
	        	<div className = "content">{this.props.text}</div>
	        	<div className = "content">{this.props.tests? this.displayTests():null}</div>
	        </div>

	    );
  }
}

export default Article;