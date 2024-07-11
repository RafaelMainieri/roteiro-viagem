// objeto {}
const atividade = {
	nome: 'Almoço',
	data: new Date('2024-07-08 10:00'),
	finalizada: true,
};

const atividades = [
	atividade,
	{
		nome: 'Academia em grupo',
		data: new Date('2024-07-09 12:00'),
		finalizada: false,
	},
	{
		nome: 'Gaming session',
		data: new Date('2024-07-10 18:00'),
		finalizada: false,
	},
];

// arroy function → criando os itens
const criarItemDeAtividade = (atividade) => {
	let input = '<input type="checkbox" ';

	if (atividade.finalizada) {
		input += 'checked';
	}
	input += '>';

	return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>${atividade.data}</time>
      </div>`;
};

const section = document.querySelector('section');

for (let atividade of atividades) {
	// muda o conteúdo que está dentro da tag section
	section.innerHTML += criarItemDeAtividade(atividade);
}
