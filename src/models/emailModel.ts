

export class EmailModel{
   private create_date:string;
   private email_address:  string
    constructor(email_address:string) {
        this.email_address = email_address.trim();
        this.create_date = new Date().toJSON();
    }
}
