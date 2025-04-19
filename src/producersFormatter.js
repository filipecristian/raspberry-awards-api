function organizeProducers(producers) {
    const premiosPorProdutor = producers.reduce((acc, { producer, year }) => {
        if (!acc[producer]) acc[producer] = [];
        acc[producer].push(year);
        acc[producer].sort((a, b) => a - b);
        return acc;
    }, {});
  
  const produtoresComIntervalos = Object.entries(premiosPorProdutor).map(
    ([produtor, years]) => {
      const intervalos = [];
      
      for (let i = 1; i < years.length; i++) {
        intervalos.push({
          intervalo: years[i] - years[i - 1],
          inicio: years[i - 1],
          fim: years[i],
        });
      }
      
      const menor = intervalos.length > 0 
        ? intervalos.reduce((min, curr) => curr.intervalo < min.intervalo ? curr : min) 
        : null;
      
      const maior = intervalos.length > 0 
        ? intervalos.reduce((max, curr) => curr.intervalo > max.intervalo ? curr : max) 
        : null;
      
      return {
        produtor,
        years,
        intervalos,
        menorIntervalo: menor ? menor.intervalo : null,
        anosMenorIntervalo: menor ? [menor.inicio, menor.fim] : null,
        maiorIntervalo: maior ? maior.intervalo : null,
        anosMaiorIntervalo: maior ? [maior.inicio, maior.fim] : null,
      };
    }
  );
  
  const todosIntervalos = produtoresComIntervalos.flatMap(p => 
    p.intervalos.map(i => i.intervalo)
  );
  const menorGlobal = Math.min(...todosIntervalos);
  const maiorGlobal = Math.max(...todosIntervalos);
  
  
  const comMenorIntervalo = produtoresComIntervalos.filter(
    p => p.menorIntervalo === menorGlobal
  );
  const comMaiorIntervalo = produtoresComIntervalos.filter(
    p => p.maiorIntervalo === maiorGlobal
  );
  
  
  const resultado = {
    min: comMenorIntervalo.map(p => ({
        producer: p.produtor,
        interval: menorGlobal,
        previousWin: p.anosMenorIntervalo[0],
        followingWin: p.anosMenorIntervalo[1],
    })),
    max: comMaiorIntervalo.map(p => ({
        producer: p.produtor,
        interval: maiorGlobal,
        previousWin: p.anosMaiorIntervalo[0],
        followingWin: p.anosMaiorIntervalo[1],
    }))
  };
  
  return resultado;
}

module.exports = { organizeProducers };