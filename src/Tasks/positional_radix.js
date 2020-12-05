import { convertRadix, digitToChar, randBool, randInt, Table } from './utilities';

export class ConvertDecimalToN {
    static taskName = 'Конвертация из десятичной СС';
    static paramsLength = 2;
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
        return [
            remainderParts
                .map((a) => digitToChar(a))
                .reverse()
                .join(''),
            intParts,
            remainderParts,
        ];
    }

    static generate_task() {
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

export class ConvertNtoDecimal {
    static taskName = 'Конвертация в десятичную СС';
    static paramsLength = 2;

    static solve([number, base]) {
        return convertRadix(number, base, 10);
    }

    static generate_task() {
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

export class ConvertDecimalFloatToN {
    static taskName = 'Конвертация дроби из десятичной СС в двоичную';
    static paramsLength = 1;
    static uses_convert_table = true;

    static solve([number]) {
        let digitArray = Array.from(number.replace('0.')).map((ch) => parseInt(ch, 10));

        let ans = digitArray.reduce((acc, d, i) => (d === 1 ? acc + Math.pow(2, -i - 1) : acc), 0);
        console.log(ans);
        return ans;
    }

    static check_solution(params, userAnswer) {
        return this.solve(params).toString() === userAnswer.toString().replace('0.', '');
    }

    static generate_task() {
        let length = randInt(2, 4);
        let ans = 0;
        for (let i = 0; i < length; i++) {
            ans += randBool() ? Math.pow(2, -i - 1) : 0;
        }
        let params = [ans];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Перевести число с плавающей запятой ${params[0]} из десятичной системы в СС с основанием 2.`;
    }
}
