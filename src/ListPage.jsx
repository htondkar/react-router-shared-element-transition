import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import items from './items'
import SharedElementBoundry from './SharedElementBoundry'

const ItemRow = ({ id, title, image }) => (
  <Link to={`/details/${id}`}>
    <div className="item-row">
      <img className="item-row__image" src={image} alt="" data-shared-element={true} />
      <div className="item-row__title">{title}</div>
    </div>
  </Link>
)

class ListPage extends Component {
  render() {
    return (
      <div className="page">
        <div>
          List page
          <Link to="/">GO</Link>
        </div>

        <div className="list-wrapper">
          {items.map((item, index) => (
            <SharedElementBoundry key={index} index={index}>
              <ItemRow {...item} />
            </SharedElementBoundry>
          ))}
        </div>
      </div>
    )
  }
}

export default ListPage
