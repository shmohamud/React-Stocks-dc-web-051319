import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

getStocksToShow = () => {

  let stocks = [...this.props.stocks] 
      console.log(stocks)
      switch(this.props.sortType) {
        case 'Alphabetically':
            stocks.sort((a, b) => a.name.localeCompare(b.name))
        break;
        case 'Price':
        stocks.sort((a, b) => b.price - a.price)
        break;
            default:
              stocks = stocks 
            }
              return stocks 
       }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.getStocksToShow().map(stock => {
            return <Stock stock={stock} 
            onStockClick={this.props.onStockClick}
            />  
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
