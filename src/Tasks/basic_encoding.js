import { randInt, Table } from './utilities';
import {Task} from "./task";

export class Task6 extends Task {
    static taskName = 'Равномерный двоичный код для передачи сообщения';
    static paramsLength = 2;

    static solve([a, b]) {
        let amountInfo = Math.floor(Math.log2(a) * b * 100) / 100;
        let volumeInfo = Math.ceil(Math.log2(a)) * b;
        return `${amountInfo};${volumeInfo}`;
    }

    static generateTask() {
        let a = randInt(5, 70);
        let b = randInt(7, 20);
        let params = [a, b];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Составить равномерный двоичный код для передачи сообщений некоторого ${params[0]}-буквенного алфавита. Чему равны количество и объем информации при передачи ${params[1]}-буквенного слова этого алфавита, если все его символы равновероятны? Округлить до сотых.`;
    }
}

export class Task7 extends Task {
    static taskName = 'Минимальная разрядность равномерного троичного кода';
    static paramsLength = 1;

    static solve([a]) {
        let ternary = Math.ceil(Math.log2(a) / Math.log2(3));
        let binary = Math.ceil(Math.log2(a));
        return `${ternary};${binary}`;
    }

    static generateTask() {
        let a = randInt(8, 88);
        let params = [a];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Определить минимальную разрядность равномерного троичного кода для кодирования алфавита из ${params[0]} букв. Как изменится результат, если код будет двоичным?`;
    }
}

export class SimpleCipherEncode extends Task {
    static taskName = 'Кодирование с помощью простой замены';
    static paramsLength = 2;
    static uses_table = true;

    static solve([msg, table]) {
        return Array.from(msg)
            .map((ch) => table.decode(ch))
            .join('');
    }

    static generateTask() {
        let msgLength = 5;
        let alphabetSize = msgLength;
        let table = new Table(alphabetSize);

        let msg = new Array(msgLength)
            .fill(0)
            .map((_) =>
                randInt(0, alphabetSize, (num) => String.fromCharCode('A'.charCodeAt(0) + num))
            )
            .map((ch) => table.encode(ch))
            .join('');

        let params = [msg, table];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Закодировать сообщение ${params[0]} с помощью шифров простой замены`;
    }
}

export class HuffmanEncoding extends Task {
    static taskName = 'Кодирование методом Хаффмана';
    static paramsLength = 2;
    static uses_huffman_tree = true;

    static solve([msg]) {
        class NodeTree {
            constructor(left, right) {
                this.left = left;
                this.right = right;
            }

            children = () => [this.left, this.right];
            nodes = () => this.children();
            toStr = () => `${this.left}_${this.right}`;
        }

        const huffman_code_tree = (node, left = true, binString = '') => {
            if (typeof node === 'string') {
                return { [node]: binString };
            }
            const [l, r] = node.children();
            return {
                ...huffman_code_tree(l, true, binString + '0'),
                ...huffman_code_tree(r, false, binString + '1'),
            };
        };

        let freq = {};
        for (let ch of Array.from(msg)) {
            freq[ch] = freq[ch] ? freq[ch] + 1 : 1;
        }

        let nodes = Object.entries(freq)
            .map(([k, v]) => [k, v])
            .sort(([k1, v1], [k2, v2]) => v2 - v1);

        while (nodes.length > 1) {
            const [key1, c1] = nodes[nodes.length - 1];
            const [key2, c2] = nodes[nodes.length - 2];
            nodes = nodes.slice(0, -2);
            const node = new NodeTree(key1, key2);
            nodes.push([node, c1 + c2]);
            nodes = nodes.sort(([k1, v1], [k2, v2]) => v2 - v1);
        }

        const huffmanCode = huffman_code_tree(nodes[0][0]);
        let answer = Array.from(msg)
            .map((ch) => huffmanCode[ch])
            .join('');
        // console.log(msg, huffmanCode, freq, answer);

        return answer;
    }

    static check_solution(params, userAnswer) {
        return this.solve(params).length === userAnswer.length;
    }

    static generateTask() {
        let msgLength = 10;
        let alphabetSize = randInt(5, 8);
        let msg = Array(msgLength)
            .fill(0)
            .map((ch) =>
                randInt(0, alphabetSize, (num) => String.fromCharCode('A'.charCodeAt(0) + num))
            )
            .join('');

        this.solve([msg]);

        let params = [msg];
        return { params, text: this.getText(params) };
    }

    static getText(params) {
        for (let i = 0; i < this.paramsLength; ++i)
            params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
        return `Построить двоичный код Хаффмана для алфавита использующегося в сообщении ${params[0]} и переписать это сообщение используя полученный код`;
    }
}
