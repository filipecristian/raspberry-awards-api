const request = require('supertest');
const app = require('../src/app');
const path = require('path');
const loadCSVService = require('../src/services/load-csv-service');
const migrationCreateProducerMovie = require('../migrations/create-producer-movie');

describe('Integration tests - /awards/intervals', () => {

  beforeEach(async () => {
    await migrationCreateProducerMovie.run();
  });

  it('should return 1 producer with the smallest interval and 1 producer with the largest interval ', async () => {
    await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'case_1.csv'));

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

  it('should return 3 producers with the smallest interval and 3 producers with the largest interval (assorted)', async () => {
    await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'case_2.csv'));;

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

  it('should return 2 producers with the smallest interval and 2 producers with the largest interval (assorted)', async () => {
    await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'case_3.csv'));;

    const res = await request(app).get('/awards/intervals');
    
    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');

    expect(res.body.min.length).toBe(2);

    expect(res.body.min[0].producer).toBe('Joel Silver');
    expect(res.body.min[0].interval).toBe(1);
    expect(res.body.min[0].previousWin).toBe(1989);
    expect(res.body.min[0].followingWin).toBe(1991);

    expect(res.body.min[1].producer).toBe('Matthew Vaughn');
    expect(res.body.min[1].interval).toBe(1);
    expect(res.body.min[1].previousWin).toBe(2002);
    expect(res.body.min[1].followingWin).toBe(2003);

    expect(res.body.max.length).toBe(2);

    expect(res.body.max[0].producer).toBe('Matthew Vaughn');
    expect(res.body.max[0].interval).toBe(22);
    expect(res.body.max[0].previousWin).toBe(1980);
    expect(res.body.max[0].followingWin).toBe(2002);

    expect(res.body.max[1].producer).toBe('Matthew Vaughn');
    expect(res.body.max[1].interval).toBe(22);
    expect(res.body.max[1].previousWin).toBe(2015);
    expect(res.body.max[1].followingWin).toBe(2037);
  });

  it('should return 2 producers with the smallest interval and 2 producers with the largest interval (assorted)', async () => {
    await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'case_3.csv'));;

    const res = await request(app).get('/awards/intervals');
    
    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');

    expect(res.body.min.length).toBe(2);

    expect(res.body.min[0].producer).toBe('Joel Silver');
    expect(res.body.min[0].interval).toBe(1);
    expect(res.body.min[0].previousWin).toBe(1989);
    expect(res.body.min[0].followingWin).toBe(1991);

    expect(res.body.min[1].producer).toBe('Matthew Vaughn');
    expect(res.body.min[1].interval).toBe(1);
    expect(res.body.min[1].previousWin).toBe(2002);
    expect(res.body.min[1].followingWin).toBe(2003);

    expect(res.body.max.length).toBe(2);

    expect(res.body.max[0].producer).toBe('Matthew Vaughn');
    expect(res.body.max[0].interval).toBe(22);
    expect(res.body.max[0].previousWin).toBe(1980);
    expect(res.body.max[0].followingWin).toBe(2002);

    expect(res.body.max[1].producer).toBe('Matthew Vaughn');
    expect(res.body.max[1].interval).toBe(22);
    expect(res.body.max[1].previousWin).toBe(2015);
    expect(res.body.max[1].followingWin).toBe(2037);
  });

  it('should reject with false if csv field year was different from integer', async () => {
    expect.assertions(1);
    try {
      await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'unformatted_1.csv'));
    } catch(e) {
      expect(e).toBe(false);
    }
  });

  it('should reject with false if csv field producers was different from string', async () => {
    expect.assertions(1);
    try {
      await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'unformatted_2.csv'));
    } catch(e) {
      expect(e).toBe(false);
    }
  });

  it('should reject with false if csv field winner was different from yes', async () => {
    expect.assertions(1);
    try {
      await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'unformatted_3.csv'));
    } catch(e) {
      expect(e).toBe(false);
    }
  });

  it('should import if csv field winner was empty', async () => {
    let result = await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'case_4.csv'));
    expect(result).toBe(true);
  });

  it('should reject with false if csv field year was 0', async () => {
    expect.assertions(1);
    try {
      await loadCSVService.importFile(path.join(__dirname, '/mock-csvs/', 'unformatted_4.csv'));
    } catch(e) {
      expect(e).toBe(false);
    }
  });

});
