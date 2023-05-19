import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    historyList: [],

    income: 0,
    expenses: 0,
  }

  onAddHistoryList = event => {
    const {title, amount, type} = this.state
    event.preventDefault()
    const moneyType = transactionTypeOptions.find(
      each => each.optionId === type,
    )
    const {displayText} = moneyType
    const newHistory = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      title: '',
      amount: '',
    }))
    if (type === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
      }))
    } else if (type === 'EXPENSES') {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
      }))
    }
  }

  updatedBalance = each => {
    if (each.type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(each.amount),
      }))
      const {historyList} = this.state
      const updatedHistory = historyList.filter(each1 => each1.id !== each.id)
      this.setState({historyList: updatedHistory})
    } else if (each.type === 'Expenses') {
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(each.amount),
      }))
      const {historyList} = this.state
      const updatedHistory = historyList.filter(each1 => each1.id !== each.id)
      this.setState({historyList: updatedHistory})
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {historyList, title, amount, type, income, expenses} = this.state
    const balance = income - expenses

    return (
      <div className="mainMoneyManager">
        <div className="sub-manager">
          <h1 className="main-heading">Hi,Richard</h1>
          <p className="paragraph1">
            Welcome back to your{' '}
            <span className="for-spanEl">Money Manger</span>
          </p>
        </div>
        <div className="MoneyDetails">
          <div className="balance">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="img"
            />
            <div>
              <p className="bl-name">Your Balance</p>
              <p className="bl-heading" data-testid="balanceAmount">
                RS {balance}
              </p>
            </div>
          </div>
          <div className="income">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="img"
            />
            <div>
              <p className="bl-name">Your Income</p>
              <p className="bl-heading" data-testid="incomeAmount">
                RS {income}
              </p>
            </div>
          </div>
          <div className="expenses">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="img"
            />
            <div>
              <p className="bl-name">Your Expenses</p>
              <p className="bl-heading" data-testid="expensesAmount">
                RS {expenses}
              </p>
            </div>
          </div>
        </div>
        <div className="sub-div">
          <div className="transaction">
            <h1 className="main-heading">Add Transaction</h1>
            <form>
              <label className="for-label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="for-input"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
                value={title}
              />
              <br />
              <label htmlFor="amount" className="for-label">
                AMOUNT
              </label>
              <br />
              <input
                type="text"
                id="amount"
                className="for-input"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={amount}
              />
              <br />
              <label htmlFor="type" className="for-label">
                TYPE
              </label>
              <br />
              <select
                className="for-input"
                id="type"
                onChange={this.onChangeType}
                value={type}
              >
                <option
                  value={transactionTypeOptions[0].optionId}
                  name="income"
                  selected
                >
                  {transactionTypeOptions[0].displayText}
                </option>
                <option
                  value={transactionTypeOptions[1].optionId}
                  name="expenses"
                >
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <br />
              <button
                type="submit"
                className="button"
                onClick={this.onAddHistoryList}
              >
                Add
              </button>
            </form>
          </div>
          <div className="history">
            <h1 className="main-heading2">History</h1>
            <ul>
              <div className="nameTitles">
                <p className="main-heading1">Title</p>
                <p className="main-heading1">Amount</p>
                <p className="main-heading1">Type</p>
              </div>
              {historyList.map(each => (
                <TransactionItem
                  each={each}
                  key={each.id}
                  updatedBalance={this.updatedBalance}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
