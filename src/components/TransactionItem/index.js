import './index.css'

const TransactionItem = props => {
  const {each, updatedBalance} = props
  const {title, amount, type} = each
  const updateAmount = () => {
    updatedBalance(each)
  }
  return (
    <li className="nameTitles1">
      <p className="paragraphs">{title}</p>
      <p className="paragraphs">{amount}</p>
      <p className="paragraphs">{type}</p>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={updateAmount}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="deleteImage"
        />
      </button>
    </li>
  )
}
export default TransactionItem
