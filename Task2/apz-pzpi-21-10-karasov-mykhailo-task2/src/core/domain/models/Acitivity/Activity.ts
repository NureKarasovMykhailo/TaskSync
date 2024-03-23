import Complexity from "../Complexity/Complexity";
import Education from "../Education/Education";
import User from "../User/User";

export default class Activity {
    constructor(
        public readonly id: number,
        public readonly activityTitle: string,
        public readonly description: string | null,
        public readonly requiredWorkerCount: number,
        public readonly timeShift: number,
        public readonly complexity: Complexity,
        public readonly requiredEducation: Education,
        public readonly users: User[]
    ) {}
}