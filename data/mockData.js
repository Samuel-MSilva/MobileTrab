// data/mockData.js
//
// Dados mockados do app "Minha Prefeitura".
// Cada export simula o JSON que uma API REST devolveria:
//  - datas em formato ISO 8601 (use formatarData de utils/formatadores.js para exibir)
//  - notícias e notificações seguem os campos da API real (snake_case);
//    as demais listas são do nosso app (camelCase, ids numéricos)
//
// As telas NÃO devem importar este arquivo direto: usem as funções de
// services/api.js. Assim, quando a API real chegar, só o services muda.

// ---------------------------------------------------------------------------
// ESPELHO DA API REAL (News API - Minha Prefeitura)
//
// Esta parte do mock segue EXATAMENTE os campos da API do professor
// (https://news-api.uat.i9tasks.com.br/docs): nomes em snake_case, ids em UUID,
// datas ISO 8601 e `conteudo` em HTML. Assim, na etapa da API real, só o
// corpo das funções de services/api.js muda e as telas continuam iguais.
//
// Observação: a API real tem 5 prefeituras (serra, cariacica,
// venda-nova-do-imigrante, vila-velha, vitoria). Aqui usamos uma só.
// As demais seções do arquivo (serviços, ouvidoria, enquetes...) não existem
// na API; são dados próprios do nosso app e seguem o padrão camelCase.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// TENANT (prefeitura)  ->  GET /api/v1/tenants/:tenantSlug
// ---------------------------------------------------------------------------
export const tenant = {
  id: '7856bb2c-8d18-4783-a79a-aec5eb534339',
  nome: 'Prefeitura de Vila Velha',
  slug: 'vila-velha',
  codigo_ibge: '3205200',
  ativo: 1,
};

// ---------------------------------------------------------------------------
// NOTÍCIAS  ->  GET /api/v1/tenants/:tenantSlug/noticias
//               GET /api/v1/tenants/:tenantSlug/noticias/:noticiaSlug
// status: 'rascunho' | 'publicado' | 'arquivado'
// A lista (resumo) NÃO traz `conteudo`; só o detalhe traz.
// ---------------------------------------------------------------------------
export const noticias = [
  {
    id: 'a1f0c2b4-1d3e-4f56-8a90-0b1c2d3e4f01',
    tenant_id: tenant.id,
    titulo: 'Campanha de vacinação contra a gripe é prorrogada',
    slug: 'campanha-de-vacinacao-contra-a-gripe-e-prorrogada',
    resumo: 'Unidades de saúde atendem de segunda a sexta, das 8h às 16h.',
    conteudo:
      '<p>A Secretaria de Saúde prorrogou a campanha de vacinação contra a gripe até o fim do mês.</p>' +
      '<p>Todas as unidades básicas de saúde estão aplicando a dose para crianças, idosos, gestantes e grupos prioritários. ' +
      'Leve um documento com foto e a caderneta de vacinação.</p>' +
      '<p>Quem ainda não se vacinou deve procurar a unidade mais próxima de casa.</p>',
    imagem_capa_url: 'https://picsum.photos/seed/prefeitura-vacina/600/300',
    publicado_em: '2026-11-22T10:00:00Z',
    status: 'publicado',
    created_at: '2026-11-21T18:00:00Z',
    updated_at: '2026-11-22T10:00:00Z',
  },
  {
    id: 'a1f0c2b4-1d3e-4f56-8a90-0b1c2d3e4f02',
    tenant_id: tenant.id,
    titulo: 'Obras de recapeamento começam em avenidas do centro',
    slug: 'obras-de-recapeamento-comecam-em-avenidas-do-centro',
    resumo: 'Trânsito terá desvios e sinalização especial durante as obras.',
    conteudo:
      '<p>Começam na próxima segunda-feira as obras de recapeamento em três avenidas do centro.</p>' +
      '<p>Os serviços serão feitos durante a noite para reduzir o impacto no trânsito, com desvios sinalizados ' +
      'e equipes de apoio nas principais esquinas.</p>' +
      '<p>A previsão é de conclusão em 15 dias, se o tempo ajudar.</p>',
    imagem_capa_url: 'https://picsum.photos/seed/prefeitura-obras/600/300',
    publicado_em: '2026-11-21T14:15:00Z',
    status: 'publicado',
    created_at: '2026-11-20T12:00:00Z',
    updated_at: '2026-11-21T14:15:00Z',
  },
  {
    id: 'a1f0c2b4-1d3e-4f56-8a90-0b1c2d3e4f03',
    tenant_id: tenant.id,
    titulo: 'Feira de artesanato movimenta a praça central no fim de semana',
    slug: 'feira-de-artesanato-movimenta-a-praca-central',
    resumo: 'Mais de 40 expositores locais, com música ao vivo e comida típica.',
    conteudo:
      '<p>A praça central recebe neste fim de semana a Feira de Artesanato, reunindo mais de 40 expositores da cidade.</p>' +
      '<p>Haverá música ao vivo, oficinas para crianças e barracas de comida típica.</p>' +
      '<p>A entrada é gratuita e a programação começa às 9h, com encerramento previsto para as 20h.</p>',
    imagem_capa_url: 'https://picsum.photos/seed/prefeitura-feira/600/300',
    publicado_em: '2026-11-19T16:45:00Z',
    status: 'publicado',
    created_at: '2026-11-18T15:00:00Z',
    updated_at: '2026-11-19T16:45:00Z',
  },
  {
    id: 'a1f0c2b4-1d3e-4f56-8a90-0b1c2d3e4f04',
    tenant_id: tenant.id,
    titulo: 'Inscrições abertas para cursos gratuitos de qualificação',
    slug: 'inscricoes-abertas-para-cursos-gratuitos-de-qualificacao',
    resumo: 'São 300 vagas em informática, costura e panificação.',
    conteudo:
      '<p>Estão abertas as inscrições para os cursos gratuitos de qualificação profissional oferecidos pela prefeitura.</p>' +
      '<p>São 300 vagas distribuídas entre informática básica, corte e costura e panificação.</p>' +
      '<p>Os interessados devem se inscrever no Centro de Atendimento ao Cidadão, com documento de identidade e comprovante de residência.</p>',
    imagem_capa_url: 'https://picsum.photos/seed/prefeitura-cursos/600/300',
    publicado_em: '2026-11-18T11:20:00Z',
    status: 'publicado',
    created_at: '2026-11-17T09:00:00Z',
    updated_at: '2026-11-18T11:20:00Z',
  },
  {
    id: 'a1f0c2b4-1d3e-4f56-8a90-0b1c2d3e4f05',
    tenant_id: tenant.id,
    titulo: 'Prefeitura lança programa de revitalização de praças',
    slug: 'prefeitura-lanca-programa-de-revitalizacao-de-pracas',
    resumo: 'Iniciativa vai abranger dez bairros nos próximos meses.',
    conteudo:
      '<p>A prefeitura lançou um programa de revitalização de praças que vai atender dez bairros nos próximos meses.</p>' +
      '<p>Serão feitas reforma de calçadas, troca de iluminação, plantio de árvores e instalação de novos brinquedos.</p>' +
      '<p>A população poderá sugerir melhorias pelo canal da Ouvidoria.</p>',
    imagem_capa_url: 'https://picsum.photos/seed/prefeitura-pracas/600/300',
    publicado_em: '2026-11-16T08:30:00Z',
    status: 'publicado',
    created_at: '2026-11-15T10:00:00Z',
    updated_at: '2026-11-16T08:30:00Z',
  },
  {
    id: 'a1f0c2b4-1d3e-4f56-8a90-0b1c2d3e4f06',
    tenant_id: tenant.id,
    titulo: 'Novo horário de atendimento no Centro de Atendimento ao Cidadão',
    slug: 'novo-horario-de-atendimento-no-centro-de-atendimento-ao-cidadao',
    resumo: 'Atendimento passa a funcionar de 8h às 17h, sem fechar no almoço.',
    conteudo:
      '<p>O Centro de Atendimento ao Cidadão passa a funcionar de 8h às 17h, sem fechar no horário de almoço.</p>' +
      '<p>A mudança vale para emissão de documentos, protocolo de requerimentos e informações sobre tributos.</p>',
    imagem_capa_url: 'https://picsum.photos/seed/prefeitura-atendimento/600/300',
    publicado_em: '2026-11-14T13:00:00Z',
    status: 'publicado',
    created_at: '2026-11-13T16:00:00Z',
    updated_at: '2026-11-14T13:00:00Z',
  },
];

// ---------------------------------------------------------------------------
// NOTIFICAÇÕES (avisos, alertas e campanhas)
//   ->  GET /api/v1/tenants/:tenantSlug/notificacoes?tipo=
//       GET /api/v1/tenants/:tenantSlug/notificacoes/:notificacaoId
// tipo: 'alerta' | 'campanha' | 'utilidade_publica' | 'emergencia'
// ativo: 1 | 0 | expira_em: data ISO ou null (null = não expira)
// ---------------------------------------------------------------------------
export const notificacoes = [
  {
    id: 'f9e8d7c6-b5a4-3210-fedc-ba9876543201',
    tenant_id: tenant.id,
    titulo: 'Alerta de chuva forte para as próximas 48 horas',
    mensagem:
      'A Defesa Civil pede atenção em áreas de encosta e alagamento. Evite atravessar ruas alagadas e, em emergência, ligue 199.',
    tipo: 'alerta',
    link_acao: null,
    enviado_em: '2026-11-23T08:30:00Z',
    expira_em: '2027-01-31T23:59:00Z',
    ativo: 1,
    created_at: '2026-11-23T08:00:00Z',
    updated_at: '2026-11-23T08:30:00Z',
  },
  {
    id: 'f9e8d7c6-b5a4-3210-fedc-ba9876543202',
    tenant_id: tenant.id,
    titulo: 'Rua interditada por rompimento de tubulação',
    mensagem:
      'Trecho da Av. Principal está interditado para reparos de emergência. Use as vias alternativas sinalizadas.',
    tipo: 'emergencia',
    link_acao: null,
    enviado_em: '2026-11-24T07:10:00Z',
    expira_em: '2027-01-31T23:59:00Z',
    ativo: 1,
    created_at: '2026-11-24T07:00:00Z',
    updated_at: '2026-11-24T07:10:00Z',
  },
  {
    id: 'f9e8d7c6-b5a4-3210-fedc-ba9876543203',
    tenant_id: tenant.id,
    titulo: 'Campanha de Alimentos',
    mensagem:
      'Doe 1kg de alimento não perecível no posto de saúde mais próximo. As doações vão para famílias cadastradas.',
    tipo: 'campanha',
    link_acao: 'https://example.com/campanha-alimentos',
    enviado_em: '2026-11-20T09:00:00Z',
    expira_em: '2027-01-31T23:59:00Z',
    ativo: 1,
    created_at: '2026-11-19T17:00:00Z',
    updated_at: '2026-11-20T09:00:00Z',
  },
  {
    id: 'f9e8d7c6-b5a4-3210-fedc-ba9876543204',
    tenant_id: tenant.id,
    titulo: 'Coleta de lixo terá horário alterado no feriado',
    mensagem:
      'A coleta noturna será antecipada para o início da tarde em alguns bairros. Deixe o lixo na calçada só no horário correto.',
    tipo: 'utilidade_publica',
    link_acao: null,
    enviado_em: '2026-11-20T09:00:00Z',
    expira_em: null,
    ativo: 1,
    created_at: '2026-11-19T12:00:00Z',
    updated_at: '2026-11-20T09:00:00Z',
  },
];

// Rótulo e cor de cada tipo de notificação (usado no feed da Home)
export const tiposNotificacao = {
  alerta: { rotulo: 'Alerta', cor: '#FB8C00', icone: 'warning-outline' },
  emergencia: { rotulo: 'Emergência', cor: '#E53935', icone: 'alert-circle-outline' },
  campanha: { rotulo: 'Campanha', cor: '#1E88E5', icone: 'megaphone-outline' },
  utilidade_publica: { rotulo: 'Utilidade pública', cor: '#43A047', icone: 'information-circle-outline' },
};

// ---------------------------------------------------------------------------
// USUÁRIO (cidadão logado - simulado, ainda não existe login)
// ---------------------------------------------------------------------------
export const usuario = {
  id: 1,
  nome: 'Maria da Silva',
  email: 'maria.silva@email.com',
  bairro: 'Praia da Costa',
  cidadaoDesde: '2025-03-10T12:00:00Z',
};

// ---------------------------------------------------------------------------
// SERVIÇOS (atalhos / grade de serviços da prefeitura)
// icone: nome de um ícone do Ionicons (@expo/vector-icons)
// rota: nome da tela para onde o atalho navega (null = ainda sem tela)
// ---------------------------------------------------------------------------
export const servicos = [
  {
    id: 1,
    nome: 'Ouvidoria',
    descricao: 'Registre buracos, lâmpadas queimadas, poda de árvores e mais.',
    icone: 'chatbubbles-outline',
    rota: 'Ouvidoria',
  },
  {
    id: 2,
    nome: 'Utilidade Pública',
    descricao: 'Telefones úteis, farmácias de plantão e coleta seletiva.',
    icone: 'call-outline',
    rota: 'UtilidadePublica',
  },
  {
    id: 3,
    nome: 'Enquetes',
    descricao: 'Vote nas prioridades do seu bairro e da cidade.',
    icone: 'stats-chart-outline',
    rota: 'Enquetes',
  },
  {
    id: 4,
    nome: 'Notícias e Avisos',
    descricao: 'Fique por dentro do que acontece no município.',
    icone: 'newspaper-outline',
    rota: 'News',
  },
];

// ---------------------------------------------------------------------------
// OUVIDORIA / FALA CIDADÃO
// ---------------------------------------------------------------------------
export const categoriasOcorrencia = [
  { id: 'buraco', nome: 'Buraco na via', icone: 'construct-outline' },
  { id: 'iluminacao', nome: 'Lâmpada queimada', icone: 'bulb-outline' },
  { id: 'poda', nome: 'Poda de árvore', icone: 'leaf-outline' },
  { id: 'lixo', nome: 'Lixo acumulado', icone: 'trash-outline' },
  { id: 'esgoto', nome: 'Vazamento / esgoto', icone: 'water-outline' },
  { id: 'outros', nome: 'Outros', icone: 'ellipsis-horizontal-outline' },
];

// status: 'aberto' | 'em_analise' | 'resolvido'
export const statusOcorrencia = {
  aberto: { rotulo: 'Aberto', cor: '#E53935' },
  em_analise: { rotulo: 'Em análise', cor: '#FB8C00' },
  resolvido: { rotulo: 'Resolvido', cor: '#43A047' },
};

export const ocorrencias = [
  {
    id: 1,
    protocolo: '2026-0001',
    categoria: 'buraco',
    descricao: 'Buraco grande na pista, perto do ponto de ônibus. Já causou dois acidentes.',
    endereco: 'Rua das Flores, 120 - Centro',
    status: 'em_analise',
    criadoEm: '2026-11-18T14:30:00Z',
    atualizadoEm: '2026-11-20T09:10:00Z',
  },
  {
    id: 2,
    protocolo: '2026-0002',
    categoria: 'iluminacao',
    descricao: 'Poste sem luz há mais de uma semana, rua muito escura à noite.',
    endereco: 'Av. Brasil, 450 - Bairro Jardim',
    status: 'aberto',
    criadoEm: '2026-11-21T19:05:00Z',
    atualizadoEm: '2026-11-21T19:05:00Z',
  },
  {
    id: 3,
    protocolo: '2026-0003',
    categoria: 'poda',
    descricao: 'Galhos de árvore encostando na fiação da rua.',
    endereco: 'Rua Ipê Amarelo, 33 - Bairro Alto',
    status: 'resolvido',
    criadoEm: '2026-11-10T08:00:00Z',
    atualizadoEm: '2026-11-15T16:40:00Z',
  },
];

// ---------------------------------------------------------------------------
// UTILIDADE PÚBLICA
// ---------------------------------------------------------------------------

// Telefones de emergência nacionais + contatos municipais (fictícios)
export const telefonesUteis = [
  { id: 1, nome: 'SAMU', numero: '192', categoria: 'Emergência', descricao: 'Atendimento médico de urgência' },
  { id: 2, nome: 'Corpo de Bombeiros', numero: '193', categoria: 'Emergência', descricao: 'Incêndios e resgates' },
  { id: 3, nome: 'Polícia Militar', numero: '190', categoria: 'Emergência', descricao: 'Segurança pública' },
  { id: 4, nome: 'Defesa Civil', numero: '199', categoria: 'Emergência', descricao: 'Alagamentos, deslizamentos e riscos' },
  { id: 5, nome: 'Disque Denúncia', numero: '181', categoria: 'Segurança', descricao: 'Denúncias anônimas' },
  { id: 6, nome: 'Central da Prefeitura', numero: '156', categoria: 'Prefeitura', descricao: 'Informações e serviços municipais' },
];

// plantao: dias da semana em que a farmácia está de plantão (0 = domingo ... 6 = sábado)
export const farmaciasPlantao = [
  {
    id: 1,
    nome: 'Farmácia Central',
    endereco: 'Praça da Matriz, 10 - Centro',
    telefone: '(27) 3000-0001',
    horario: '24 horas',
    plantao: [0, 1, 2],
  },
  {
    id: 2,
    nome: 'Farmácia Saúde & Vida',
    endereco: 'Av. Brasil, 890 - Bairro Jardim',
    telefone: '(27) 3000-0002',
    horario: '24 horas',
    plantao: [3, 4, 5],
  },
  {
    id: 3,
    nome: 'Drogaria Popular',
    endereco: 'Rua das Palmeiras, 55 - Bairro Alto',
    telefone: '(27) 3000-0003',
    horario: '08h às 22h',
    plantao: [6, 0],
  },
];

// materiais: tipos de resíduo aceitos no ponto
export const pontosColeta = [
  {
    id: 1,
    nome: 'Ecoponto Centro',
    endereco: 'Rua da Reciclagem, 200 - Centro',
    horario: 'Seg a sáb, 8h às 17h',
    materiais: ['Papel', 'Plástico', 'Vidro', 'Metal'],
  },
  {
    id: 2,
    nome: 'Ecoponto Bairro Jardim',
    endereco: 'Praça das Árvores, s/n - Bairro Jardim',
    horario: 'Seg a sex, 8h às 16h',
    materiais: ['Papel', 'Plástico', 'Óleo de cozinha'],
  },
  {
    id: 3,
    nome: 'Ponto de Eletrônicos',
    endereco: 'Centro de Atendimento ao Cidadão, Av. Principal, 1 - Centro',
    horario: 'Seg a sex, 9h às 15h',
    materiais: ['Pilhas e baterias', 'Eletrônicos', 'Lâmpadas'],
  },
];

// ---------------------------------------------------------------------------
// ENQUETES / CONSULTA POPULAR
// votos: contagem inicial simulada. O voto do usuário é guardado no estado do app.
// ---------------------------------------------------------------------------
export const enquetes = [
  {
    id: 1,
    pergunta: 'Qual obra deve ser prioridade no seu bairro em 2027?',
    descricao: 'Sua opinião ajuda a prefeitura a organizar o orçamento do próximo ano.',
    criadaEm: '2026-11-15T09:00:00Z',
    encerraEm: '2026-12-15T23:59:00Z',
    opcoes: [
      { id: 1, texto: 'Pavimentação das ruas', votos: 128 },
      { id: 2, texto: 'Iluminação pública', votos: 96 },
      { id: 3, texto: 'Praças e áreas de lazer', votos: 74 },
      { id: 4, texto: 'Drenagem e combate a alagamentos', votos: 112 },
    ],
  },
  {
    id: 2,
    pergunta: 'Qual horário você prefere para a coleta seletiva?',
    descricao: 'Queremos ajustar a coleta ao dia a dia da população.',
    criadaEm: '2026-11-10T09:00:00Z',
    encerraEm: '2026-12-05T23:59:00Z',
    opcoes: [
      { id: 1, texto: 'Manhã', votos: 45 },
      { id: 2, texto: 'Tarde', votos: 38 },
      { id: 3, texto: 'Noite', votos: 61 },
    ],
  },
  {
    id: 3,
    pergunta: 'Você apoia a criação de uma ciclovia na avenida principal?',
    descricao: 'Consulta sobre o projeto de mobilidade urbana.',
    criadaEm: '2026-11-01T09:00:00Z',
    encerraEm: '2026-11-20T23:59:00Z', // já encerrada: serve para testar o estado "encerrada"
    opcoes: [
      { id: 1, texto: 'Sim', votos: 210 },
      { id: 2, texto: 'Não', votos: 87 },
      { id: 3, texto: 'Sim, mas em outra via', votos: 64 },
    ],
  },
];