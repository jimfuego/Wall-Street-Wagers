import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function Gambler() {
  // const { classes } = props;
  return(
    <Card className="TheCard">
      <CardActionArea>
        <CardMedia
          title="Profile Picture"
          component="img"
          alt="User Profile Picture"
          className="{classes.media}"
          image="ace-action-adult-1688506.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Gambler Name (prop)
          </Typography>
          <Typography component="p">
              Gamblers are often interesting folk, and this is where they
              are intended to elaborate...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button label="button1" size="small" color="primary">
              Send message
        </Button>
        <Button label="button2" size="small" color="primary">
              Like
        </Button>
      </CardActions>
    </Card>
  );
}

// Player.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Gambler);
