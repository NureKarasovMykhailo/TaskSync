
export default class ActivityDomainModel {
    constructor(
        public readonly id: number,
        public readonly activityTitle: string,
        public readonly description: string | null,
        public readonly requiredWorkerCount: number,
        public readonly timeShift: number,
        public readonly complexityId: number | null,
        public readonly educationId: number | null,
        public readonly companyId: number | null
    ) {}
}