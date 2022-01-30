import { createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import { grey, yellow, amber, blue, lightBlue, indigo, teal, red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

export const theme = createTheme({
  typography: {
    "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  },
})

// トップ・ロビー画面の背景
export const Back = styled('div')({
  background: blue[300],
  paddingTop: '10%',
  paddingBottom: '15%',
});

// トップ・ロビー画面のメニュー
export const MenuCard = styled(Card)({
  marginRight: '20%',
  marginLeft: '20%',
});

// 入力テキストボックス
export const InputField = styled(TextField)({
  zIndex: 1,
});

// クイックマッチボタン
export const QuickButton = styled(Button)({
  padding: '10%',
  margin: '5%',
  fontSize: '2em',
  color: grey[700],
  background: blue[200],
  width: '75%',
  'white-space': 'nowrap',
  '&:hover': {
    background: blue[100],
  },
});

// フレンドマッチボタン
export const FriendButton = styled(Button)({
  padding: '10%',
  margin: '5%',
  fontSize: '2em',
  color: grey[700],
  background: indigo[200],
  width: '75%',
  'white-space': 'nowrap',
  '&:hover': {
      background: indigo[100],
    },
});

// フレンドマッチのモーダル
export const FriendModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// フレンドマッチのメニュー
export const FriendMenu = styled('div')({
  background: grey[50],
  boxShadow: 5,
  padding: theme.spacing(4, 12, 4),
});

// 部屋作成ボタン
export const CreateButton = styled(Button)({
  color: grey[700],
  width: '50%',
  marginLeft: '25%',
  marginBottom: '10%',
  padding: '-20%',
  'white-space': 'nowrap',
  fontSize: '2em',
  zIndex: 2,
  background: blue[200],
  '&:hover': {
      background: blue[100],
    },
});

// 部屋入室ボタン
export const JoinButton = styled(Button)({
  color: grey[700],
  top: '50%',
  width: '100%',
  marginTop: '-10%',
  marginLeft: '10%',
  padding: '-20%',
  fontSize: '2em',
  'white-space': 'nowrap',
  background: indigo[200],
  '&:hover': {
      background: indigo[100],
  },
});

// ロビータイトル
export const LobbyTitle = styled('p')({
  color: lightBlue[700],
  fontSize: '2em',
  fontWeight: 'bold',
});

// 参加プレイヤー一覧
export const ParticipantList = styled('p')({
  color: grey[700],
  fontSize: '1.5em',
  fontWeight: 'bold',
});

// ルームコードタグ
export const RoomCodeTag = styled('p')({
  color: grey[700],
  margin:0,
  fontSize: '1.5em',
  fontWeight: 'bold',
});

// ゲーム開始ボタン
export const StartButton = styled(Button)({
  color: grey[700],
  background: blue[200],
  fontSize: '2em',
  width: '75%',
  'white-space': 'nowrap',
  '&:hover': {
      background: blue[100],
    },
});

// 戻るボタン
export const BackButton = styled(Button)({
  color: grey[700],
  background: indigo[200],
  fontSize: '2em',
  width: '75%',
  'white-space': 'nowrap',
  '&:hover': {
      background: indigo[100],
    },
});

// ゲーム画面の背景
export const GameBack = styled('div')({
  background: blue[200],
  paddingTop: '2%',
  paddingBottom: '20%',
});

// メッセージボックス
export const MessageBox = styled(Card)({
  background: indigo[200],
  marginLeft: '25%',
});

// メッセージ本体
export const NaviMessage = styled('p')({
  fontSize: '1.5em',
  color: grey[50],
});

// 目標カード
export const TargetCard = styled(Card)({
  background: teal['A100'],
  color: grey[700],
  marginLeft: 50,
  marginRight: 10,
});

// 目標タグ
export const CardTag = styled('p')({
  margin:0,
  fontSize: '1.5em',
});

// 目標値
export const CardValue = styled('p')({
  margin: 0,
  fontSize: '4em',
  fontWeight: 'bold',
});

// 勝利条件エリア
export const GoalArea = styled('div')({
  marginTop: 5,
  marginRight: 10,
  marginLeft: 50,
});

// 勝利条件タグ
export const GoalTag = styled('p')({
  color: grey[50],
  margin: 0,
  padding: 0,
  fontSize: '1.5em',
});

// 勝利条件メッセージ
export const GoalMessage = styled('p')({
  color: grey[50],
  margin: 0,
  padding: 0,
  fontSize: '2em',
  fontWeight: 'bold',
});

export const useStyles = makeStyles((theme) => ({
  
  topic: {
    color: yellow[300],
    fontSize: '4em',
  },
  name: {
    color: grey[700],
    fontSize: '1em',
  },
  game_root: {
    marginTop: 10,
    marginRight: 300,
    marginLeft: 300,
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
  typography: {
    fontSize: '2rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    background: indigo[200],
    marginLeft: 300,
  },
  time: {
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