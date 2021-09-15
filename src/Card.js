import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



export default function MediaCard(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: props.width ? props.width : 180,
    },
    media: {
      height: props.height ? props.height : 70,
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{marginTop: 20}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
        />
        {props.title && <CardContent>
          <Typography gutterBottom >
            {props.title}
          </Typography>
        </CardContent>}
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
