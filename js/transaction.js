document.addEventListener('DOMContentLoaded', () => {

  //Adiciona as transações
  const Transaction = {
    all: [{
        description: "Luz",
        amount: 100000,
        date: '23/02/2021'
      },

      {

        description: "Criação website",
        amount: -50000,
        date: '23/02/2021'
      },


      {
        description: "Conta de Água",
        amount: -50000,
        date: '23/02/2021'
      },

      {
        description: "Internet",
        amount: -15000,
        date: '23/02/2021'
      },
    ],

    add(transaction) {
      Transaction.all.push(transaction);

      APP.reload();
    },

    remove(index) {
      Transaction.all.splice(index, 1);
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
    formatAmount(value) {
      
      value = Number(value) * 100
      return value
    },

    formatDate(date){
      const splitteDate = date.split('-')
      //return `${splitteDate[]} `;
      console.log(splitteDate)
    },

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

  const Form = {
    onSubmit: document.querySelector('#form'),
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
      return {
        description: Form.description.value,
        amount: Form.amount.value,
        date: Form.date.value,
      }
    },

    validateFields() {
      const {
        description,
        amount,
        date
      } = Form.getValues();

      if (description.trim() === "" ||
        amount.trim() === "" ||
        date.trim() === "") {
        throw new Error("Por favor , preencha todos os campos")
      }

      //console.log(description)
      //console.log('Validar os campos')
    },

    formatValues() {
      let {
        description,
        amount,
        date
      } = Form.getValues();

       amount = Util.formatAmount(amount);
       date = Util.formatDate(date)

    },

    logSubmit(event) {
      event.preventDefault();

      try {

        //Form.validateFields();
        //Formar os dados para salvar
        Form.formatValues();
        //salvar
        //apagar os dados do fomulario
        //modal fache
        //Atualizar aplicação


      } catch (error) {
        alert(error.message)
      }

      //console.log(event)
    },

    submit() {
      //https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
      Form.onSubmit.addEventListener('submit', Form.logSubmit)
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

  Form.submit();

  APP.init();

});