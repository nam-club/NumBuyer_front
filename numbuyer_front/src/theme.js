import {createMuiTheme} from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const theme = createMuiTheme({
  typography: {
    "fontFamily": "\"Ubuntu Condensed\", \"sans-serif\"",
  },
})

export const useStyles = makeStyles((theme) => ({
  back: {
      background: grey[900],
      paddingTop: 200,
      paddingBottom: 300,
  },
  game_back: {
    background: grey[900],
    paddingTop: 10,
    paddingBottom: 300,
  },
  title: {
      color: yellow[300],
      fontSize: '4em',
      fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
  },
  menu: {
    color: green[300],
    fontSize: '2em',
    fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
  },
  name: {
    color: grey[900],
    fontSize: '1em',
    fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
  },
  root: {
      marginRight: 300,
      marginLeft: 300,
      background: grey[300],
  },
  game_root: {
    marginTop: 10,
    marginRight: 300,
    marginLeft: 300,
    background: grey[300],
  },
  nameField: {
      fontSize: '3em',
      color: grey[600],
      paddingTop: 80,
      marginTop: -50,
  },
  actionButton: {
      padding: 50,
      margin: 10,
      fontSize: 30,
  },
  quickButton: {
      background: blue[200],
      '&:hover': {
          background: blue[100],
       },
  },
  friendButton: {
      background: green[200],
      '&:hover': {
          background: green[100],
       },
  },
  startButton: {
    margin: 10,
    fontSize: 30,
  },
  typography: {
      fontSize: '2rem',
  },
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 8, 6),
  },
  box: {
    marginLeft: 300,
  },
  time: {
      background: orange[200],
      marginLeft: 50,
      marginRight: 10,
  },
  answer: {
    background: pink[200],
    marginLeft: 50,
    marginRight: 10,
  },
  auction: {
    background: yellow[200],
    marginLeft: 50,
    marginRight: 10,
  },
  auction_root: {
    marginRight: 300,
    padding: 10,
    background: grey[300],
  },
  naviMessage: {
    color: grey[700],
    fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
  },
  tag: {
      color: grey[700],
      margin:0,
      fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
  },
  message: {
      color: grey[700],
      margin: 0,
      fontSize: '4em',
      fontFamily: "\"Ubuntu Condensed\", \"sans-serif\"",
  },
  moneyField: {
    color: grey[600],
    width: 300,
  },
  buyButton: {
    background: green[200],
    marginTop: 30,
    '&:hover': {
        background: green[100],
     },
  },
  passButton: {
    background: grey[500],
    marginTop: 30,
    marginLeft: 50,
    '&:hover': {
        background: grey[500],
     },
  },
}));