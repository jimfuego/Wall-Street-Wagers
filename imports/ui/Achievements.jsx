import React, { Component } from "react";
import { unstable_Box as Box } from '@material-ui/core/Box';
import Card from "@material-ui/core/Card";

export default class Achievements extends Component {
  render() {
    return(
    <div style={{ width: '100%' }}>
    <h4 className="achieveheading" text-align="center" >Achievements</h4>
    <div className="asub" >
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          Most recent achievement
        </Box>
        <Box p={1} bgcolor="grey.300">
          Next most recent achievement
        </Box>
        <Box p={1} bgcolor="grey.300">
          3rd most
        </Box>
        <Box p={1} bgcolor="grey.300">
          3rd most
        </Box>
        <Box p={1} bgcolor="grey.300">
          3rd most
        </Box>
      </Box>
      </div>
    </div>
    );
  }
}
