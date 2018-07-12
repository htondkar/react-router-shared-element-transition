import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import items from './items'

class SinglePage extends Component {
  render() {
    const item = items[this.props.match.params.id]

    return (
      <div className="page">
        <div>
          <Link to="/list">Back</Link>
        </div>

        <div className="item-detail">
          <img
            data-shared-element-placeholder={true}
            className="item-detail__image"
            src={item.image}
            alt=""
          />
          <div className="item-detail__title">{item.title}</div>
        </div>
      </div>
    )
  }
}

export default SinglePage
