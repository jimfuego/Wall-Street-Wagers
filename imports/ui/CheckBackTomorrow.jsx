import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';



class CheckBackTommorow extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.props.history.push("/profile");
    }


    render() {
        return (
            <div>
                <h3>Congrats on submitting your bet. Check back tomorrow to see if you beat the stock market</h3>
                <Button id="p" variant="outlined" color="primary" style={{textTransform: "none"}}
                        onClick={this.onClick}>Go to profile</Button>
            </div>
        );
    }
}

export default withTracker (() => {
    return {
        // challenger: Meteor.user(),
        // challenger: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),

    }
})(withRouter(CheckBackTommorow))
