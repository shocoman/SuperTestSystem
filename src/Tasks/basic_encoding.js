import { randInt, Table } from './utilities';
import { ProtoTask } from './_ProtoTask';
import _ from 'lodash';

export class Task6 extends ProtoTask {
    static taskName = 'Равномерный двоичный код для передачи сообщения';
    static paramsLength = 2;

    static solve([a, b]) {
        let amountInfo = Math.floor(Math.log2(a) * b * 100) / 100;
        let volumeInfo = Math.ceil(Math.log2(a)) * b;
        return `${amountInfo};${volumeInfo}`;
    }

    static additionalInformation() {
        return 'Ответы следует разделять точкой с запятой, т.е. если количество информации равно 4, а объём 10, то вам следует ввести "4;10"';
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

export class Task7 extends ProtoTask {
    static taskName = 'Минимальная разрядность равномерного троичного кода';
    static paramsLength = 1;

    static solve([a]) {
        let ternary = Math.ceil(Math.log2(a) / Math.log2(3));
        let binary = Math.ceil(Math.log2(a));
        return `${ternary};${binary}`;
    }

    static additionalInformation() {
        return 'Вам нужно ввести два ответа, разделив их точкой с запятой ("AAA;BBB")';
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

export class SimpleCipherEncode extends ProtoTask {
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

export class HuffmanEncoding extends ProtoTask {
    static taskName = 'Кодирование методом Хаффмана';
    static paramsLength = 2;
    static uses_huffman_tree = true;

    static additionalInformation() {
        return 'Для начала вам следует составить дерево. Все ключевые узлы для символов сообщения уже созданы. Для добавления узла-связки нажмите на соответствующую кнопку. Для того, чтобы назначить один узел в потомки другому, перетащите его мышкой на него. После того, как дерево будет составлено, вы должны будете закодировать сообщение в соответствии с ним и ввести ответ в поле ввода. Удачи!';
    }

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
        const root = nodes[0];

        const huffmanCode = huffman_code_tree(root[0]);
        return {
            mainAnswer: Array.from(msg)
                .map((ch) => huffmanCode[ch])
                .join(''),
            tree: root,
            huffmanCode,
        };
    }

    static checkTree(tree) {
        if (tree?.length === 1) {
            let nodes = [];
            const collectNodes = (node, depth) => {
                nodes.push({
                    code: node.code,
                    depth,
                    title: node.title,
                    prob: node.prob,
                    temporary: node.temporary,
                });

                if (node.children) for (let ch of node.children) collectNodes(ch, depth + 1);
            };
            collectNodes(tree[0], 0);

            nodes.sort((a, b) => {
                return a.prob === b.prob ? a.depth - b.depth : a.prob - b.prob;
            });

            for (let i = 0; i < nodes.length; i++) {
                let node_a = nodes[i];

                if (node_a.code.length === 0 && !node_a.temporary) return false;

                for (let j = i + 1; j < nodes.length; j++) {
                    let node_b = nodes[j];

                    let prob_a = Math.floor(node_a.prob * 1000) / 1000,
                        prob_b = Math.floor(node_b.prob * 1000) / 1000;

                    if (
                        node_a.code.length * node_b.code.length > 0 &&
                        node_a.depth < node_b.depth &&
                        prob_a < prob_b
                    ) {
                        // console.log('Something wrong with nodes:', nodes[i], nodes[j]);
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
        return true;
    }

    static decodeMessage([msg], userAnswer) {
        let nodes = [];
        const collectNodes = (node, depth) => {
            nodes.push(node);
            if (node.children) for (let ch of node.children) collectNodes(ch, depth + 1);
        };
        collectNodes(userAnswer.additionalProperties.tree[0], 0);

        let letters = {};
        for (let n of nodes) {
            if (!n.temporary) {
                letters[n.title] = n.code;
            }
        }
        return Array.from(msg)
            .map((char) => letters[char])
            .join('');
    }

    static checkAnswerAndReduce(taskDescription, userAnswer) {
        let { mainAnswer, tree, huffmanCode } = this.solve(taskDescription.params);

        let treeIsCorrect = this.checkTree(userAnswer.additionalProperties?.tree);
        let isCorrect = false;
        let decoded_msg = '';
        if (treeIsCorrect) {
            decoded_msg = this.decodeMessage(taskDescription.params, userAnswer);
            if (decoded_msg === userAnswer.mainAnswer.value.toString()) isCorrect = true;
        }

        let answer = _.cloneDeep(userAnswer);
        answer.additionalProperties.treeIsCorrect = treeIsCorrect;
        answer.mainAnswer.correct = isCorrect;
        answer.mainAnswer.correctAnswer = decoded_msg;

        return answer;
    }

    static generateTask() {
        let msgLength = 10;
        let alphabetSize = randInt(3, 6);
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
