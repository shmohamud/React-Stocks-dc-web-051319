import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

const API = "http://localhost:3000/stocks";

class MainContainer extends Component {
  componentDidMount() {
    fetch(API)
      .then(resp => resp.json())
      .then(data => this.setState({ stocks: data }));
  }
  state = {
    stocks: [],
    stocksPortfolio: [],
    filterType: "",
    sortType: "none"
  };

  onSortBy = e => {
    this.setState({
      sortType: "Alphabetically"
    });
  };

  onSortByPrice = e => {
    this.setState({
      sortType: "Price"
    });
  };

  onSelect = e => {
    this.setState({
      sortType: e.target.value
    });
  };

  onStockClickBuy = stock => {
    let newStock = stock;
    this.setState(prevState => ({
      stocksPortfolio: [...prevState.stocksPortfolio, newStock]
    }));
    let newStocks = this.state.stocks.filter(stockObj => stockObj !== stock);
    this.setState({ stocks: newStocks });
  };

  onStockClickSell = stock => {
    let newStocksPortfolio = this.state.stocksPortfolio.filter(
      stockObj => stockObj !== stock
    );
    this.setState({ stocksPortfolio: newStocksPortfolio });
    let newStock = stock;
    this.setState(prevState => ({
      stocks: [...prevState.stocks, newStock]
    }));
  };

  render() {
    return (
      <div>
        <SearchBar
          onSortBy={this.onSortBy}
          onSortByPrice={this.onSortByPrice}
          onSelect={this.onSelect}
          sortType={this.state.sortType}
        />
        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.state.stocks}
              onStockClick={this.onStockClickBuy}
              sortType={this.state.sortType}
              selectType={this.state.selectType}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.state.stocksPortfolio}
              onStockClick={this.onStockClickSell}
              sortType={this.state.sortType}
              selectType={this.state.selectType}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
