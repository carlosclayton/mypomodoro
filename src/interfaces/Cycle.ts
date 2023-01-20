export interface Cycle {
    id: string,
    task: string,
    minutes: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}
