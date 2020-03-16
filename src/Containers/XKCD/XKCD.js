import React, { Component } from 'react';
import axios from 'axios';
import Search from '../../Components/UI/UserInput/UserInput';
import Display from '../../Components/Display/Display';
import Comic from '../../Components/Display/Comic/Comic';
import Spinner from '../../Components/UI/Spinner/Spinner';

 export default class XKCD extends Component {

    state = {
        url: 'http://xkcd.com/info.0.json',
        userInput: '',
        title : null,
        img: null,
        altText: null,
        loaded: false
    }

    componentDidMount () {

        axios.get(this.state.url)
        .then(response => {
           this.HandleAPI(response);
        }); 
    }

    componentDidUpdate(prevProps, prevState) {
        // if URL changes i.e new request from user, then update component. 
        if(prevState.url !== this.state.url) {
            
        axios.get(this.state.url)
        .then(response => {
            this.HandleAPI(response);
        }); 
        }
    }


    // ES6 arrow function to bind to this

    HandleAPI = (response) => {

        const updatedState = {...this.state};
    
        updatedState.title = response.data.title;
        updatedState.img = response.data.img;
        updatedState.altText = response.data.alt;
        updatedState.loaded = true;

        this.setState(updatedState);
    }

    userInputHandler = (event) => {
        let updatedUserInput = this.state.userInput;

        updatedUserInput = event.target.value;

        this.setState({userInput : updatedUserInput});

    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        // extract comic number from input
        const comicNum = this.state.userInput.match(/\d+/)[0];
        const updatedURL = 'http://xkcd.com/' + comicNum + '/info.0.json';

        this.setState({
            url: updatedURL,
            loaded:false
        });
    }

    render () {

        const displayContent = (
            // show content is loaded is true otherwise show spinner
           
            this.state.loaded ?  // ternary operator
                <Display>
                    <Comic
                    title={this.state.title} 
                    src={this.state.img} 
                    alt={this.state.altText}
                    />
                </Display> : <Spinner />
         )


        return (
            <div>
                <h1>XKCD API</h1>
                <Search 
                input={this.state.userInput} 
                change={(event) => this.userInputHandler(event)}
                submit={(event) => this.onSubmitHandler(event)} 
                />
                {displayContent}
                
            </div> 
        )
    }
}