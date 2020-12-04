import { randInt, Table } from './utilities';

export class Task6 {
	static taskName = "Равномерный двоичный код для передачи сообщения"
	static paramsLength = 2;

    static solve([a, b]) {
        let amountInfo = Math.floor(Math.log2(a) * b * 100) / 100;
        let volumeInfo = Math.ceil(Math.log2(a)) * b;
        return `${amountInfo};${volumeInfo}`;
    }

    static generate_task() {
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


export class Task7 {
	static taskName = "Минимальная разрядность равномерного троичного кода"
	static paramsLength = 1;

	static solve([a]) {
		let ternary = Math.ceil(Math.log2(a) / Math.log2(3));
		let binary = Math.ceil(Math.log2(a));
		return `${ternary};${binary}`;
	}

	static generate_task() {
		let a = randInt(8, 88);
		let params = [a];
		return {params, text: this.getText(params)};
	}

	static getText(params) {
		for (let i = 0; i < this.paramsLength; ++i)
			params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
		return `Определить минимальную разрядность равномерного троичного кода для кодирования алфавита из ${params[0]} букв. Как изменится результат, если код будет двоичным?`;
	}
}

export class SimpleCipherEncode {
	static taskName = "Кодирование с помощью простой замены"
	static paramsLength = 2;
	static uses_table = true;

	static solve([msg, table]) {
		return Array.from(msg)
            .map((ch) => table.decode(ch))
            .join('');
	}

	static generate_task() {
		let msgLength = 5;
		let alphabetSize = msgLength;
		let table = new Table(alphabetSize);

		let msg = new Array(msgLength)
			.fill(0)
			.map(_ =>
				randInt(0, alphabetSize, (num) =>
					String.fromCharCode('A'.charCodeAt(0) + num)
				)
			).map((ch) => table.encode(ch)).join('');

		let params = [msg, table];
		return {params, text: this.getText(params)};
	}

	static getText(params) {
		for (let i = 0; i < this.paramsLength; ++i)
			params[i] = params[i] ?? String.fromCharCode('A'.charCodeAt(0) + i);
		return `Закодировать сообщение ${params[0]} с помощью шифров простой замены`;
	}
}
