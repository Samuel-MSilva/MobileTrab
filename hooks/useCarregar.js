// hooks/useCarregar.js
//
// Hook reutilizável para chamar uma função do services/api.js e controlar
// os três estados de qualquer tela que busca dados: carregando, erro e dados.
//
// Uso:
//   const { dados, carregando, erro, recarregar } = useCarregar(() => getServicos());
//   const { dados } = useCarregar(() => getNoticiaPorSlug(slug), [slug]);

import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCarregar(buscar, dependencias = []) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const montado = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executar = useCallback(buscar, dependencias);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const resultado = await executar();
      if (montado.current) setDados(resultado);
    } catch (e) {
      if (montado.current) setErro(e.message || 'Não foi possível carregar.');
    } finally {
      if (montado.current) setCarregando(false);
    }
  }, [executar]);

  useEffect(() => {
    montado.current = true;
    recarregar();
    return () => {
      montado.current = false;
    };
  }, [recarregar]);

  return { dados, setDados, carregando, erro, recarregar };
}
