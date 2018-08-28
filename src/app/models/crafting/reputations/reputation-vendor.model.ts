export class ReputationVendor {
    constructor(
        public id: number,
        public name: string,
        public expansion: number,
        public isAlly: boolean,
        public isHorde: boolean,
        public vendors: any,
        public recipesPerProfessionMap: Map<string, any[]>
    ) {}
}
