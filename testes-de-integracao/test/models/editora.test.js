import { describe, it } from '@jest/globals';
import jest from 'jest-mock';
import Editora from '../../src/models/editora';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'Sao Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    // comparando objetos
    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  // pulando teste com skip
  it.skip('Deve salvar editora no banco de dados', () => {
    const editora = new Editora(objetoEditora);

    // verificando se registro foi salvo no banco de dados
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it.skip('Deve salvar no banco de dados usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    // verificando se o dado solicitado do banco exite e verificando seu tipo
    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve fazer uma chamada simulada no banco de dados', () => {
    const editora = new Editora(objetoEditora);
    // mockando (simulando execução da função)
    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'Sao Paulo',
      email: 'c@c.com',
      created_at: '2022-10-01',
      updated_at: '2022-10-01',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
