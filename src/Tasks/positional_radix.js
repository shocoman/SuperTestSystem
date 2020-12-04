import {convertRadix, digitToChar, randInt, Table} from './utilities';

export class ConvertDecimalToN {
    static taskName = "Конвертация из десятичной СС"
    static paramsLength = 2;
    static uses_convert_table = true;

    static solve([number, base]) {
        let remainders = [];
        let bases = [];
        let n = number;
        while (n > 0) {
            remainders.push(n % base);
            bases.push(n);
            n = (n / base) | 0;
        }
        return [remainders.map((a) => digitToChar(a)).reverse().join(''), bases, remainders];
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
    static taskName = "Конвертация в десятичную СС"
    static paramsLength = 2;

    static solve([number, base]) {
        return convertRadix(number, base, 10);
    }

    static generate_task() {
        let base = randInt(2, 17, (a) => (a === 10 ? 11 : a));
        let number =  convertRadix(randInt(1, 1024), 10, base);
        let params = [number, base];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Перевести число ${params[0]} из системы счисления с основанием ${params[1]} в десятичную.`;
    }
}
