function ListsContainer(): JSX.Element {
	return (
		<div id='lists_container' className='show'>
			<input id='list_name_input' placeholder='Nome' />
			<textarea id='list_description_textarea' placeholder='Descricao' />
			<button id='list_create_button'>Criar Lista</button>
		</div>
	);
}

export default ListsContainer;
