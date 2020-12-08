import _ from "lodash";

export function questinator(getParams) {
    return (strings, ...paramNums) => {
        return () => {
            let [params, answer] = getParams();

            let finalString = [];
            for (let i = 0; i < strings.length; i++) {
                finalString.push(strings[i]);
                if (paramNums[i] !== undefined) {
                    finalString.push(params[paramNums[i]].toString());
                }
            }
            return {
                answer: answer,
                text: finalString.join(''),
            };
        };
    };
}

export function randDouble(a, b, callback = (a) => a) {
    return callback(Math.random() * (b - a) + a);
}

export function randInt(a, b, callback = (a) => a) {
    return callback((Math.random() * (b - a) + a) | 0);
}

export function randBool() {
    return Math.random() > 0.5;
}

export function powerOfTwo(n) {
    return Math.pow(2, n | 0);
}

export function shuffleArray(array) {
    let prev = [...array];
    let repeats = true;
    while (repeats) {
        repeats = false;
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        for (let i = 0; i < array.length; ++i) {
            if (prev[i] === array[i]) {
                repeats = true;
            }
        }
    }
}

export class Table {
    constructor(size) {
        let letters = new Array(size)
            .fill(0)
            .map((a, i) => String.fromCharCode('A'.charCodeAt(0) + i));
        shuffleArray(letters);
        let from_letters = [...letters];
        shuffleArray(letters);
        let to_letters = [...letters];

        this.from_table = {};
        this.to_table = {};
        for (let i = 0; i < letters.length; ++i) {
            this.from_table[from_letters[i]] = to_letters[i];
            this.to_table[to_letters[i]] = from_letters[i];
        }
    }

    encode(char) {
        return this.from_table[char]
    }

    decode(char) {
        return this.to_table[char]
    }
}

export function digitToChar(digit) {
    if (digit < 10) {
        return String.fromCharCode( '0'.charCodeAt(0) + digit );
    } else if (digit < 36) {
        return String.fromCharCode( 'A'.charCodeAt(0) + digit - 10 );
    } else {
        return '?';
    }
}

export function convertRadix(num, fromRadix, toRadix) {
    return parseInt(num, fromRadix).toString(toRadix).toUpperCase();
}

export function isClass(o) {
    // doesn't work
    return o.toString().startsWith('class');
}

export class UserAnswer {
    constructor() {
        this.mainAnswer = {
            value: 0,
            correct: false,
        };
        this.additionalProperties = {}
    }

    clone() {
        return _.cloneDeep(this);
    }
}