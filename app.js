// Module Pattern
// Encapsulation : Hides the data from outside scope and expose only public function also known as API.

//Budget Controller
var budgetController = (function() {
   
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //Crate new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id;
            } else {
                ID = 0;
            }
            

            //Create new item based on type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            //Push it into our data structure
            data.allItems[type].push(newItem);

            //return new item
            return newItem;
        },
        testing: function() {
            console.log(data);
        }
    }

})();

//UI Controller
var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };            
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            //Create HTML strings with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%">' +
                        '<div class="item__description">%description%</div>' +
                        '<div class="right clearfix">' +
                        '<div class="item__value">%value%</div>' +
                        '<div class="item__delete">' +
                        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            } else {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%">'+
                        '<div class="item__description">%description%</div>' +
                        '<div class="right clearfix">' +
                        '<div class="item__value">%value%</div>' +
                        '<div class="item__percentage">21%</div>' +
                        '<div class="item__delete">' +
                        '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
            }

            //Replace the placeHolder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMstrings: function() {
            return DOMstrings;
        } 
    };

})();

//Global app Controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }        
        });
    };
    
    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get field input data
        input = UICtrl.getInput();
            
        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. add item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate the budget

        // 5. Display the budget to UI
    };

    return {
        init: function() {
            console.log('Application has started!!');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();