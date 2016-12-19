import React, { Component } from 'react';
import axios from 'axios';


class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      topText: '',
      bottomText: '',
      url: '',
      imgs: [],
      loading: true,
      result: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.setState({loading: true});
    // make ajax call to memegen server
      axios.get('https://memegen.link/api/search/')
      .then((response) => {
        //map over response to extract memes
        for (var i = 0; i < response.data.length; i++) {
          //push all loaded memes to state
          this.setState({imgs: this.state.imgs.concat(response.data[i].template.blank), loading: false})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleText(text){
    //filter out special chars from url
    return text.replace(/\?/g, "~q").replace(/%/g, "~p").replace(/#/g, "~h").replace(/\//g, "~s").replace(/_/g, "__");
  }
  handleSubmit(e){
    e.preventDefault();
    //Filter out blank state
    if (this.state.bottomText === "") {
      this.setState({bottomText: 'Enter Text'})
    }else if (this.state.topText === "") {
      this.setState({topText: 'Enter Text'})
    }else if (this.state.url === "") {
      alert('Pick a meme');
    }else {
      //replace placeholder url with new one
      var url = this.state.url.replace('_.jpg', `${this.state.topText}/${this.state.bottomText}`)
      //make call
      axios.get(url)
      .then((response) => {
          this.setState({topText: 'Scroll', bottomText: 'down', result: response.data.direct.visible});
        })
      .catch((error) => {
        console.log(error);
      });
    }
  }



  render() {
    let loader, result;
    //map over memes and display them
    let options = this.state.imgs.map((img) => {
      return (  <div key={img} className="imgSele">
                        <label>
                            <img src={img} alt="MEME"/><br />
                            <input type="radio" value={img} name="input-group" onChange={(e) => this.setState({url: e.target.value})}/>
                        </label>
                    </div> )
    });
    //Handle loading of data
    if (this.state.loading === true) {
     loader =
      <div className="loadingWrap">
        <div className="loader">loading...</div>
      </div>
    }else{
     loader = "";
    }
    //Handle loading of image
    if (this.state.result === '') {
       result = "";
    }else{
      result =
      <div className="result">
        <img alt="meme" className="result" src={this.state.result} />
      </div>
    }
    return (
      <div>
        {loader}
        <form onSubmit={this.handleSubmit}>
              <div className="options">
                {options}
              </div>
              <input type="text" placeholder="top text" value={this.state.topText} onChange={(e) => this.setState({topText: this.handleText(e.target.value)})}/>
              <br />
              <input type="text" placeholder="bottom text" value={this.state.bottomText} onChange={(e) => this.setState({bottomText: e.target.value})}/>
              <br />
              <button type="submit">Meme-it <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/99472-200.png" /></button>
        </form>
        {result}
      </div>
    );
  }
}

export default Input;
