# Minha Prefeitura

Aplicativo em React Native (Expo) que aproxima o cidadão dos serviços da prefeitura:
notícias, avisos e três módulos de serviço.

Trabalho prático da disciplina de Desenvolvimento Mobile (Prof. Renato Botacim).

## O que o app faz

| Área | O que tem |
|---|---|
| **Início** | Avisos ativos da prefeitura, atalhos de serviços, últimas notícias e busca. Puxe a tela para baixo para atualizar. |
| **Notícias e Avisos** | Lista de notícias com busca e paginação (rolagem infinita). Aba de avisos com filtro por tipo (alerta, emergência, campanha, utilidade pública). |
| **Detalhe da notícia** | Imagem, título, data, resumo e texto completo. Botão de compartilhar. |
| **Módulo 1: Ouvidoria (Fala Cidadão)** | Abrir chamado (tipo do problema, descrição e endereço), com validação. Gera protocolo e mostra o status de cada chamado (aberto, em análise, resolvido). |
| **Módulo 2: Utilidade Pública** | Telefones úteis com botão de ligar, farmácias de plantão (destaca quem está de plantão hoje) e ecopontos com os materiais aceitos. |
| **Módulo 3: Enquetes (Consulta Popular)** | Voto único por enquete e resultado em barras com percentual. Enquetes encerradas mostram só o resultado. |
| **Perfil** | Dados do cidadão (simulados), número de chamados e atalhos. |

## Organização das pastas

```
App.js                    ponto de entrada
navigation/appNavigator   abas inferiores + telas secundárias (stack)
Screens/                  uma pasta por tela (index.js + style.js)
components/               componentes reutilizáveis (cards, cabeçalhos, botões, abas...)
hooks/useCarregar.js      controla carregando / erro / dados de qualquer busca
services/api.js           camada de dados: as telas só falam com este arquivo
data/mockData.js          dados mockados no formato da API
utils/formatadores.js     datas e conversão do HTML das notícias em parágrafos
```

## Dados mockados e a futura API

- As telas **nunca** importam `data/mockData.js`. Elas chamam funções de `services/api.js`
  (`getNoticias`, `getNoticiaPorSlug`, `getNotificacoes`, `criarOcorrencia`, `votarEnquete`...).
- Notícias, avisos e prefeitura seguem **exatamente** os campos da API do professor
  (`https://news-api.uat.i9tasks.com.br/docs`): nomes em snake_case, ids em UUID, datas ISO 8601,
  `conteudo` em HTML, listas no formato `{ data, meta }` e detalhes no formato `{ data }`.
- Para trocar o mock pela API real, só o corpo das funções de `services/api.js` muda
  (há um exemplo comentado no topo do arquivo). As telas continuam iguais, porque já tratam
  carregamento e erro.
- Ouvidoria, utilidade pública e enquetes não existem na API do professor; são dados próprios do app
  (camelCase, ids numéricos). Novos chamados e votos ficam guardados em memória e somem quando o app
  é recarregado.
