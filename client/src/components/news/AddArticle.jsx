import React, { Component } from 'react';

class AddArticle extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		testId: 0,
    	};

    	this.createTest = this.createTest.bind(this);
    	this.sendArticle = this.sendArticle.bind(this);
	}
    
	sendArticle() {
		let nameArticle = document.getElementById("nameArticle");
		let contentArticle = document.getElementById("contentArticle");
		let tagsArticle = document.getElementById("tagsArticle");

		let tags = [];

		(tagsArticle.value !== "")? tags = tagsArticle.value.split(','): null;

		if(nameArticle.value==0){
			nameArticle.classList.add('error');

			setTimeout(() =>{
				nameArticle.classList.remove('error');
			},2000);			
			return;
		}
		if(contentArticle.value==0){
			contentArticle.classList.add('error');

			setTimeout(() =>{
				contentArticle.classList.remove('error');
			},2000);			
			return;
		}

		let xhr = new XMLHttpRequest();

		//xhr.open("POST", 'http://5be832ae8d650800131e2759.mockapi.io/articles');
		xhr.open("POST", '/api/articles');
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("Authorization", localStorage.jwtToken);

		xhr.onreadystatechange = function() {
  			if (this.readyState != 4) return;
		}

		let arrChk = document.getElementsByClassName("contTest");		

		const testsArr = [];
		let i = 0;
		while(i < arrChk.length){
			let question = arrChk[i].childNodes[0].childNodes[0].value;
			let type = arrChk[i].childNodes[1].childNodes[0].type;

			let objRes = {};
			objRes.question = question;
			objRes.type = type;

			const answers = []
			const correctAnswers = []

			let j = 1;

		    while(j < arrChk[i].childNodes.length){

		    	let flag = arrChk[i].childNodes[j].childNodes[0].checked;
		    	let input = arrChk[i].childNodes[j].childNodes[1].value;	

		    	answers.push(input);

		    	if(flag){
		    		correctAnswers.push(input);
		    	}

		    	if(input === ""){
		    		let error = document.getElementById("errorBlock");
					error.className = "errorBlock";
					error.innerHTML = "Enter questions and answers";
					return;
		    	}
		    	
		    	j++;
			}

			if(correctAnswers.length == 0 || question === ""){
				let error = document.getElementById("errorBlock");
				error.className = "errorBlock";
				error.innerHTML = "Enter questions and answers";
				return;
			}

			objRes.answers = answers;
			objRes.correctAnswers = correctAnswers;

			testsArr.push(objRes);

		    i++;
		}	

		let data = JSON.stringify({"title": nameArticle.value, 
								   "text": contentArticle.value, 
								   "tests": testsArr,
								   "tags": tags
								});

		console.log('send data');
		xhr.send(data);

		//window.location.href = "/news";
		//this.props.history.push("/news");
		
	}

	createTest(){
		let opt1 = document.getElementById("opt1");
		let opt2 = document.getElementById("opt2");
		let numFields = document.getElementById("numFields").value;

		let arr = [];

		let questionLabel = document.createElement("label");
		questionLabel.className = "label-question";

		let questionTextarea = document.createElement("textarea");
		questionTextarea.id = "question";
		questionTextarea.placeholder = "Type a question";

		questionLabel.appendChild(questionTextarea);

		arr.push(questionLabel);

		if(opt1.checked){
			
			let i = 0;
		    while(i < numFields){
		    	let div = document.createElement('div');
		    	div.className = "answer-variant";
		    	let elem = document.createElement('input');
		    	elem.type = "radio";
		    	elem.name = `name${this.state.testId}`;

		    	let input = document.createElement('textarea');
		    	input.name = `text${this.state.testId}`;

		    	div.appendChild(elem);
		    	div.appendChild(input);
		        arr.push(div);
		        i++;
		    }
		}
		else if(opt2.checked){
			let i = 0;
		    while(i < numFields){
		    	let div = document.createElement('div');
		    	div.className = "answer-variant";
		    	let elem = document.createElement('input');
		    	elem.type = "checkbox";
		    	elem.name = `name${this.state.testId}`;

		    	let input = document.createElement('textarea');
		    	input.name = `text${this.state.testId}`;
		    	//input.type = "text";

		    	div.appendChild(elem);
		    	div.appendChild(input);
		        arr.push(div);
		        i++;
		    }
		}

		let containerTest = document.getElementById("containerTests");

		let divTest = document.createElement('div');
		divTest.className = "contTest";
		divTest.id = `contTestId${this.state.testId}`;

		let i = 0;
		while(i < (arr.length)){
		    divTest.appendChild(arr[i]);
		    i++;
		}
		containerTest.appendChild(divTest);

		this.setState({testId: this.state.testId + 1});

	}

  	render() {
	    return (
	        <div className="addArticle">
				<div className="addArticle__top">
	        	<div >
		        	Type name of article <br/>
		        	<input type = "text" id = "nameArticle"/>
		        </div>

		        <div>
		        	Add tags separated by commas<br/>
		        	<input type = "text" id = "tagsArticle"/>
		        </div>
				</div>
		        <div className = "pad">
		        	Type content <br/>
	        		<textarea className ="textarea" id = "contentArticle"/>
	        	</div>

	        	<div id = "containerTests">
		        	Create test <br/>
		        	
		        	<label className="d-flex j-space">How many answer choices?<input type ="number" id = "numFields"/></label> <br/>
					<div className="d-flex label">
		        		<label className="label-test">1 answer <input type ="radio" name = "radioTest" value = "opt1" id = "opt1"/></label> <br/>
		        		<label>>1 answers <input type ="radio" name = "radioTest" value = "opt2" id = "opt2"/></label> <br/>
					</div>
		        	<button onClick = {this.createTest}>
	        			Create test
	        		</button> <br/>
	        	</div>

	        	<div className = "pad">
		        	
	        		<button onClick = {this.sendArticle}>
	        			Send article
	        		</button>

	        		<div id = "errorBlock"></div>
	        	</div>

	        </div>

	    );
  	}
}

export default AddArticle;