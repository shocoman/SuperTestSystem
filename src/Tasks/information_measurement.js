import { powerOfTwo, randDouble, randInt } from './utilities';
import {Task} from "./task";


export class SizeOfAlphabet extends Task {
    static taskName = "Размер алфавита"
    static paramsLength = 1;
    static uses_calculator = true;

    static solve([bitsInOneLetter]) {
        return Math.pow(2, bitsInOneLetter);
    }

    static generateTask() {
        let bitsInOneLetter = randInt(1, 11);
        let params = [bitsInOneLetter];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Из скольких букв состоит равновероятный алфавит, если одна буква этого алфавита несет ${params[0]} бит(а) информации?`;
    }
}

export class LengthOfMSG extends Task {
    static taskName = "Длина сообщения"
    static paramsLength = 2;
    static uses_calculator = true;

    static solve([a, b]) {
        return b / Math.log2(a | 0);
    }

    static generateTask() {
        let a = randDouble(4, 8, (n) => Math.pow(2, n | 0));
        let b = randDouble(3, 7, (n) => Math.log2(a | 0) * (n | 0));
        let params = [a, b];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Сообщение составлено из символов равновероятного алфавита. Чему равно количество символов в этом сообщении, если известно, что алфавит состоит из ${params[0]} символов, а сообщение несет ${params[1]} бита информации`;
    }
}

export class Task3 extends Task {
    static taskName = "Кол-во информации на экране"
    static paramsLength = 3;
    static uses_calculator = true;

    static solve([a, b, c]) {
        return a * b * Math.log2(c);
    }

    static generateTask() {
        let a = randInt(2, 12, powerOfTwo);
        let b = randInt(2, 12, powerOfTwo);
        let c = randInt(1, 6, powerOfTwo);

        let params = [a, b, c];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Какое количество информации заключается в черно-белом изображении на телеэкране, если экран содержит ${params[0]} линий, каждая линия – ${params[1]} экранных точек, а каждая точка имеет ${params[2]} градаций яркости?`;
    }
}

export class Task4 extends Task {
    static taskName = "Максимальная энтропия системы"
    static paramsLength = 2;
    static uses_calculator = true;

    static solve([a, b]) {
        return a * Math.log2(b);
    }

    static generateTask() {
        let a = randInt(2, 100, (n) => n | 0);
        let b = randInt(1, 6, powerOfTwo);
        let params = [a, b];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Определить максимальную энтропию системы, состоящей из ${params[0]} элементов, каждый из которых может находиться в одном из ${params[1]}-х состояний.`;
    }
}

export class Task5 extends Task {
    static taskName = "Энтропия алфавита"
    static paramsLength = 2;
    static uses_calculator = true;

    static solve([msg]) {
        let letters = {};
        for (let ch of Array.from(msg)) {
            letters[ch] = letters[ch] ? letters[ch]+1 : 1;
        }
        let probs = {};
        for (let [char, n] of Object.entries(letters)) {
            probs[char] = n / msg.length;
        }
        let sum = 0;
        for (let [char, prob] of Object.entries(probs)) {
            sum += prob * Math.log2(prob)
        }

        return -sum;
    }

    static generateTask() {
        let msgLength = 10;
        let alphabetSize = randInt(2, 4);
        let msg = Array(msgLength)
            .fill(0)
            .map((ch) =>
                randInt(0, alphabetSize, (num) =>
                    String.fromCharCode('a'.charCodeAt(0) + num)
                )
            ).join('');

        let params = [msg];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Найти энтропию алфавита, задействованного в сообщении: "${params[0]}"`;
    }
}
