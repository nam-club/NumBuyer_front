import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles({
    ground: {
        
    },
    root: {
        marginRight: 300,
        marginLeft: 300,
        background: blue[200],
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    actionButton: {
        
    }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div className={classes.ground}>
        <Card className={classes.root}>
        <CardContent>
            <TextField id="standard-basic" label="Player Name" />
        </CardContent>
        <CardActions className={classes.actionButton}>
            <Grid item xs={6}>
                <Button size="big">Quick Match</Button>
            </Grid>
            <Grid item xs={6}>
                <Button size="big">Play with Friend</Button>
            </Grid>
        </CardActions>
        </Card>
    </div>
  );
}