const request = require('supertest');
const app = require('../src/app');
const path = require('path');

describe('Testes de Integração - /awards/intervals', () => {

  it('deve retornar 1 produtor com menor intervalo e 1 produtor com maior intervalo ', async () => {
    const loadCSV = require('../src/loadCSV');
    await loadCSV.loadCSV(path.join(__dirname, '/mock-csvs/', 'case_1.csv'));;

    const res = await request(app).get('/awards/intervals');
    
    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');


    expect(res.body.min.length).toBe(1);
    expect(res.body.min[0].producer).toBe('Fulano da Silva');
    expect(res.body.min[0].interval).toBe(1);
    expect(res.body.min[0].previousWin).toBe(1997);
    expect(res.body.min[0].followingWin).toBe(1998);

    expect(res.body.max.length).toBe(1);
    expect(res.body.max[0].producer).toBe('Cilano de Oliveira');
    expect(res.body.max[0].interval).toBe(10);
    expect(res.body.max[0].previousWin).toBe(2000);
    expect(res.body.max[0].followingWin).toBe(2010);
  });

  it('deve retornar 3 produtores com menor intervalo e 3 produtores com maior intervalo (sortidos)', async () => {
    const loadCSV = require('../src/loadCSV');
    await loadCSV.loadCSV(path.join(__dirname, '/mock-csvs/', 'case_2.csv'));;

    const res = await request(app).get('/awards/intervals');
    
    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');

    expect(res.body.min.length).toBe(3);

    expect(res.body.min[0].producer).toBe('Fulano da Silva');
    expect(res.body.min[0].interval).toBe(1);
    expect(res.body.min[0].previousWin).toBe(1997);
    expect(res.body.min[0].followingWin).toBe(1998);

    expect(res.body.min[1].producer).toBe('Matheus Ribeiro');
    expect(res.body.min[1].interval).toBe(1);
    expect(res.body.min[1].previousWin).toBe(2001);
    expect(res.body.min[1].followingWin).toBe(2002);

    expect(res.body.min[2].producer).toBe('Jeferson Lima');
    expect(res.body.min[2].interval).toBe(1);
    expect(res.body.min[2].previousWin).toBe(2005);
    expect(res.body.min[2].followingWin).toBe(2006);


    expect(res.body.max.length).toBe(3);

    expect(res.body.max[0].producer).toBe('Bernado da Costa');
    expect(res.body.max[0].interval).toBe(10);
    expect(res.body.max[0].previousWin).toBe(1950);
    expect(res.body.max[0].followingWin).toBe(1960);

    expect(res.body.max[1].producer).toBe('Otto da Silva');
    expect(res.body.max[1].interval).toBe(10);
    expect(res.body.max[1].previousWin).toBe(1950);
    expect(res.body.max[1].followingWin).toBe(1960);

    expect(res.body.max[2].producer).toBe('Cilano de Oliveira');
    expect(res.body.max[2].interval).toBe(10);
    expect(res.body.max[2].previousWin).toBe(2000);
    expect(res.body.max[2].followingWin).toBe(2010);
  });

});
