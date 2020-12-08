import { convertRadix, digitToChar, randBool, randInt } from './utilities';
import { Task } from './task';
import _ from 'lodash';

export class ConvertDecimalToN extends Task {
    static taskName = 'Конвертация из десятичной СС';
    static paramsLength = 2;
    static uses_calculator = true;
    static uses_convert_table = true;

    static solve([number, base]) {
        let remainderParts = [];
        let intParts = [];
        let n = number;
        while (n > 0) {
            remainderParts.push(n % base);
            intParts.push(n);
            n = (n / base) | 0;
        }
        return {
            mainAnswer: remainderParts
                .map((a) => digitToChar(a))
                .reverse()
                .join(''),
            table: intParts.map((a, i) => [a, remainderParts[i]]),
        };
    }

    static reduce(taskDescription, userAnswer) {
        let answer = _.cloneDeep(userAnswer);
        let { mainAnswer, table } = this.solve(taskDescription.params);
        answer.mainAnswer.correct =
            mainAnswer.toString() === userAnswer.mainAnswer.value.toString();

        // compare table
        answer.additionalProperties.table = userAnswer.additionalProperties.table.map(
            ([fst_col, snd_col], i) => [
                { ...fst_col, correct: table[i] && fst_col.value === table[i][0].toString() },
                { ...snd_col, correct: table[i] && snd_col.value === table[i][1].toString() },
            ]
        );

        return answer;
    }

    static check_solution(params, userAnswer) {
        return this.solve(params).mainAnswer === userAnswer;
    }

    static generateTask() {
        let number = randInt(1, 1024);
        let base = randInt(2, 17, (a) => (a === 10 ? 11 : a));
        let params = [number, base];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Перевести число ${params[0]} из десятичной системы в СС с основанием ${params[1]}.`;
    }
}

export class ConvertNtoDecimal extends Task {
    static taskName = 'Конвертация в десятичную СС';
    static paramsLength = 2;
    static uses_calculator = true;

    static solve([number, base]) {
        return convertRadix(number, base, 10);
    }

    static generateTask() {
        let base = randInt(2, 17, (a) => (a === 10 ? 11 : a));
        let number = convertRadix(randInt(1, 1024), 10, base);
        let params = [number, base];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Перевести число ${params[0]} из системы счисления с основанием ${params[1]} в десятичную.`;
    }
}

export class ConvertDecimalFloatToN extends Task {
    static taskName = 'Конвертация дроби из десятичной СС в двоичную';
    static paramsLength = 2;
    static uses_float_convert_table = true;
    static uses_calculator = true;

    static solve([number, base]) {
        let answer = '';
        let num = number;
        while (num !== 0) {
            num *= base;
            if (num < 1) {
                answer += '0';
            } else {
                num -= num | 0;
                answer += 1;
            }
        }
        // console.log(answer);
        return answer;
    }

    static check_solution(params, userAnswer) {
        return this.solve(params).toString() === userAnswer.toString().replace('0.', '');
    }

    static generateTask() {
        let length = randInt(1, 5);
        let base = 2; //randInt(2, 16, (a) => (a === 10 ? 16 : a));

        let ans = 0;
        while (ans === 0) {
            for (let i = 0; i < length; i++) {
                ans += randBool() ? Math.pow(base, -i - 1) : 0;
            }
        }
        let params = [ans, base];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Перевести число с плавающей запятой ${params[0]} из десятичной системы в СС с основанием ${params[1]}.`;
    }
}
