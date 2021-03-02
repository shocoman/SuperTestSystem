import { convertRadix, digitToChar, randBool, randDouble, randInt } from './utilities';
import { ProtoTask } from './_ProtoTask';
import _ from 'lodash';

export class ConvertDecimalToN extends ProtoTask {
    static taskName = 'Конвертация из десятичной СС';
    static paramsLength = 2;
    static uses_calculator = true;
    static uses_convert_table = true;

    static additionalInformation() {
        return 'Вам также следует заполнить таблицу перевода (правила вам известны). Для добавления новой строки, поставьте курсой на последнюю (строку) и нажмите Enter. Для удаления последней строки, поставьте курсор на последнюю и нажмите Backspace.';
    }

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
            table: intParts.map((a, i) => [a, remainderParts[i]])
        };
    }

    static checkAnswerAndReduce(taskDescription, userAnswer) {
        let answer = _.cloneDeep(userAnswer);
        let { mainAnswer, table } = this.solve(taskDescription.params);
        answer.mainAnswer.correct =
            mainAnswer.toString() === userAnswer.mainAnswer.value.toString();

        // compare table
        answer.additionalProperties.table = userAnswer.additionalProperties.table.map(
            ([fst_col, snd_col], i) => [
                { ...fst_col, correct: table[i] && fst_col.value === table[i][0].toString() },
                { ...snd_col, correct: table[i] && snd_col.value === table[i][1].toString() }
            ]
        );
        answer.mainAnswer.correctAnswer = mainAnswer.toString();

        return answer;
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

export class ConvertNtoDecimal extends ProtoTask {
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
        return `Перевести число ${params[0]} из системы счисления с основанием ${params[1]} в десятичную СС.`;
    }
}

export class ConvertDecimalFloatToN extends ProtoTask {
    static taskName = 'Конвертация дроби из десятичной СС в двоичную';
    static paramsLength = 2;
    static uses_float_convert_table = true;
    static uses_calculator = true;

    static additionalInformation() {
        return 'Вам также следует заполнить таблицу перевода (правила вам известны). Для добавления новой строки, поставьте курсой на последнюю (строку) и нажмите Enter. Для удаления последней строки, поставьте курсор на последнюю и нажмите Backspace.';
    }

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
        return answer;
    }

    static checkAnswerAndReduce(taskDescription, userAnswer) {
        const userAnswerString = userAnswer.mainAnswer.value.toString().replace('0.', '');
        const correctAnswer = this.solve(taskDescription.params).toString();
        const isCorrect = correctAnswer === userAnswerString;
        let answer = _.cloneDeep(userAnswer);
        answer.mainAnswer.correct = isCorrect;
        answer.mainAnswer.correctAnswer = correctAnswer;

        return answer;
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

export class FloatRepresentationTask extends ProtoTask {
    static taskName = 'Представление чисел с плавающей запятой';
    static paramsLength = 1;
    static uses_calculator = true;
    static uses_float_grid = true;

    static additionalInformation() {
        return 'Для выделения диапазона битов, вам нужно мышкой переместить чёрные стрелочки (они находятся в нижнем правом углу разрядной сетки). Для изменения значения бита, нажимайте на X сверху.';
    }

    static solve([numberString]) {
        let num = 0;
        switch (numberString) {
            case '-Infinity':
                num = -Infinity;
                break;
            case 'Infinity':
                num = Infinity;
                break;
            case '0':
                num = 0;
                break;
            case 'NaN':
                num = NaN;
                break;
            default:
                num = Number.parseFloat(numberString);
                break;
        }
        const answer = this.FloatToIEEE(num);
        return answer;
    }

    static FloatToIEEE(f) {
        let buf = new ArrayBuffer(8);
        (new Float32Array(buf))[0] = f;
        return ((new Uint32Array(buf))[0] >>> 0).toString(2).padStart(32, '0');
    }

    static IEEEToDouble(f) {
        let buffer = new ArrayBuffer(8);
        (new Uint32Array(buffer))[0] = Number.parseInt(f, 2);
        return new Float32Array(buffer)[0];
    }

    static checkAnswerAndReduce(taskDescription, userAnswer) {
        const correctAnswer = this.solve(taskDescription.params).toString();

        let mainAnswerIsCorrect = correctAnswer === userAnswer.mainAnswer.value.toString();
        let selectedBitsAreCorrect = true;
        let enteredNumberIsCorrect = true;

        const selectedBits = userAnswer.additionalProperties.float_grid.selectedBits;
        const enteredNumber = userAnswer.additionalProperties.float_grid.enteredNumber;

        if (!selectedBits) selectedBitsAreCorrect = false;
        else if ([...selectedBits].sort().toString() !== [24, 31].toString()) selectedBitsAreCorrect = false;

        if (!enteredNumber) enteredNumberIsCorrect = false;
        if (enteredNumber !== correctAnswer) enteredNumberIsCorrect = false;
        if (!selectedBitsAreCorrect || !enteredNumberIsCorrect) mainAnswerIsCorrect = false;

        let answer = _.cloneDeep(userAnswer);
        answer.mainAnswer.correct = mainAnswerIsCorrect;
        answer.additionalProperties.float_grid.correct = enteredNumberIsCorrect;
        answer.additionalProperties.float_grid.bitsCorrect = selectedBitsAreCorrect;
        answer.mainAnswer.correctAnswer = correctAnswer;

        return answer;
    }

    static generateTask() {
        let specialCases = ['-Infinity', 'Infinity', '0', 'NaN'];
        let useSpecialCase = randDouble(0, 1.0) < 0.3;

        let length = randInt(0, 4);
        let number = 0;
        for (let i = 0; i < length; i++) {
            number += randBool() ? Math.pow(2, -i - 1) : 0;
        }
        number += randInt(0, 32);
        if (randBool()) number *= -1;

        let toConvert = useSpecialCase ? specialCases[randInt(0, 4)] : number.toString();
        let params = [toConvert];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        // +-Inf, 0, NaN
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Выберите диапазон битов, выделенных для экспоненты в представлении числа с плавающей запятой.
         А также запишите '${params[0]}' в эту разрядную сетку согласно правилам.`;
    }
}

