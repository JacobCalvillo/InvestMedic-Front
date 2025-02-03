class MaritalStatus {
    public id: number | null
    public name: string


    constructor(name?:string);
    constructor(name?:string, id?:number) {
        this.id = id || null;
        this.name = name || '';
    }
}

export default MaritalStatus;