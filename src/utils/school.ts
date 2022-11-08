import { Award, StudentData } from './student'
import axios from 'axios'
import {
	AtividadeDataOutput,
	AtualizarAtividadeDataInput,
	CriarAtividadeDataInput,
} from '../types/atividades.type'
import { CLIENT_URL } from './client'
import { MaterialCategory } from '../data/materialTable'
import { formatarDataDateToString } from './formatData'

interface SchoolData {
	id: string
	idLogin: string
	nome: string
	email: string
	nomeGestor: string
}

export async function getSchoolDataFromToken(token: string): Promise<SchoolData> {
	return await axios
		.get(`${CLIENT_URL}/escola/perfilEscola`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SchoolData
			return x
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export interface SchoolRank {
	nome: string
	pontos: number
}

export async function getSchoolRank(token: string): Promise<SchoolRank[]> {
	return await axios
		.get(`${CLIENT_URL}/escola/listarRankingEscolas`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SchoolRank[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function getSchoolPointsById(id: string, token: string): Promise<number> {
	return await axios
		.get(`${CLIENT_URL}/escola/pontosEscola`, {
			params: {
				idEscola: id,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as number
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface SchoolAwardsWithdraw {
	id: string
	status: number
	created_at: string
	aluno: {
		id: string
		matricula: string
		nome: string
		sexo: string
		idade: number
		serie: number
		pontos: number
	}
	premio: {
		id: string
		nome: string
		preco: number
	}
	statusEntrega: string
}

export async function getSchoolAwardsWithdrawHistory(
	token: string,
): Promise<SchoolAwardsWithdraw[]> {
	return await axios
		.get(`${CLIENT_URL}/resgatePremio/listar`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SchoolAwardsWithdraw[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function getStudentByMatricula(
	matricula: string,
	token: string,
): Promise<StudentData> {
	return await axios
		.get(`${CLIENT_URL}/escola/consultarAlunoMatricula/${matricula}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as StudentData
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface Entrega {
	id: string
	escola: string
	idMaterial: string
	pesagemEntrega: string
	pontosEntrega: string
	created_at: string
	aluno: StudentData
}

export async function getSchoolDeliveryHistory(token: string): Promise<Entrega[]> {
	return await axios
		.get(`${CLIENT_URL}/escola/consultarEntregasCompletas`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as Entrega[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function getStudentsList(token: string): Promise<StudentData[]> {
	return await axios
		.get(`${CLIENT_URL}/escola/listarAlunos`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as StudentData[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

interface CadastroAlunoForm {
	nome: string
	serie: string
	matricula: string
	sexo: string
	idade: number
}

export async function registerStudent(
	token: string,
	aluno: CadastroAlunoForm,
): Promise<StudentData[]> {
	return await axios
		.post(
			`${CLIENT_URL}/escola/cadastrarAluno`,
			{
				nome: aluno.nome,
				serie: aluno.serie,
				matricula: aluno.matricula,
				sexo: aluno.sexo,
				idade: aluno.idade,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			const x = res.data as any
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface DadosEntrega {
	idMaterial: string
	pesagemEntrega: number
}

export async function criarEntrega(
	token: string,
	matricula: string,
	dadosEntrega: DadosEntrega[],
): Promise<{ pontosRecebidos: number; statusPontuacaoAluno: string }> {
	console.log(matricula)
	return await axios
		.post(
			`${CLIENT_URL}/escola/criarEntrega`,
			{
				matriculaAluno: matricula,
				dadosEntrega: dadosEntrega,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			const x = res.data as any
			return x
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

interface AlterarAlunoData {
	matriculaAluno: string
	novaIdade: number
	novoNome: string
	novaSerie: string
	novoSexo: string
}

export async function editarAluno(token: string, data: AlterarAlunoData) {
	await axios
		.patch(
			`${CLIENT_URL}/escola/alterarAlunos`,
			{
				matriculaAluno: data.matriculaAluno,
				novaIdade: data.novaIdade,
				novaSerie: data.novaSerie,
				novoNome: data.novoNome,
				novoSexo: data.novoSexo,
			} as AlterarAlunoData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function criarAtividade(token: string, data: CriarAtividadeDataInput) {
	await axios
		.post(
			`${CLIENT_URL}/escola/criarAtividade`,
			{
				nomeAtividade: data.nomeAtividade,
				pontos: data.pontos,
				serie: data.serie,
				descricao: data.descricao,
				prazoFinal: data.prazoFinal,
			} as CriarAtividadeDataInput,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export async function listarAtividades(token: string): Promise<AtividadeDataOutput[]> {
	return await axios
		.get(`${CLIENT_URL}/escola/listarAtividades`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as AtividadeDataOutput[]
			return x
		})
		.catch(err => {
			throw new Error('aaa')
		})
}

export async function atualizarAtividade(token: string, data: AtualizarAtividadeDataInput) {
	await axios
		.patch(
			`${CLIENT_URL}/escola/alterarAtividade`,
			{
				idAtividade: data.idAtividade,
				novoNome: data.novoNome,
				novaDescricao: data.novaDescricao,
				novaSerie: data.novaSerie,
				novaPontuacao: data.novaPontuacao,
				novoPrazo: data.novoPrazo,
			} as AtualizarAtividadeDataInput,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			console.log('aa')
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function excluirAtividade(token: string, atividadeId: string) {
	await axios
		.delete(`${CLIENT_URL}/escola/atividade`, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			data: {
				idAtividade: atividadeId,
			},
		})
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function listarPremios(token: string): Promise<Award[]> {
	return await axios
		.get(`${CLIENT_URL}/premio/listar`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as Award[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function resgatarPremio(token: string, matriculaAluno: string, premio: string) {
	await axios
		.post(
			`${CLIENT_URL}/escola/criarResgatePremios`,
			{
				matriculaAluno: matriculaAluno,
				premio: premio,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			console.log(res.data)
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export async function atualizarEstoque(token: string, premioId: string, quantidade: number) {
	await axios
		.patch(
			`${CLIENT_URL}/escola/addEstoque/${premioId}`,
			{
				quantidadeAdicionada: quantidade,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function deletarAluno(token: string, studentId: string) {
	await axios
		.patch(
			`${CLIENT_URL}/escola/deletarAluno/${studentId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export async function deletarAtividade(token: string, atividadeId: string) {
	await axios
		.patch(
			`${CLIENT_URL}/escola/deletarAtividade`,
			{
				idAtividade: atividadeId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export async function entregarAtividade(
	token: string,
	idAtividade: string,
	matriculaAluno: string,
) {
	await axios
		.post(
			`${CLIENT_URL}/escola/entregaAtividade`,
			{
				idAtividade: idAtividade,
				matriculaAluno: matriculaAluno,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			console.log(res.data)
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export interface MaterialOutput {
	id: string
	nomeMaterial: string
	pontosPorKg: number
	categoria: MaterialCategory
}

export async function listarMateriais(token: string): Promise<MaterialOutput[]> {
	return await axios
		.get(`${CLIENT_URL}/material/listar`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as MaterialOutput[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface SolicitacaoAtividadeOutput {
	id: string
	status: 'PENDENTE' | 'CONCLUIDO' | string
	idEscola: string
	__atividade__: {
		nome: string
		id: string
		pontos: number
	}
	aluno: {
		nome: string
		matricula: string
		serie: string
	}
	__has_atividade__: boolean
}

export async function listarSolicitacoesAtividades(
	token: string,
): Promise<SolicitacaoAtividadeOutput[]> {
	return axios
		.get(`${CLIENT_URL}/escola/listarEntregasAtividade`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SolicitacaoAtividadeOutput[]
			return x
		})
		.catch(err => {
			throw new err(err)
		})
}

export async function aceitarEntregaAtividade(
	token: string,
	idEntregaAtividade: string,
	matriculaAluno: string,
) {
	console.log(idEntregaAtividade, matriculaAluno)
	await axios
		.patch(
			`${CLIENT_URL}/escola/confirmarEntregaAtividade`,
			{
				idEntregaAtividade: idEntregaAtividade,
				matriculaAluno: matriculaAluno,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export interface HistoricoResgate {
	statusEntrega: string
	idResgate: string
	dataCriacaoResgate: string
	escola: {
		nome: string
		gestor: string
	}
	aluno: {
		nome: string
		matricula: string
		pontos: string
	}
	premio: {
		id: string
		nome: string
		preco: number
		especificacao: string
		estoque: number
	}
}

export async function obterHistoricoDeResgates(
	token: string,
	dataInicio: Date,
	dataFim: Date,
	idEscola: string,
): Promise<HistoricoResgate[]> {
	return axios
		.get(`${CLIENT_URL}/escola/histResgateAdm`, {
			params: {
				idLoginEscola: idEscola,
				dataInicio: formatarDataDateToString(dataInicio, 'mm-dd-yyyy', '-'),
				dataFim: formatarDataDateToString(dataFim, 'mm-dd-yyyy', '-'),
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as HistoricoResgate[]
			return x
		})
		.catch(err => {
			throw new err(err)
		})
}
