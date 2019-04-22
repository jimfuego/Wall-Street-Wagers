import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";



 class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      //photos:[],
      comments:[]
      //err:""
    }
  }

  componentDidMount(){
     Meteor.call("comments.get",(err,response)=> {
      if(err){
        console.log(err);
        return;
      }
      console.log("got data", response);
        this.setState({
          comments:response
        });


    });
  }



  renderComments(){
    return this.state.comments.map(p =>
      <div>
      {p.kind}
      {p.data.body}
      </div>
  )
  }

   /* getURL(p){
    return "https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_s.jpg";
  }

  renderPhotos(){

    return this.state.photos.map(p =>
      <img key={p.id}
           src={this.getURL(p)}
            alt={p.title}/>)
  }*/

    render() {
    return (
      <div>
      <AccountsUIWrapper/>
      {this.state.err ? <div> ERROR{this.state.err}</div> : " "}
        <h1>Reddit</h1>

      {
        this.renderComments()
      }

      </div>
    );
  }
}


    /*console.log("cdm")
    fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9e82efc5665278bb92f25cf0e47f16d4&text=cats&sort=relevance&format=json&nojsoncallback=1")
    .then(data => data.json())
    .then(jsonData => {
      console.log("got data", jsonData)
      this.setState({
      photos: jsonData.photos.photos
    })
  })
    .catch(err => this.setState({
      err
    }));*/








export default withTracker(() => {
  return ({
    user:Meteor.user()
  });
})(App);
