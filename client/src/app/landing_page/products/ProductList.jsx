import React from 'react'
import PropTypes from 'prop-types'

export class ProductList extends React.Component {
  componentDidMount () {
    const { fetchProducts } = this.props
    fetchProducts()
  }

  componentWillUnmount() {
    // call action to clear ProductList
  }

  renderProducts () {
    const { productList } = this.props
    const rows = []

    productList.map(product => {
      rows.push(
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
        </tr>
      )
    })

    return (
      <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }

  render () {
    return (
      <div>
        <h1>Product List</h1>
        {this.renderProducts()}
      </div>
    )
  }
}

ProductList.propTypes = {
  isLoaded: PropTypes.bool,
  fetchProducts: PropTypes.func.isRequired,
  productList: PropTypes.array
}
ProductList.displayName = 'ProductList'

export default ProductList
