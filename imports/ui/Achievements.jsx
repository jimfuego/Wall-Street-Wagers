import React, { Component } from "react";
import { unstable_Box as Box } from '@material-ui/core/Box';

export default class Achievements extends Component {
  render() {
    return(
    <div style={{ width: '100%' }}>
    <Box className="achieve" align="center"> Achievments
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
      </Box>
    </Box>
    </div>
    );
  }
}
