import {
  Modal
} from './openAndClose.js';

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
    //console.log(value)
    return value
  },

  formatDate(date) {
    const splitteDate = date.split('-')
    //console.log(splitteDate)
    return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate [0]}`;
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
    //console.log(Form.getValues())
  },

  formatValues() {
    let {
      description,
      amount,
      date
    } = Form.getValues();

    amount = Util.formatAmount(amount);
    date = Util.formatDate(date);

    return {
      description,
      amount,
      date
    }

  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  logSubmit(event) {
    event.preventDefault();

    try {
      //verificar se is campos estão validos
      Form.validateFields();
      //Formar os dados para salvar
      const transaction = Form.formatValues();
      //salvar
      Transaction.add(transaction)
      //apagar os dados do fomulario
      Form.clearFields();
      //modal fache
      Modal.salveAndClose();
      //console.log(Modal.salveAndClose())
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

const APP = {
  init() {
    DOM.updateBalencer();
    Form.submit();
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