// 配列の中身を出力するための関数
export const arrayOutput = (array) => {
    let message = '';
    let loopNum = 1;

    for(let a of array) {
        if(loopNum !== array.length) {
            message += a + ', ';
        }else {
            message += a;
        }
        loopNum++
    }

    return message;
}

// 符号を表示用 or 計算用に変換する関数
export const changeCode = (cards, type) => {
    if(cards) {
        switch(type) {
            case 'display':
                cards.forEach((card, index) => {
                    if(card === '*') {
                        cards[index] = '×';
                    }else if(card === '/') {
                        cards[index] = '÷';
                    }
                })
                break;
            case 'auction':
                cards.forEach((card, index) => {
                    if(card === '*') {
                        cards[index] = '×';
                    }else if(card === '/') {
                        cards[index] = '÷';
                    }
                })
                return cards;
            case 'calculate':
                cards.forEach((card, index) => {
                    if(card === '×') {
                        cards[index] = '*';
                    }else if(card === '÷') {
                        cards[index] = '/';
                    }
                })
                break;
        }
    }
}