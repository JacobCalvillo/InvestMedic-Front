class Insurance {
    public id?: number
    public name: string

    constructor(name: string, id?:number) {
        if(id) {
            this.id = id;
        }
        this.name = name || '';
    }
}

export default Insurance;