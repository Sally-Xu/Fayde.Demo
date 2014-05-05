import EntityBase = require("Models/EntityBase");

class User extends EntityBase  {
    constructor(public LastName: string, public FirstName: string, public Email: string) {
        super();
    }
    public Password: string;
    getFullName(): string {
        return this.FirstName + " " + this.LastName;
    }
}
export = User;
