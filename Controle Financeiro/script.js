const transactionsUL = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")


const localStorageTransactions = JSON.parse(localStorage
  .getItem("transactions"))
  
let transactions = localStorage
  .getItem("transactions") !== null ? localStorageTransactions : []

let removeTransaction = ID => {
  transactions = transactions.filter(transaction =>
    transaction.id !== ID)
  updadeLocalStorage()
  init()
}

// adicionar a transação no DOM
const addTransactionIntoDom = ({ amount, name, id }) => {

  const operator = amount < 0 ? "-" : "+"
  const CSSClass = amount < 0 ? "minus" : "plus" // menos | mais

  const amountWithoutOperator = Math.abs(amount)
  const li = document.createElement("li")
  li.classList.add(CSSClass)

  li.innerHTML = `
  ${name}
   <span>${operator} R$ ${amountWithoutOperator}</span>
   <button class="delete-btn" onclick="removeTransaction(${id})">x</button>
  `
  transactionsUL.append(li)
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts // despesa
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0))
  .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts // renda
  .filter(item => item > 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
  .reduce((accumulator, transactio) => accumulator + transactio, 0)
  .toFixed(2)

// atualizar os valores de saldo
const upadateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount)
  console.log(transactionsAmounts)
  const total = getTotal(transactionsAmounts)
  
  if (total < 0) {
    balanceDisplay.style.color = "red"
  }
  const income = getIncome(transactionsAmounts)
  const expense = getExpenses(transactionsAmounts)


  balanceDisplay.textContent = `R$ ${total}` // exibição de renda
  incomeDisplay.textContent = `R$ ${income}` // exibição de saldo
  expenseDisplay.textContent = `R$ ${expense}` // exibição de despesas
}

// iniciar app
const init = () => {
  transactionsUL.innerHTML = ""
  transactions.forEach(addTransactionIntoDom)
  upadateBalanceValues()
}
init()

const updadeLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })
}

const clearInputs = () => {
  inputTransactionName.value = ""
  inputTransactionAmount.value = ""
}

let handleFormSubimit = (event) => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  const isSomeInputEmpty = transactionName === "" || transactionAmount === ""

  if (isSomeInputEmpty) {
    alert("Por favor preencha tanto o nome quanto o valor da transação !!!")
    return
  }

  addToTransactionArray(transactionName, transactionAmount)
  updadeLocalStorage()
  clearInputs()
  init()

}

form.addEventListener("submit", handleFormSubimit)

















