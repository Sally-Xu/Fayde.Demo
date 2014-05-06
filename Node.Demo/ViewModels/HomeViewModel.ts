import TestData = require("Models/TestData");
import Rest = require("lib/Fayde.Utility/Rest");
import Todo = require("Models/Todo");
import ViewModel = require("lib/Fayde.Utility/ViewModel")

class HomeViewModel extends ViewModel {
    Title: string = "Home";
    private _todos: Fayde.Collections.ObservableCollection<Todo> = new Fayde.Collections.ObservableCollection<Todo>();
    get Todos() {
        return this._todos;
    }
    constructor() {
        super();
        this.Load();
        this.PropertyChanged.Subscribe(this.OnDataChanged, this);
    }
    Load() {
        var vm = this;
        Rest.GetAsync("./api/Todos", {"Done":false}).success(function (arry) {
            arry.forEach((t) => {
                vm.Observe(t, "Todo");
                vm._todos.Add(t);
            });
        }).error(function (err) {
            alert(err);
        });
        this.Title = "Home";
    }
    
    private _addCommand: Fayde.Input.ICommand = null;
    get AddCommand(): Fayde.Input.ICommand {
        if (this._addCommand === null) {
            this._addCommand = new Fayde.MVVM.RelayCommand(
                () => this.AddTask(),
                () => { return true; });
        }
        return this._addCommand;
    }
    AddTask() {
        var vm = this;
        var todo = new Todo();
        this.Observe(todo, "Todo");
        this._todos.Add(todo);
    }

    private OnDataChanged(sender: any, e: EventArgs) {
        var d = <Todo>sender;
        var todo = new Todo();
        todo._id = d._id;
        todo.TaskName = d.TaskName;
        todo.Description = d.Description;
        todo.Done = d.Done;
        var vm = this;
        Rest.PutAsync("./api/Todos", todo).success(function (data) {
            if (d._id != data._id) {
                d._id = data._id;  // update data
            }
            if (d.Done)
                vm._todos.Remove(d);
        });
    }
}
export = HomeViewModel;