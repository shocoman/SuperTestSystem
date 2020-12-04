import * as encodingTasks from './basic_encoding';
import * as informationTasks from './information_measurement';
import * as radixTasks from './positional_radix';
import { isClass } from './utilities';

const allTasks = [informationTasks, encodingTasks, radixTasks].flatMap((t, i) =>
    Object.entries(t)
        .filter(([k, v]) => isClass(v))
        .map(([k, v]) => v)
);
export default allTasks;