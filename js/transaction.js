document.addEventListener('DOMContentLoaded', () => {

  const transactions = [{
      id: 1,
      description: "Luz",
      amount: -50010,
      date: '23/02/2021'
    },
    {
      id: 2,
      description: "Criação website",
      amount: 500012,
      date: '23/02/2021'
    },
    {
      id: 3,
      description: "Internet",
      amount: -20000,
      date: '23/02/2021'
    },
  ];


  const Transaction = {
    incomes() {
      let income = 0;
      transactions.forEach((transactions) => {
        transactions.amount > 0 ? income += transactions.amount : 0;
      })

      income = income.toLocaleString('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      })


      return income;
    },

    expenses() {
      return "Aqui"
    },

    total() {
      return "Totol"
    }
  };
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

    updateBalencer(){
      document
      .getElementById('incomeDisplay')
      .innerHTML = Transaction.incomes()

      document
      .getElementById('expenseDisplay')
      .innerHTML = Transaction.expenses()

      document
      .getElementById('totalDisplay')
      .innerHTML = Transaction.total()
    },


 

  }
  
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


  //*DOM.addTrasaction(transactions[0])

  transactions.forEach((transactions) => {
    DOM.addTrasaction(transactions)
    //console.log(transactions)
  })


  console.log(DOM.updateBalencer())

});