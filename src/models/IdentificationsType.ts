class IdentificationsType {
    public id: number | null
    public type: string

    constructor(id?:number, type?: string) {
        this.id = id || null
        this.type = type || ''
    }
}

export default IdentificationsType