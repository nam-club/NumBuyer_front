import { createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import { grey, yellow, amber, blue, lightBlue, indigo, teal, cyan, red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TimelineContent from '@mui/lab/TimelineContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Typography } from '@mui/material';

export const theme = createTheme({
  typography: {
    "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  },
})

// メインロゴ
export const MainLogoMobile = styled('img')({
  width: '25%',
});

// メインタイトル
export const MainTitleMobile = styled('img')({
  width: '60%',
});

// トップ・ロビー画面の背景
export const BackMobile = styled('div')({
  paddingTop: '5%',
});

// 言語設定ボタン
export const LangButtonMobile = styled(Button)({
  margin: '0 2%',
  fontSize: '1.5em',
  color: grey[50],
  background: grey[600],
  '&:hover': {
    background: grey[500],
  },
});

// チュートリアルアイコン
export const TutorialIconMobile = styled(MenuBookIcon)({
  color: grey[50],
  fontSize: '2.5em',
  margin: 0,
});

// メニューモーダル
export const MenuModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5%',
  overflow: 'scroll',
});

// 設定やチュートリアルのメニュー
export const TopMenu = styled('div')({
  background: grey[50],
  boxShadow: 5,
});

// モーダルタイトル
export const ModalTitle = styled('p')({
  color: grey[700],
  fontSize: '3em',
  fontWeight: 'bold',
});

// サイドバー
export const SideBar = styled(Box)({
  width: '20%',
  flexShrink: { sm: 0 }
});

// ページタイトル
export const PageTitleMobile = styled(Button)({
  fontSize: '1.5em',
  background: grey[600],
  '&:hover': {
    background: grey[500],
  },
});

// 見出し
export const CaptionMobile = styled('p')({
  color: grey[700],
  marginTop: '5%',
  marginBottom: '0'
});

// 見出し（タイムライン）
export const TimeItemName = styled(TimelineContent)({
  color: grey[700],
});

// ボタン（タイムライン）
export const TLButtonMobile = styled(Button)({
  margin: '2%',
  background: teal[300],
  '&:hover': {
    background: teal[200],
  },
});

// チュートリアル本文
export const TutorialBody = styled(Box)({
  flexGrow: 1,
  p: 3,
  width: '70%',
  color: grey[700]
});

// チュートリアルのイメージ画像
export const TutorialImage = styled('img')({
  width: '40%',
  marginTop: '2%',
});

// チュートリアルの強調部分の説明
export const EmphasisMessage = styled(Typography)({
  marginTop: '2%',
  marginBottom: '1%',
});

// チュートリアルの詳細説明
export const DetailMessage = styled(Typography)({
  fontSize: '1em',
});

// トップ・ロビー画面のメニュー
export const MenuCardMobile = styled(Card)({
  margin: '2% 12.5% 5% 12.5%',
  width: '75%',
});

// 入力テキストボックス
export const InputField = styled(TextField)({
  zIndex: 1,
});

// エラーメッセージ
export const ErrorMessageMobile = styled('p')({
  fontSize: '1em',
  margin: '5% 10%',
  color: red[600],
  background: red[100],
});

// クイックマッチボタン
export const QuickButtonMobile = styled(Button)({
  display: 'inline-block',
  fontSize: '2em',
  width: '150%',
  margin: '5% 10%',
  color: grey[700],
  background: blue[200],
  'white-space': 'nowrap',
  '&:hover': {
    background: blue[100],
  },
});

// フレンドマッチボタン
export const FriendButtonMobile = styled(Button)({
  display: 'inline-block',
  fontSize: '2em',
  width: '150%',
  margin: '0 10%',
  color: grey[700],
  background: indigo[200],
  'white-space': 'nowrap',
  '&:hover': {
    background: indigo[100],
  },
});

// アビリティモーダル
export const AbilityModal = styled(Modal)({
  marginTop: '5%',
  marginLeft: '5%',
  marginRight: '5%',
  overflow: 'scroll',
});

// アビリティカード
export const AbilityCard = styled(Card)({
  margin: '4%',
});

// アビリティボタン（未選択）
export const AbilityButton = styled(Button)({
  padding: '10%',
  margin: '5%',
  color: grey[800],
  background: grey[200],
  width: '75%',
  'white-space': 'nowrap',
  '&:hover': {
    background: grey[100],
  },
});

// アビリティボタン（選択）
export const SelectedAbilityButton = styled(Button)({
  padding: '10%',
  margin: '5%',
  fontSize: '1em',
  width: '75%',
  'white-space': 'nowrap',
});

// 吹き出しコメント
export const SpeechBubble = styled('p')({
  fontSize: '1.5em',
});

// 確定ボタン
export const ConfirmButtonMobile = styled(Button)({
  color: grey[100],
  width: '75%',
  margin: '10%',
  'white-space': 'nowrap',
  fontSize: '2em',
  zIndex: 2,
  background: indigo[200],
  '&:hover': {
    background: indigo[100],
  },
});

// アビリティタグ
export const AbilityTag = styled('p')({
  color: grey[700],
  margin:0,
  fontSize: '1.2em',
});


// フレンドマッチのモーダル
export const FriendModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// フレンドマッチのメニュー
export const FriendMenuMobile = styled('div')({
  background: grey[50],
  boxShadow: 5,
  padding: theme.spacing(4, 6, 4),
});

// 部屋作成ボタン
export const CreateButtonMobile = styled(Button)({
  color: grey[700],
  width: '100%',
  marginBottom: '30%',
  'white-space': 'nowrap',
  fontSize: '2em',
  zIndex: 2,
  background: blue[200],
  '&:hover': {
    background: blue[100],
  },
});

// 部屋入室ボタン
export const JoinButtonMobile = styled(Button)({
  color: grey[700],
  top: '50%',
  width: '100%',
  marginTop: '20%',
  fontSize: '2em',
  'white-space': 'nowrap',
  background: indigo[200],
  '&:hover': {
    background: indigo[100],
  },
});

// 設定アイコン
export const SettingIcon = styled(SettingsIcon)({
  color: grey[50],
  fontSize: '3em',
  margin: 0,
});

export const SettingHeader = styled(Typography)({
  marginTop: '10%',
  marginBottom: 0,
})

// ロビータイトル
export const LobbyTitleMobile = styled(Card)({
  margin: 0,
  color: grey[100],
  background: indigo[400],
  fontSize: '2em',
  fontWeight: 'bold',
});

// オーナー一覧
export const OwnerIcon = styled(ManageAccountsIcon)({
  color: lightBlue['A700'],
  marginTop: 0,
});

// 参加プレイヤー一覧
export const ParticipantListMobile = styled('p')({
  margin: '2%',
  color: grey[700],
  fontSize: '2em',
  fontWeight: 'bold',
});

// ルームコードタグ
export const RoomCodeTagMobile = styled('p')({
  marginLeft: '20%',
  float: 'left',
  color: grey[700],
  fontSize: '1.5em',
  fontWeight: 'bold',
});

// ゲーム開始ボタン
export const StartButtonMobile = styled(Button)({
  color: grey[700],
  background: blue[200],
  fontSize: '2em',
  width: '100%',
  'white-space': 'nowrap',
  '&:hover': {
    background: blue[100],
  },
});

// 戻るボタン
export const BackButtonMobile = styled(Button)({
  color: grey[700],
  background: indigo[200],
  fontSize: '2em',
  width: '100%',
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
export const MessageBoxMobile = styled(Card)({
  background: indigo[200],
  margin: '2% 5%',
});

// メッセージ本体
export const NaviMessageMobile = styled('p')({
  fontSize: '1em',
  margin: '2%',
});

// メッセージ本体（複数行））
export const NaviMessagesMobile = styled('p')({
  fontSize: '0.8em',
  margin: '2%',
});

// 目標カード
export const TargetCardMobile = styled(Card)({
  marginLeft: '5%',
  background: teal['A100'],
  color: grey[700],
  'white-space': 'nowrap',
});

// 目標タグ
export const CardTagMobile = styled('p')({
  margin:0,
  color: grey[700],
  fontSize: '1em',
});

// 目標値
export const CardValueMobile = styled('p')({
  margin: 0,
  padding: 0,
  fontSize: '3em',
  fontWeight: 'bold',
});

// オークションエリア
export const AuctionAreaMobile = styled(Card)({
  padding: '1%',
});

// オークションカード
export const AuctionCardMobile = styled(Card)({
  background: amber['A100'],
  color: grey[700],
  marginLeft: '3%',
  width: '25%',
  height: '10vh',
  'white-space': 'nowrap',
});

// 入札金額を入力してくださいメッセージ
export const BidMessage = styled('p')({
  color: grey[600],
  margin: 0,
});

// 入札金額入力ボックス
export const CoinField = styled(TextField)({
  color: grey[600],
  width: '25%',
  margin: 0,
});

// 入札金額変更ボタン
export const ChangeBidButtonMobile = styled(Button)({
  margin: '2%',
  padding: 0,
  fontSize: '1.5em',
  width: '2%',
  color: grey[100],
  background: cyan[200],
  fontWeight: 'bold',
  'white-space': 'nowrap',
  '&:hover': {
    background: cyan[100],
  },
});

// 入札ボタン
export const BidButtonMobile = styled(Button)({
  background: lightBlue[200],
  color: grey[700],
  width: '40%',
  margin: '2%',
  'white-space': 'nowrap',
  '&:hover': {
    background: lightBlue[100],
  },
});

// アビリティエリア
export const AbilityAreaMobile = styled(Card)({
  background: grey[50],
  color: grey[700],
  margin: '2%',
  padding: '1%',
});

// エリアタグ
export const AreaTagMobile = styled('span')({
  color: grey[700],
  fontSize: '1em',
});

// アビリティボタン（ゲーム中）
export const UseAbilityButtonMobile = styled(Button) ({
  width: '95%',
  'white-space': 'nowrap',
});

// 項カード
export const TermCardMobile = styled(Button)({
  background: yellow[200],
  color: grey[700],
  fontSize: '0.75em',
  marginLeft: '1%',
  marginBottom: '1%',
  width: '5vw',
  height: '10vh',
  flexShrink: 0,
  '&:hover': {
    background: yellow[100],
  },
});

// 計算エリア
export const CalcAreaMobile = styled(Card)({
  margin: '2%',
  padding: '1%',
  background: grey[50],
});

// 折り返し表示用
export const WrapDisplayMobile = styled('div')({
  display: 'flex',
  overflowX: 'scroll',
});

// 解答ボタン
export const CalcButton = styled(Button)({
  background: yellow[200],
  color: grey[700],
  marginLeft: '20%',
  margin: '2%',
  width: '25%',
  'white-space': 'nowrap',
  '&:hover': {
      background: yellow[100],
    },
});

// パスボタン
export const PassButtonMobile = styled(Button)({
  background: grey[500],
  color: grey[50],
  width: '40%',
  margin: '2%',
  'white-space': 'nowrap',
  '&:hover': {
    background: grey[500],
  },
});

// 確認ダイアログタイトル
export const ConfirmTitle = styled(DialogTitle)({
  fontSize: '2em',
  color: grey[700],
});

// 確認ダイアログメッセージ
export const ConfirmMessage = styled(DialogContentText)({
  fontSize: '1.2em',
  color: grey[700],
});

// YESボタン
export const YesButton = styled(Button)({
  background: indigo[200],
  color: grey[50],
  width: '25%',
  margin: '2%',
  'white-space': 'nowrap',
  '&:hover': {
    background: indigo[100],
  },
});

// 残り時間表示エリア
export const TimeAreaMobile = styled('div')({
  color: grey[50],
  margin: 0,
  padding: 0,
});

// 残り時間タグ
export const TimeTagMobile = styled('span')({
  padding: 0,
  color: grey[50],
  fontSize: '1em',
});

// 残り時間値
export const TimeValueMobile = styled('p')({
  margin:  0,
  padding: 0,
  fontSize: '4em',
  fontWeight: 'bold',
});

// 勝利条件タグ
export const GoalTagMobile = styled('span')({
  margin: 0,
  padding: 0,
  color: grey[50],
  fontSize: '1.2em',
});

// 勝利条件メッセージ
export const GoalMessageMobile = styled('p')({
  margin: 0,
  padding: 0,
  color: grey[50],
  fontSize: '1em',
  fontWeight: 'bold',
});

// プレイヤー一覧エリア（自分）
export const MyPlayerListMobile = styled(Card)({
  background: yellow[100],
  color: grey[700],
  margin: '0 5%',
});

// プレイヤー一覧エリア（自分以外）
export const PlayerListMobile = styled(Card)({
  background: grey[50],
  color: grey[700],
  margin: '0 5%',
});

// プレイヤー名
export const PlayerNameMobile = styled('p')({
  fontSize: '1em',
  fontWeight: 100,
  margin: 0,
});

// プレイヤー情報
export const PlayerInfoMobile = styled('span')({
  margin: 0,
  padding: 0,
  fontSize: '1em',
  fontWeight: 100,
});

// プレイヤー情報アイコン
export const PlayerInfoIconMobile = styled('img')({
  width: '15%',
  marginTop: '2%',
});

// アビリティ情報（プレイヤー一覧）
export const AbilityInfoCardMobile = styled(Card) ({
  'white-space': 'nowrap',
  fontSize: '0.75em',
});

// ゲーム終了のモーダル
export const FinishModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ゲーム終了のメニュー
export const FinishMenu = styled('div')({
  background: grey[50],
  boxShadow: 5,
  padding: theme.spacing(4, 12, 8),
});

// ランキングタイトル
export const RankingTitle = styled(Card)({
  "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  color: grey[50],
  background: amber[400],
  fontSize: '4em',
  fontWeight: 500,
  margin: '3%',
  'white-space': 'nowrap',
});

// 優勝者
export const Winner = styled('span')({
  "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  color: amber[500],
  fontSize: '1.5em',
  fontWeight: 500,
  margin: 0,
  'white-space': 'nowrap',
});

// 優勝者情報アイコン
export const WinnerInfoIcon = styled('img')({
  marginLeft: '5%',
  marginRight: '1%',
});

// 敗北者
export const Loser = styled('span')({
  "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  color: grey[700],
  fontSize: '1.5em',
  margin: 0,
  'white-space': 'nowrap',
});

// 敗北者情報アイコン
export const LoserInfoIcon = styled('img')({
  marginLeft: '5%',
  marginRight: '1%',
});

// ゲーム終了してTOP画面に戻るボタン
export const FinishButton = styled(Button)({
  color: grey[700],
  background: indigo[200],
  fontSize: '2em',
  width: '75%',
  marginTop: '5%',
  'white-space': 'nowrap',
  '&:hover': {
      background: indigo[100],
    },
});

// もう一度遊ぶボタン
export const AgainButton = styled(Button)({
  color: grey[700],
  background: blue[200],
  fontSize: '2em',
  width: '75%',
  marginTop: '3%',
  'white-space': 'nowrap',
  '&:hover': {
      background: blue[100],
    },
});

export const useStylesMobile = makeStyles((theme) => ({

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

  // アビリティボタン（速攻）
  bst_ability: {
    background: blue[300],
    width: '75%',
    margin: '2%',
    'white-space': 'nowrap',
    '&:hover': {
      background: blue[200],
    },
  },

  // アビリティボタン（攻撃）
  atk_ability: {
    background: red[300],
    width: '75%',
    margin: '2%',
    'white-space': 'nowrap',
    '&:hover': {
      background: red[200],
    },
  },

  // アビリティボタン（回復）
  rcv_ability: {
    background: teal[300],
    width: '75%',
    margin: '2%',
    'white-space': 'nowrap',
    '&:hover': {
      background: teal[200],
    },
  },

  // アビリティボタン（妨害）
  jam_ability: {
    background: yellow[300],
    width: '75%',
    margin: '2%',
    'white-space': 'nowrap',
    '&:hover': {
      background: teal[200],
    },
  },

  // アビリティボタン（混乱）
  cnf_ability: {
    background: grey[700],
    width: '75%',
    margin: '2%',
    'white-space': 'nowrap',
    '&:hover': {
      background: grey[700],
    },
  },

  // 手札エリア
  hand: {
    background: grey[200],
    marginTop:'2%',
    padding: '1%',
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

  // 正解・不正解エフェクト
  result_animation_mobile: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    margin: 'auto',
    width: '75%',
    padding: '5% 10%',
    zIndex: 100,
    fontSize: '4em',
    opacity: 0,
    'white-space': 'nowrap',
    'animation-name': '$slide',
    'animation-duration': '1.5s',
    'animation-fill-mode': 'forwards',
  },
  '@keyframes slide': {
    '0%': {
      opacity: 0,
      transform: 'translateX(180px)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'translateX(0)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateX(-180px)',
    },
  },

}));