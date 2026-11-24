// utils/formatadores.js
// Funções pequenas de formatação usadas em várias telas.

// '2026-11-22T10:00:00Z' -> '22/11/2026'
export function formatarData(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('pt-BR');
}

// '2026-11-22T10:00:00Z' -> '22/11/2026 às 07:00' (horário local do aparelho)
export function formatarDataHora(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${d.toLocaleDateString('pt-BR')} às ${hora}`;
}

// O campo `conteudo` das notícias vem em HTML ("<p>texto</p><p>outro</p>").
// O React Native não renderiza HTML, então convertemos em uma lista de parágrafos
// para mostrar cada um num <Text>:
//   htmlParaParagrafos(noticia.conteudo).map((p, i) => <Text key={i}>{p}</Text>)
export function htmlParaParagrafos(html) {
  if (!html) return [];
  return html
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);
}