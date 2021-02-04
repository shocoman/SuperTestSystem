import _ from 'lodash';

export class ProtoTask {
    static taskName;
    static paramsLength;

    // features
    static uses_table;
    static uses_calculator;
    static uses_convert_table;
    static uses_float_convert_table;
    static uses_float_grid;

    // interface
    static solve(params) {
        throw new Error('Should be implemented!');
        return { mainAnswer: 'Empty solution' };
    }

    static additionalInformation() {
        // return this.taskName.length % 3 != 0 ? 'AAAAA AAAAA AAAAA AAAAAAAAAAAAAA' : '';
        return 'PLACE HOLDER\n' + this.getText([]);
    }

    static generateTask() {
        throw new Error('Should be implemented!');
        return { params: [], text: 'description of the task' };
    }

    static getText(params) {
        throw new Error('Should be implemented!');
        return 'Empty text';
    }

    static checkAnswerAndReduce(taskDescription, userAnswer) {
        let isCorrect = this.solve(taskDescription.params).toString() === userAnswer.mainAnswer.value.toString();
        let answer = _.cloneDeep(userAnswer);
        answer.mainAnswer.correct = isCorrect;
        return answer;
    }
}
