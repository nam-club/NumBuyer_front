import { createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import { grey, yellow, amber, blue, lightBlue, indigo, teal, cyan, red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TimelineContent from '@mui/lab/TimelineContent';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
  width: '100%',
});

// バージョンメッセージ
export const VerMsgMobile = styled('p')({
  marginTop: '30%',
  textAlign: 'left',
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

// 情報メッセージ
export const InfoMsgMobile = styled('p')({
  margin:0,
  padding:0,
  fontSize: '0.75em'
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

// トップ・ロビー画面のメニュー
export const MenuCardMobile = styled(Card)({
  margin: '2% 12.5% 5% 12.5%',
  width: '75%',
});

// エラーメッセージ
export const ErrorMessageMobile = styled('p')({
  fontSize: '1em',
  margin: '5% 10%',
  color: red[600],
  background: red[100],
});

// マッチボタン
export const MatchButtonMobile = styled(Button)({
  display: 'inline-block',
  fontSize: '2em',
  width: '150%',
  margin: '0 10%',
  color: grey[700],
  'whiteSpace': 'nowrap',
});

// アビリティモーダル
export const AbilityModal = styled(Modal)({
  marginTop: '5%',
  marginLeft: '5%',
  marginRight: '5%',
  overflow: 'scroll',
});

// アビリティボタン
export const AbilityButtonMobile = styled(Button)({
  padding: '10%',
  margin: '3%',
  fontSize: '1em',
  width: '100%',
  'whiteSpace': 'nowrap',
});

// アビリティ説明用ツールチップ（アビリティ選択画面）
export const SelectAbilityTooltipMobile = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '75%',
    marginLeft: '10%',
    fontSize: '1em'
  },
});

// アビリティ説明用ツールチップ（ゲーム画面プレイヤー情報）
export const PlayerAbilityTooltipMobile = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '75%',
    marginLeft: '45%',
    fontSize: '1em'
  },
});

// 確定ボタン
export const ConfirmButtonMobile = styled(Button)({
  color: grey[100],
  width: '75%',
  margin: '10%',
  'whiteSpace': 'nowrap',
  fontSize: '2em',
  zIndex: 2,
  background: 'linear-gradient(25deg, #9370db, #000000)',
  '&:hover': {
    background: 'linear-gradient(25deg, #ccb3ff, #000000)',
  },
});

// アビリティタグ
export const AbilityTagMobile = styled('p')({
  color: grey[700],
  margin:'0 5%',
  fontSize: '1em',
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
  'whiteSpace': 'nowrap',
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
  'whiteSpace': 'nowrap',
  background: indigo[200],
  '&:hover': {
    background: indigo[100],
  },
});

// ロビータイトル
export const LobbyTitleMobile = styled(Card)({
  color: grey[100],
  background: indigo[400],
  fontSize: '2em',
  fontWeight: 'bold',
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
  'whiteSpace': 'nowrap',
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
  'whiteSpace': 'nowrap',
  '&:hover': {
    background: indigo[100],
  },
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

// スクロール表示（メッセージ）
export const WrapMessageMobile = styled('div')({
  display: 'flex',
  overflowY: 'scroll',
});

// 目標カード
export const TargetCardMobile = styled(Card)({
  marginLeft: '5%',
  background: teal['A100'],
  color: grey[700],
  'whiteSpace': 'nowrap',
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
  'whiteSpace': 'nowrap',
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
  'whiteSpace': 'nowrap',
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
  'whiteSpace': 'nowrap',
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
  'whiteSpace': 'nowrap',
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

// スクロール表示（カード）
export const WrapCardMobile = styled('div')({
  display: 'flex',
  overflowX: 'scroll',
});

// パスボタン
export const PassButtonMobile = styled(Button)({
  background: grey[500],
  color: grey[50],
  width: '40%',
  margin: '2%',
  'whiteSpace': 'nowrap',
  '&:hover': {
    background: grey[500],
  },
});

// 残り時間表示エリア
export const TimeAreaMobile = styled('div')({
  color: grey[50],
  margin: 0,
  padding: 0,
});

// ターン数タグ
export const TurnTagMobile = styled('p')({
  margin: 0,
  padding: 0,
  color: grey[50],
  fontSize: '1em',
});

// 残り時間値
export const TurnValueMobile = styled('span')({
  margin: 0,
  padding: 0,
  color: grey[50],
  fontSize: '1.5em',
  fontWeight: 'bold',
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
  fontSize: '1em',
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
  fontWeight: 'bold',
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
  'whiteSpace': 'nowrap',
  fontSize: '0.75em',
});

// ゲーム終了のモーダル
export const FinishModalMobile = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5%',
  overflow: 'scroll',
});

// ゲーム終了のメニュー
export const FinishMenuMobile = styled('div')({
  boxShadow: 5,
  padding: theme.spacing(4, 6, 4),
});

// ランキングタイトル
export const RankingTitleMobile = styled(Card)({
  "fontFamily": "\"Ubuntu Condensed\", \"Teko\", \"Mplus 1p\", \"sans-serif\"",
  color: grey[50],
  background: amber[400],
  fontSize: '2em',
  fontWeight: 500,
  margin: '3%',
  'whiteSpace': 'nowrap',
});

// リザルト情報アイコン
export const ResultInfoIconMobile = styled('img')({
  width: '25%'
});

// ゲーム終了してTOP画面に戻るボタン
export const FinishButtonMobile = styled(Button)({
  display: 'inline-block',
  fontSize: '1.5em',
  width: '100%',
  marginTop: '10%',
  color: grey[50],
  background: indigo[200],
  'whiteSpace': 'nowrap',
  '&:hover': {
    background: indigo[100],
  },
});

// もう一度遊ぶボタン
export const AgainButtonMobile = styled(Button)({
  display: 'inline-block',
  fontSize: '1.5em',
  width: '100%',
  marginTop: '10%',
  color: grey[50],
  background: blue[200],
  'whiteSpace': 'nowrap',
  '&:hover': {
    background: blue[100],
  },
});

// TOP画面に戻るボタン
export const BackToTopButtonMobile = styled(Button)({
  color: grey[50],
  background: indigo[200],
  fontSize: '2em',
  width: '75%',
  margin: '5%',
  'whiteSpace': 'nowrap',
  '&:hover': {
      background: indigo[100],
    },
});

export const useStylesMobile = makeStyles((theme) => ({

  // オークションエリア
  auction_root: {
    padding: 10,
    background: grey[300],
    position: 'relative',
    top: 0,
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
    'whiteSpace': 'nowrap',
    '&:hover': {
      background: blue[200],
    },
  },

  // アビリティボタン（攻撃）
  atk_ability: {
    background: red[300],
    width: '75%',
    margin: '2%',
    'whiteSpace': 'nowrap',
    '&:hover': {
      background: red[200],
    },
  },

  // アビリティボタン（回復）
  rcv_ability: {
    background: teal[300],
    width: '75%',
    margin: '2%',
    'whiteSpace': 'nowrap',
    '&:hover': {
      background: teal[200],
    },
  },

  // アビリティボタン（妨害）
  jam_ability: {
    background: yellow[300],
    width: '75%',
    margin: '2%',
    'whiteSpace': 'nowrap',
    '&:hover': {
      background: teal[200],
    },
  },

  // アビリティボタン（混乱）
  cnf_ability: {
    background: grey[700],
    width: '75%',
    margin: '2%',
    'whiteSpace': 'nowrap',
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
    'whiteSpace': 'nowrap',
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