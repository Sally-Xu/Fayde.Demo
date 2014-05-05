import EntityBase = require("Models/EntityBase");

import User = require("User")
class Todo extends EntityBase {
    public TaskName: string = "NewTask"; 
    public Description: string = ""; 
    public Done: boolean = false;
    public FinishedTime: Date;
    public AssignedTo: User;
}
export = Todo;