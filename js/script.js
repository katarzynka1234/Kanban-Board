$(document).ready(function () {

    //FUNKCJE POMOCNICZE
    //funkcja losująca ciąg 10 znaków
    function randomString() {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    //wtyczka jqueryUI sortable - przenoszenie elementów    
    function initSortable() {
        $('.card-list').sortable({
            connectWith: '.card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    //KANBAN
    var board = {
        name: 'Tablica Kanban',
        createColumn: function(column) {
            this.element.append(column.element);
            initSortable();
        },
        element: $('#board .column-container')
    };

    $('.create-column')
        .click(function() {
            board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
        });

    // KLASA KANBAN COLUMN
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = createColumn();

        //column construction
        function createColumn() {
            //tworzenie nowych wezłow
            var column = $('<div class="column"></div>');
            var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
            var columnCardList = $('<ul class="card-list"></ul>');
            var columnDelete = $('<button class="btn-delete">x</button>');
            var columnAddCard = $('<button class="add-card">Dodaj zadanie</button>');

            //podpięcie zdarzeń pod węzły
            columnDelete.click(function() {
                self.deleteColumn();
            });

            columnAddCard.click(function(event) {
                event.preventDefault();
                self.createCard(new Card(prompt('Tu wpisz zadanie:')));
            });

            //Konstrukcja elemntu kolumny
            column.append(columnTitle)
                .append(columnDelete)
                .append(columnAddCard)
                .append(columnCardList);
            return column;
        }
    }

    Column.prototype = {
        createCard: function (card) {
            this.element.children('ul').append(card.element);
        },
        deleteColumn: function() {
            this.element.remove();
        }
    };

    //KLASA KANBAN CARD
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = createCard();

        function createCard() {
            var card = $('<li class="card"></li>');
            var cardDescription = $('<p clss="card-description">' + self.description + '</p>');
            var cardDeleteBtn = $('<button class="btn-delete">x</button>');

            cardDeleteBtn.click(function() {
                self.removeCard();
            });

            card.append(cardDeleteBtn);
            cardDescription.text(self.description);
            card.append(cardDescription);
            return card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.element.remove();
        }
    };


    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.createColumn(todoColumn);
    board.createColumn(doingColumn);
    board.createColumn(doneColumn);


    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.createCard(card1);
    doingColumn.createCard(card2);

});