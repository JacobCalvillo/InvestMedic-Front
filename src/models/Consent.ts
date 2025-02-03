class Consent {
    public id?:number
    public type:string
    public description: string

    constructor(type?:string, description?:string, id?:number) {
        if(id) {
            this.id = id;
        }
        this.description = description || '';
        this.type = type || '';
    }
}
export default Consent;