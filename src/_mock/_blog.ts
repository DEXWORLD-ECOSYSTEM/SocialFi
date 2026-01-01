import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const POST_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'Rascunho' },
];

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Mais recentes' },
  { value: 'popular', label: 'Populares' },
  { value: 'oldest', label: 'Antigos' },
];

// Títulos focados em Monitoramento Cripto para 2026
const POST_TITLES = [
  'Bitcoin rompe barreira histórica: O que esperar para o próximo trimestre?',
  'Top 5 DEXs para maximizar seus rendimentos em 2026',
  'Análise: Por que a Layer 2 da Ethereum está dominando o mercado?',
  'Guia completo: Como proteger seus ativos em carteiras frias',
  'Solana vs. Aptos: A batalha pela escalabilidade em tempo real',
  'O impacto das novas regulamentações de stablecoins na Europa',
  'Airdrops confirmados: Como se qualificar para os maiores protocolos',
  'Web3 Social: O fim das redes centralizadas como conhecemos?',
  'Entenda o algoritmo de consenso da nova rede modular Celestia',
  'Smart Money: Para onde as baleias estão movendo seus fundos hoje?',
  'Tutorial: Criando seu primeiro bot de trading na rede Arbitrum',
  'O futuro dos NFTs: Além das fotos de perfil, utilidade real',
  'Inflação e Cripto: O BTC ainda é o porto seguro digital?',
  'DeFi 2.0: O que mudou na gestão de liquidez institucional',
  'Privacidade em risco? A evolução dos mixers de transações',
  'Jogos Play-to-Earn que realmente são sustentáveis em 2026',
  'Como ler o gráfico de ordens (Order Flow) como um profissional',
  'Metaverso Industrial: Como grandes empresas usam blockchain hoje',
  'Relatório Mensal: As Altcoins com maior potencial de crescimento',
  'Entrevista exclusiva com o fundador da maior corretora do Brasil',
];

const POST_CATEGORIES = [
  'Análise', 'Notícias', 'Preço', 'DEX', 'Altcoins', 
  'Web3', 'Blockchain', 'Vídeo', 'Tutorial', 'Eventos'
];

// ----------------------------------------------------------------------

export const _posts = POST_TITLES.map((title, index) => {
  // Define uma categoria de forma cíclica ou baseada no índice
  const category = POST_CATEGORIES[index % POST_CATEGORIES.length];

  return {
    id: _mock.id(index),
    title,
    category, // 👈 Campo essencial para o seu novo design
    description: _mock.description(index),
    content: _mock.content(index),
    coverUrl: _mock.image.cover(index),
    publish: index % 3 === 0 ? 'draft' : 'published',
    createdAt: _mock.time(index),
    totalViews: _mock.number.nativeL(index),
    totalShares: _mock.number.nativeL(index + 1),
    totalComments: _mock.number.nativeL(index + 2),
    totalFavorites: _mock.number.nativeL(index + 3),
    tags: ['BTC', 'Crypto', 'Trading', 'Web3', 'DeFi'].slice(0, (index % 4) + 2),
    metaTitle: title,
    metaDescription: _mock.description(index),
    metaKeywords: ['crypto', 'news', 'analysis'],
    author: {
      name: _mock.fullName(index),
      avatarUrl: _mock.image.avatar(index),
    },
    favoritePerson: [...Array(5)].map((_, i) => ({
      name: _mock.fullName(i),
      avatarUrl: _mock.image.avatar(i),
    })),
    comments: [...Array(3)].map((_, i) => ({
      id: _mock.id(i),
      name: _mock.fullName(i),
      avatarUrl: _mock.image.avatar(i),
      message: _mock.sentence(i),
      postedAt: _mock.time(i),
      users: [{ id: _mock.id(i), name: _mock.fullName(i), avatarUrl: _mock.image.avatar(i) }],
      replyComment: [],
    })),
  };
});