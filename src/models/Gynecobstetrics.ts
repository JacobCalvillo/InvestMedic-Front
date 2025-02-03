class Gynecobstetrics {
    public id: number | undefined
    public name: string

    constructor(name?: string, id?:number) {
        if(id) {
            this.id = id;
        }
        this.name = name || '';
    }
}

export default Gynecobstetrics;