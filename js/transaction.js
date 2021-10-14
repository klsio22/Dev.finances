document.addEventListener('DOMContentLoaded', () => {

  const transactions = [{
      id: 1,
      description: "Luz",
      amount: 100000,
      date: '23/02/2021'
    },
    {
      id: 2,
      description: "Criação website",
      amount: -50000,
      date: '23/02/2021'
    },
    {
      id: 3,
      description: "Internet",
      amount: -15000,
      date: '23/02/2021'
    },
  ];
  //Adiciona as transações
  const Transaction = {
    all: transactions,

    add(transaction) {
      Transaction.all.push(transaction);

      APP.reload();
    },

    incomes() {
      let income = 0;
      Transaction.all.forEach((transactions) => {
        transactions.amount > 0 ? income += transactions.amount : 0;
      })
      return income;
    },

    expenses() {
      let expense = 0;
      Transaction.all.forEach((transactions) => {
        transactions.amount < 0 ? expense += transactions.amount : 0;
      })
      console.log(expense)
      return expense
    },

    total() {
      return Transaction.incomes() + Transaction.expenses();
    }
  };
  //O DOM cria e da os comportamentos aos elementes que iram aparecer na tela
  const DOM = {

    transactionsContainer: document.querySelector('#date-table tbody'),

    addTrasaction(transaction, index) {
      //console.log(transaction)
      let tr = document.createElement('tr');
      tr.innerHTML = DOM.innerHTMLTransaction(transaction);

      DOM.transactionsContainer.appendChild(tr)
      //console.log(DOM.transactionsContainer.appendChild(tr))
      //console.log(tr.innerHtml)
    },

    innerHTMLTransaction(transaction) {
      const CSSclass = transaction.amount > 0 ? "income" : "expense";

      const amount = Util.formatCurrency(transaction.amount);
      const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação">
        </td>
      `;

      return html;
    },
    //Executa e formata as operações da balança dos valores
    updateBalencer() {
      document
        .getElementById('incomeDisplay')
        .innerHTML = Util.formatCurrency(Transaction.incomes())

      document
        .getElementById('expenseDisplay')
        .innerHTML = Util.formatCurrency(Transaction.expenses())

      document
        .getElementById('totalDisplay')
        .innerHTML = Util.formatCurrency(Transaction.total())
    },


    clearTransctions() {
      DOM.transactionsContainer.innerHTML = "";
    }

  }
  //Util.formatCurrency formata o valor do número para o formado da moeda Brasileira 
  const Util = {
    formatCurrency(value) {
      const signal = Number(value) < 0 ? "-" : "";
      value = String(value).replace(/\D/g, "");
      value = Number(value) / 100

      value = value.toLocaleString('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      })

      return signal + value;
    }
  }

  //Executa e faz a releitura das principais funcionalidades do app
  const APP = {
    init() {
      DOM.updateBalencer();

      Transaction.all.forEach((transactions) => {
        DOM.addTrasaction(transactions)
        //console.log(transactions)
      })
    },
    reload() {
      DOM.clearTransctions();
      APP.init();
    }
  }


  APP.init();


/*   Transaction.add({
    id: 39,
    description: "Conta de Água",
    amount: 20000,
    date: '23/02/2021'
  })
 */
});