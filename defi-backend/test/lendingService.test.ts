import { LendingService } from '../src/services/lendingService';

jest.mock('../src/contracts/lendingContract', () => ({
  getContract: () => ({
    deposit: jest.fn(() => ({
      wait: () => Promise.resolve(),
      hash: '0xtesthash'
    }))
  })
}));

describe('LendingService', () => {
  it('should deposit ETH', async () => {
    const result = await LendingService.deposit('0.1');
    expect(result).toEqual({ success: true, hash: '0xtesthash' });
  });
});
