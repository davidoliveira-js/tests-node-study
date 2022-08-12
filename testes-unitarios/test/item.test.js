import Item from '../item';

describe('Testes dos itens', () => {
  it('Deve ter 3 campos: nome, valor e quantidade', () => {
    const item = new Item('Beterraba', 2.5, 10);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2.5);
    expect(item.quantidade).toBe(10);
  });

  it('Deve ter o prçeo calculado de acordo com a quantidade', () => {
    const item = new Item('Batata', 0.3, 10);

    expect(item.pegaValorTotalItem()).toBeCloseTo(3);
  });
});
