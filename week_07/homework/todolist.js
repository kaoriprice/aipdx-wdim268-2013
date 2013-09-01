$(function(){
	var edit = document.getElementById('edit');
	$(edit).blur(function(){
		localStorage.setItem('todoData', this.innerHTML)
	});

	if(localStorage.getItem('todoData')){
		edit.innerHTML = localStorage.getItem('todoData');
	}
});