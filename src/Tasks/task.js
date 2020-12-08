import _ from 'lodash';

export class Task {
    static taskName;
    static paramsLength;

    // features
    static uses_table;
    static uses_calculator;
    static uses_convert_table;
    static uses_float_convert_table;

    // interface
    static solve(params) {
        throw new Error('Should be implemented!');
        // eslint-disable-next-line no-unreachable
        return { mainAnswer: 'Empty solution' };
    }

    static check_solution(params, userAnswer) {
        // throw new Error('Should be implemented!');
        // eslint-disable-next-line no-unreachable
        return this.solve(params).toString() === userAnswer.toString();
    }

    static generateTask() {
        throw new Error('Should be implemented!');
        // eslint-disable-next-line no-unreachable
        return { params: [], text: 'description of the task' };
    }

    static getText(params) {
        throw new Error('Should be implemented!');
        // eslint-disable-next-line no-unreachable
        return 'Empty text';
    }

    static reduce(taskDescription, userAnswer) {
        let isCorrect = this.check_solution(taskDescription.params, userAnswer.mainAnswer.value);
        let answer = _.cloneDeep(userAnswer);
        answer.mainAnswer.correct = isCorrect;
        return answer;
    }
}
