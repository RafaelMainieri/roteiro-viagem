// formatador de data
const formatador = (data) => {
	return {
		dia: {
			numerico: dayjs(data).format('DD'),
			semana: {
				curto: dayjs(data).format('ddd'),
				longo: dayjs(data).format('dddd'),
			},
		},
		mes: dayjs(data).format('MMMM'),
		hora: dayjs(data).format('HH:mm'),
	};
};

formatador(new Date('2024-04-01'));

// atividades
const atividade = {
	nome: 'Almoço',
	data: new Date('2024-07-08 10:00'),
	finalizada: true,
};

let atividades = [
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

// criação e formatação dos itens
const criarItemDeAtividade = (atividade) => {
	let input = `
	<input
		onchange="concluirAtividade(event)" 
		value="${atividade.data}"
		type="checkbox" `;

	// verificação do check
	if (atividade.finalizada) {
		input += 'checked';
	}
	input += '>';

	const formatar = formatador(atividade.data);

	return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>
			${formatar.dia.semana.longo}, dia
		 	${formatar.dia.numerico} de
			${formatar.mes} às
		 	${formatar.hora}h
		</time>
      </div>`;
};

// atualização dos itens (mostrar na página)
const atualizarListaDeAtividades = () => {
	const section = document.querySelector('section');
	section.innerHTML = '';

	if (atividades.length == 0) {
		section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`;
		return;
	}

	for (let atividade of atividades) {
		// muda o conteúdo que está dentro da tag section
		section.innerHTML += criarItemDeAtividade(atividade);
	}
};
atualizarListaDeAtividades();

const salvarAtividade = (event) => {
	event.preventDefault();
	const dadosDoFormulario = new FormData(event.target);

	const nome = dadosDoFormulario.get('atividade');
	const dia = dadosDoFormulario.get('dia');
	const hora = dadosDoFormulario.get('hora');
	const data = `${dia} ${hora}`;

	const novaAtividade = {
		nome,
		data,
		finalizada: false,
	};

	const atividadeExiste = atividades.find((atividade) => {
		return atividade.data == novaAtividade.data;
	});

	if (atividadeExiste) {
		return alert('Dia/Hora não disponível');
	}

	atividades = [novaAtividade, ...atividades]; // esses ... servem pra colocar as atividades antigas na lista
	atualizarListaDeAtividades();
};

// opções de dias
const criarDiasSelecao = () => {
	const dias = ['2024-02-28', '2024-02-29', '2024-03-01', '2024-03-02', '2024-03-03'];

	let diasSelecao = '';

	for (let dia of dias) {
		const formatar = formatador(dia);
		const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`;

		diasSelecao += `
		<option value="${dia}">${diaFormatado}</option>`;
	}

	// procura a tag select que tem como name=dia
	document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
};
criarDiasSelecao();

// opções de horário
const criarHorasSelecao = () => {
	let horasDisponiveis = '';

	for (let i = 0; i < 24; i++) {
		horasDisponiveis += `<option value="${i}:00">${i}:00</option>`;
		horasDisponiveis += `<option value="${i}:30">${i}:30</option>`;
	}

	document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis;
};
criarHorasSelecao();

const concluirAtividade = (event) => {
	const input = event.target;
	const dataDesteInput = input.value;

	// uma especie de verificação dentro da função
	const atividade = atividades.find((atividade) => {
		return atividade.data == dataDesteInput;
	});

	if (!atividade) {
		return;
	}

	// inverte a info (se era true vira false, se era false vira true)
	atividade.finalizada = !atividade.finalizada;
};
