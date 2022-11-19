import * as ConstantsMsg from '../../constantsMsg';
import * as Constants from '../../constants';

import { grey, blue } from '@mui/material/colors';

const initialState = {
    players: {
        player: {
            playerId: "", // 自分のプレイヤーID
            playerName: "", // 自分のプレイヤー名
            cards: [], // 自分の現在の手札
            preCards: [], // 自分の1つ前の状態の手札
            cardNum: 0, // 手札の枚数
            coin: 0, // 自分の所持コイン
            isOwner: false, // ルームオーナー権限
            abilities: [], // アビリティ配列
        },
        players: [], // プレイヤー一覧
        ranking: [], // ランキング
    },
    room: {
        roomId: "", // ルームID
        isCpuMatch: false, // CPU対戦かどうか
        isQuickMatch: false, // クイックマッチかどうか
        totalRoomCount: 0, // 現在存在しているルーム数
        availableQMCount: 0, // 現在参加可能なクイックマッチ数
    },
    msg: {
        lang: ConstantsMsg.English, // 言語
        validFlg: false, // バリデーションフラグ
        errMsg: "", // エラーメッセージ
        errMsgVars: [], // 言語変更時エラーメッセージ変数保持配列
        ablErrMsg: "", // アビリティ用エラーメッセージ
        tPage: Constants.T_PAGE1, // チュートリアル表示ページ 
        tlColor: [ // タイムラインの色配列
            {text: blue[700], dot: "primary"}, 
            {text: grey[700], dot: "grey"},
            {text: grey[700], dot: "grey"},
            {text: grey[700], dot: "grey"},
            {text: grey[700], dot: "grey"},
            {text: grey[700], dot: "grey"},
            {text: grey[700], dot: "grey"},
        ],
    },
    game: {
        phase: "", // フェーズ
        phaseTimes: { // 各フェーズ時間
            ready: 0,
            giveCards: 0,
            showTarget: 0,
            showAuction: 0,
            auction: 0,
            auctionResult: 0,
            calculate: 0,
            calculateResult: 0,
            nextTurn: 0
        },
        turn: 1,
        message: "　", // ナビゲーション用メッセージ
        messages: [], // ナビゲーション用複数行メッセージ
        ablMessages: [], // アビリティ用メッセージ配列
        time: 0, // 画面表示用タイマー
        remainingTime: 0, // オークション用残り時間
        remTimeFlg: false, // 残り時間追加フラグ
        goalCoin: 0, // 目標コイン
        targetCard: "　", // ターゲットカード
        auctionCards: [], // オークションカード配列
        ansPlayers: null, // 正解者配列と獲得コイン
        highestBid: 0, // 現在の最高入札額
        highestName: '', // 現在の最高入札額のプレイヤー名
        addedCoin: { // 獲得コイン
            total: 0, // 獲得コインの合計
            cardNumBonus: 0, // カード枚数ボーナスコイン
        },
        aucResult: Constants.NONE, // 落札結果ステータス
        calcResult: Constants.NONE, // 計算結果ステータス
        fluctParams: [], // 変動パラメータエフェクト表示用配列
        firedAbilities: [], // 発動アビリティ配列
        leaveLobbyFlg: false, // ロビー退出フラグ
        finishFlg: false, // ゲーム終了フラグ
        aucBtnFlg: true, // オークション関連ボタン押下可能フラグ
        calcBtnFlg: true, // 計算関連ボタン押下可能フラグ
        firstTurnFlg: true, // 初回ターンフラグ
        targetSkipFlg: false, // ターゲットフェーズスキップフラグ
        handsUpdateFlg: true, // 手札更新フラグ
    }
};

export default initialState;