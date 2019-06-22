import { connect } from 'react-redux'
import get from 'lodash/get'

import ProductList from './ProductList'

import { fetchProducts } from './actions'

export const mapStateToProps = (state, ownProps) => {
  const product = state.getIn(['product']).toJS()
  const productList = get(product, 'productList')
  const isLoaded = get(product, 'isLoaded')

  return Object.assign({}, ownProps, {
    productList,
    isLoaded
  })
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProducts: (params) => {
      dispatch(fetchProducts(params))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
