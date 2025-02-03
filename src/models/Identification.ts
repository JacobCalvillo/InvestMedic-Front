class Identification {
    public id?: number;
    public identificationTypeId: number;
    public number: string;
    public identificationDocumentUrl: string;
  
    constructor(type: number = 0, number: string = '', identificationDocumentUrl: string = '', id?: number) {
      this.id = id;
      this.identificationTypeId = type;
      this.number = number;
      this.identificationDocumentUrl = identificationDocumentUrl;
    }
  }
  
  export default Identification;
  