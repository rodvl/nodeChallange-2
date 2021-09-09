import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;

  value: number;

  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw Error('Invalid parameters');

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total)
      throw Error('Insufficient balance');

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
