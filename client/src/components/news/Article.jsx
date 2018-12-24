import React, { Component } from 'react';

class Article extends Component {

	display(){
		let i = 0;
		let arr = [];
		while(i < this.props.tests.length){
        	//arr.push((<div onClick = {this.handleClick} key = {i} className = "pageNum">{i}</div>));
/*        	let arr2 = [];        		    

        	arr2.push(this.props.tests[0][0]);
        	let j = 1;
        	while(j < this.props.tests[i].length){			   

		    	//arr.push(div);
		    	let div = document.createElement('div');

		    	arr2.push(
		    		(<div key = {i.toString()+j.toString()} className = "news__tests">
		    			{console.log(this.props.tests)}
		    			<input type = "checkbox"></input>
		    			{this.props.tests[i][j].answer}
		    		
		    		</div>));

        		j++;
        	}
        	     	
        	arr.push((<div key = {i.toString()+j.toString()} className = "contTest">{arr2}</div>));*/

        	let arr2 = [];
        	let {type, question, answers} = this.props.tests[i];

        	arr2 = answers.map((item, index) =>{
        		return (<div key = {index.toString()}  className = "news__tests">
		    			<input name = {`name${i}`} type = {type}></input><span>{item}</span><br/>    		
		    	</div>);
        	});

        	arr.push((<div key = {i.toString()} className = "contTest">{arr2}</div>));

        	i++;
      	}

      	arr.push((<button key = "" onClick = {this.sendTests} className = "btnSendTests">Send tests</button>));

      	return arr;	
	}

	sendTests(e){
		let container = e.target.parentNode;

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

		let data = JSON.stringify({"results": results});
		//console.log(data);

		xhr.send(data);
	}
  	render() {

	    return (
	        <div className="article">
	        	<h3>{this.props.title}</h3>
	        	<div>{this.props.text}</div>
	        	<div>{this.props.tags}</div>
	        	<div >{this.props.tests? this.display():null}</div>
	        </div>

	    );
  }
}

export default Article;