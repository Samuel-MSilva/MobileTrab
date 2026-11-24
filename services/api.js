// services/api.js
//
// Camada de acesso aos dados. As telas importam as funções DAQUI,
// nunca direto de data/mockData.js.
//
// Hoje as funções leem o mock (com um pequeno atraso para simular a rede).
// Quando a API real chegar, só o corpo de cada função muda, por exemplo:
//
//   export async function getNoticias({ page = 1, perPage = 10, q = '' } = {}) {
//     const url = `${BASE_URL}/api/v1/tenants/${TENANT_SLUG}/noticias?page=${page}&per_page=${perPage}&q=${encodeURIComponent(q)}`;
//     const resposta = await fetch(url);
//     if (!resposta.ok) throw new Error('Falha ao carregar notícias');
//     return resposta.json(); // já vem como { data, meta }
//   }
//
// As telas continuam iguais: elas já tratam carregando e erro.

import {
  tenant,
  noticias,
  notificacoes,
  servicos,
  categoriasOcorrencia,
  ocorrencias,
  telefonesUteis,
  farmaciasPlantao,
  pontosColeta,
  enquetes,
  usuario,
} from '../data/mockData';

// Tabelas de rótulos/cores (não são dados da API, só apresentação).
// Reexportadas aqui para as telas nunca importarem o mock direto.
export {
  tiposNotificacao,
  statusOcorrencia,
} from '../data/mockData';

// const BASE_URL = 'https://news-api.uat.i9tasks.com.br'; // usar na etapa da API real

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// "Banco de dados" em memória: copias dos mocks que podem ser alteradas
// (novas ocorrências, votos). Reiniciam quando o app recarrega.
let ocorrenciasDb = [...ocorrencias];
let enquetesDb = enquetes.map((e) => ({
  ...e,
  opcoes: e.opcoes.map((o) => ({ ...o })),
}));
const enquetesVotadas = {}; // { [enqueteId]: opcaoId }

// ---------------------------------------------------------------------------
// Notícias e notificações (espelham a API real; ver docs em /docs da API)
// Respostas paginadas no formato { data: [...], meta: {...} }
// ---------------------------------------------------------------------------

// Slug da prefeitura usada pelo app (na API real: /api/v1/tenants/:tenantSlug/...)
export const TENANT_SLUG = tenant.slug;

function paginar(lista, page = 1, perPage = 10) {
  const total = lista.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const inicio = (page - 1) * perPage;
  return {
    data: lista.slice(inicio, inicio + perPage),
    meta: { current_page: page, last_page: lastPage, per_page: perPage, total },
  };
}

// A lista de notícias NÃO traz `conteudo` (igual à API): o texto completo
// só vem em getNoticiaPorSlug.
const resumirNoticia = ({ id, titulo, slug, resumo, imagem_capa_url, publicado_em }) => ({
  id, titulo, slug, resumo, imagem_capa_url, publicado_em,
});

const resumirNotificacao = ({ id, titulo, mensagem, tipo, link_acao, enviado_em, expira_em }) => ({
  id, titulo, mensagem, tipo, link_acao, enviado_em, expira_em,
});

// GET /tenants/:tenantSlug  ->  { data: tenant }
export async function getTenant() {
  await delay(100);
  return { data: { ...tenant } };
}

// GET /tenants/:tenantSlug/noticias?page=&per_page=&q=
// opções: { page, perPage, q }
export async function getNoticias({ page = 1, perPage = 10, q = '' } = {}) {
  await delay();
  const agora = new Date();
  const busca = q.trim().toLowerCase();

  const publicadas = noticias
    .filter((n) => n.status === 'publicado' && new Date(n.publicado_em) <= agora)
    .filter(
      (n) =>
        !busca ||
        n.titulo.toLowerCase().includes(busca) ||
        n.resumo.toLowerCase().includes(busca)
    )
    .sort((a, b) => new Date(b.publicado_em) - new Date(a.publicado_em))
    .map(resumirNoticia);

  return paginar(publicadas, page, perPage); // { data, meta }
}

// GET /tenants/:tenantSlug/noticias/:noticiaSlug  ->  { data: noticiaCompleta }
// (igual à API real: endpoints de detalhe devolvem o objeto dentro de `data`)
export async function getNoticiaPorSlug(slug) {
  await delay(200);
  const noticia = noticias.find(
    (n) => n.slug === slug && n.status === 'publicado' && new Date(n.publicado_em) <= new Date()
  );
  if (!noticia) throw new Error('Notícia não encontrada.');
  return { data: noticia };
}

// GET /tenants/:tenantSlug/notificacoes?tipo=&page=&per_page=
// opções: { tipo, page, perPage }  (tipo: alerta | campanha | utilidade_publica | emergencia)
export async function getNotificacoes({ tipo, page = 1, perPage = 10 } = {}) {
  await delay();
  const agora = new Date();

  const ativas = notificacoes
    .filter(
      (n) =>
        n.ativo === 1 &&
        new Date(n.enviado_em) <= agora &&
        (!n.expira_em || new Date(n.expira_em) > agora)
    )
    .filter((n) => !tipo || n.tipo === tipo)
    .sort((a, b) => new Date(b.enviado_em) - new Date(a.enviado_em))
    .map(resumirNotificacao);

  return paginar(ativas, page, perPage); // { data, meta }
}

// GET /tenants/:tenantSlug/notificacoes/:notificacaoId  ->  { data: notificacao }
export async function getNotificacaoPorId(id) {
  await delay(200);
  const notificacao = notificacoes.find((n) => n.id === id && n.ativo === 1);
  if (!notificacao) throw new Error('Aviso não encontrado.');
  return { data: notificacao };
}

// ---------------------------------------------------------------------------
// Usuário (simulado)
// ---------------------------------------------------------------------------

export async function getUsuario() {
  await delay(100);
  return { ...usuario };
}

// ---------------------------------------------------------------------------
// Serviços
// ---------------------------------------------------------------------------

export async function getServicos() {
  await delay(150);
  return [...servicos];
}

// ---------------------------------------------------------------------------
// Ouvidoria / Fala Cidadão
// ---------------------------------------------------------------------------

export async function getCategoriasOcorrencia() {
  await delay(100);
  return [...categoriasOcorrencia];
}

export async function getOcorrencias() {
  await delay();
  return [...ocorrenciasDb].sort(
    (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)
  );
}

// dados: { categoria, descricao, endereco }
export async function criarOcorrencia(dados) {
  await delay(500);

  if (!dados?.categoria || !dados?.descricao?.trim() || !dados?.endereco?.trim()) {
    throw new Error('Preencha categoria, descrição e endereço.');
  }

  const agora = new Date().toISOString();
  const proximoId = ocorrenciasDb.reduce((max, o) => Math.max(max, o.id), 0) + 1;

  const nova = {
    id: proximoId,
    protocolo: `2026-${String(proximoId).padStart(4, '0')}`,
    categoria: dados.categoria,
    descricao: dados.descricao.trim(),
    endereco: dados.endereco.trim(),
    status: 'aberto',
    criadoEm: agora,
    atualizadoEm: agora,
  };

  ocorrenciasDb = [nova, ...ocorrenciasDb];
  return nova;
}

// ---------------------------------------------------------------------------
// Utilidade pública
// ---------------------------------------------------------------------------

export async function getTelefonesUteis() {
  await delay(150);
  return [...telefonesUteis];
}

export async function getFarmaciasPlantao() {
  await delay(150);
  return [...farmaciasPlantao];
}

export async function getPontosColeta() {
  await delay(150);
  return [...pontosColeta];
}

// ---------------------------------------------------------------------------
// Enquetes
// ---------------------------------------------------------------------------

export function enqueteEncerrada(enquete) {
  return new Date(enquete.encerraEm) < new Date();
}

// Devolve as enquetes com dois campos extras calculados:
//  - encerrada: boolean
//  - votoUsuario: id da opção em que o usuário votou (ou null)
export async function getEnquetes() {
  await delay();
  return enquetesDb.map((e) => ({
    ...e,
    encerrada: enqueteEncerrada(e),
    votoUsuario: enquetesVotadas[e.id] ?? null,
  }));
}

// Registra o voto e devolve a enquete atualizada.
export async function votarEnquete(enqueteId, opcaoId) {
  await delay(300);

  const enquete = enquetesDb.find((e) => e.id === enqueteId);
  if (!enquete) throw new Error('Enquete não encontrada');
  if (enqueteEncerrada(enquete)) throw new Error('Esta enquete já foi encerrada.');
  if (enquetesVotadas[enqueteId] != null) throw new Error('Você já votou nesta enquete.');

  const opcao = enquete.opcoes.find((o) => o.id === opcaoId);
  if (!opcao) throw new Error('Opção inválida');

  opcao.votos += 1;
  enquetesVotadas[enqueteId] = opcaoId;

  return {
    ...enquete,
    encerrada: false,
    votoUsuario: opcaoId,
  };
}