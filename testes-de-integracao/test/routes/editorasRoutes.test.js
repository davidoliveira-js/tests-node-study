import {
  describe, it, expect, jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';

let server;

// hooks
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  // fazendo teste de rota GET com supertest e jest
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      // definindo o tipo de dado que espera ser retornado
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;

describe('POST em /editoras', () => {
  // fazendo teste de rota POST com supertest e jest
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'Vide',
        cidade: 'Sao Paulo',
        email: 'v@v.com',
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('PUT em /editoras/id', () => {
  test.each([
    // testando cada elemento do array
    ['nome', { nome: 'Vide editorial' }],
    ['cidade', { cidade: 'Minas Gerais' }],
    ['email', { email: 'vide@yahoo.com.br' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('GET em /editoras/id', () => {
  it('Retornar uma editora específico', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('DELETE em /editoras/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
