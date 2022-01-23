import {createMuiTheme} from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import { positions } from '@material-ui/system';

import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

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
    "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  },
})

export const useStyles = makeStyles((theme) => ({
  
  back: {
    background: blue[300],
    paddingTop: 200,
    paddingBottom: 300,
  },
  game_back: {
    background: blue[200],
    paddingTop: 10,
    paddingBottom: 300,
  },
  topic: {
    color: yellow[300],
    fontSize: '4em',
  },
  menu: {
    color: lightBlue[700],
    fontSize: '2em',
  },
  name: {
    color: grey[700],
    fontSize: '1em',
  },
  root: {
    marginRight: 300,
    marginLeft: 300,
  },
  game_root: {
    marginTop: 10,
    marginRight: 300,
    marginLeft: 300,
  },
  nameField: {
    fontSize: '3em',
    color: grey[600],
    paddingTop: 80,
    marginTop: -50,
    zIndex: 1,
  },
  errorField: {
    color: red[600],
    background: red[100],
  },
  actionButton: {
      padding: 50,
      margin: 10,
      fontSize: 30,
  },
  quickButton: {
    color: grey[700],
    background: blue[200],
    width: '75%',
    'white-space': 'nowrap',
    border: 1,
    '&:hover': {
        background: blue[100],
      },
  },
  friendButton: {
    color: grey[700],
    background: indigo[200],
    width: '75%',
    'white-space': 'nowrap',
    '&:hover': {
        background: indigo[100],
      },
  },
  createButton: {
    color: grey[700],
    width: '75%',
    'white-space': 'nowrap',
    zIndex: 2,
    background: blue[200],
    '&:hover': {
        background: blue[100],
     },
  },
  joinButton: {
    color: grey[700],
    top: '50%',
    width: '100%',
    'white-space': 'nowrap',
    background: indigo[200],
    '&:hover': {
        background: indigo[100],
    },
  },
  startButton: {
    color: grey[700],
    margin: 10,
    fontSize: 30,
    width: '75%',
    'white-space': 'nowrap',
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
    background: indigo[200],
    marginLeft: 300,
  },
  time: {
      marginLeft: 50,
      marginRight: 10,
  },
  target: {
    background: teal['A100'],
    color: grey[700],
    marginLeft: 50,
    marginRight: 10,
  },

  // オークションカード
  auction: {
    background: lightBlue[200],
    color: grey[700],
    marginLeft: 50,
    marginRight: 50,
  },

  // オークションエリア
  auction_root: {
    padding: 10,
    background: grey[300],
    position: 'relative',
    top: 0,
    animation: '$kiran 0.5s linear 1',
    '&:hover': {
      'animation-play-state': 'paused',
    },
  },
  auction_root_animation: {
    background: grey[50],
    animation: '$poyopoyo 3s ease-out infinite',
  },
  '@keyframes poyopoyo': {
    '0%, 40%, 60%, 80%': {
      transform: 'scale(1.0)',
    },
    '50%, 70%': {
      transform: 'scale(0.98)',
    },
  },

  naviMessage: {
    color: grey[50],
  },
  bg_tag: {
    color: grey[50],
    margin:0,
  },
  bg_value: {
      color: grey[50],
      margin: 0,
      fontSize: '4em',
  },
  tag: {
      color: grey[700],
      margin:0,
  },
  player_tag: {
    fontSize: 25,
    fontWeight: 100,
  },
  value: {
      margin: 0,
      fontSize: '4em',
  },
  coinField: {
    color: grey[600],
    width: 300,
  },
  bidButton: {
    background: lightBlue[200],
    marginTop: 30,
    marginLeft: 50,
    marginBottom: 10,
    width: '25%',
    'white-space': 'nowrap',
    '&:hover': {
        background: lightBlue[100],
     },
  },
  passButton: {
    background: grey[500],
    marginTop: 30,
    marginBottom: 10,
    width: '25%',
    'white-space': 'nowrap',
    '&:hover': {
        background: grey[500],
     },
  },
  calcButton: {
    background: yellow[200],
    marginTop: 30,
    marginLeft: 50,
    marginBottom: 10,
    width: '25%',
    'white-space': 'nowrap',
    '&:hover': {
        background: yellow[100],
     },
  },
  goal: {
    marginTop: 5,
    marginRight: 10,
    marginLeft: 50,
  },
  goal_tag: {
    color: grey[50],
    margin:0,
  },
  player: {
    background: grey[50],
    color: grey[700],
    marginTop: 5,
    marginRight: 25,
    marginLeft: 75,
  },

  // 手札エリア
  hand: {
    background: grey[200],
    marginLeft: -250,
    position: 'relative',
    top: 50,
  },
  hand_animation: {
    background: grey[50],
    animation: '$poyopoyo 3s ease-out infinite',
    '&:hover': {
      'animation-play-state': 'paused',
    },
  },
  '@keyframes poyopoyo': {
    '0%, 40%, 60%, 80%': {
      transform: 'scale(1.0)',
    },
    '50%, 70%': {
      transform: 'scale(0.98)',
    },
  },

  handMessage: {
    color: grey[700],
    marginLeft: 10,
  },
  calc: {
    background: grey[200],
    marginTop: 5,
    marginLeft: -250,
    position: 'relative',
    top: 50,
  },
  calcMessage: {
    color: grey[700],
    marginLeft: 10,
  },
  card: {
    background: yellow[200],
    marginLeft: 10,
    marginBottom: 10,
    width: 80,
    height: 80,
  },

  // 計算フェーズの時のみ文字色をつける（非活性の時に文字色を消すために）
  card_valid: {
    color: grey[700],
  },

  // カード折り返し表示用
  card_display: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  winner: {
    color: amber[500],
    fontWeight: 500,
  },
  loser: {
    color: blue[600],
  },
  image: {
    width: '8%',
  },
  title: {
    width: '40%',
    marginLeft: 20,
    marginBottom: 30,
  },
  logo: {
    width: '9%',
  }
}));