var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
		var columnName = prompt('Enter a column name');
		$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {
					name: columnName
		},
		success: function(response){
			var column = new Column(response.id, columnName);
			board.createColumn(column);
				}
		});		
	});
	
function initSortable() {
	// var self = this;
	// $.ajax({
	// 	url: baseUrl + '/card' +self.id,
	// 	method: 'PUT',
	// 	data: {

	// 		name: cardName
	// 		bootcamp_kanban_column_id: self.id
	// 	},
	// })
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }