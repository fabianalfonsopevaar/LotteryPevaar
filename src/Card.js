import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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
      <CardActionArea onClick={() => props.changeState ? props.changeState(props.id) : {} }>
        <CardMedia
          className={classes.media}
          image={props.image}
        />
        {props.title && <CardContent>
          <Typography gutterBottom >
            {props.title} 
            {props.showIcon && (props.selected ? <CheckIcon style={{ color: green[500] }} /> : <CloseIcon  color="action"/>)}
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
