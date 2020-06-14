var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portfolio = function (_React$Component) {
  _inherits(Portfolio, _React$Component);

  function Portfolio(props) {
    _classCallCheck(this, Portfolio);

    var _this = _possibleConstructorReturn(this, (Portfolio.__proto__ || Object.getPrototypeOf(Portfolio)).call(this, props));

    _this.removeArray = function (index) {
      var copyPortfolio = _this.state.portfolio.slice();
      copyPortfolio.splice(index, 1);
      console.log(copyPortfolio);
      _this.setState({ portfolio: copyPortfolio });
    };

    _this.changeStock = function (event, index) {
      var copyPortfolio = _this.state.portfolio.slice();
      var newValue = event.target.value;
      var name = event.target.name;
      copyPortfolio[index][name] = newValue;
      _this.setState({
        portfolio: copyPortfolio
      });
    };

    _this.updatenewStock = function (event) {
      event.stopPropagation();
      var copyPortfolio = _this.state.newportfolio;
      var name = event.target.name;
      var value = void 0;
      name === "name" ? value = event.target.value : value = Number(event.target.value);
      copyPortfolio[name] = value;
      _this.setState({
        newPortfolio: copyPortfolio
      });
    };

    _this.addArray = function (event, index) {
      var copyPortfolio = _this.state.portfolio.slice();
      var copyPortfolioNew = _this.state.newportfolio;
      copyPortfolio.push(copyPortfolioNew);
      _this.setState({
        portfolio: copyPortfolio
      });
      _this.setState({
        newportfolio: {
          name: '',
          shares_owned: 0,
          cost_per_share: 0,
          market_price: 0
        }
      });
    };

    _this.state = {
      portfolio: [{
        name: 'Feetbook',
        shares_owned: 20,
        cost_per_share: 50,
        market_price: 130
      }, {
        name: 'Yamazon',
        shares_owned: 5,
        cost_per_share: 200,
        market_price: 500
      }, {
        name: 'Snoozechat',
        shares_owned: 100,
        cost_per_share: 20,
        market_price: 3
      }],
      newportfolio: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };
    return _this;
  }

  _createClass(Portfolio, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var portfolio = this.state.portfolio;
      var newportfolio = this.state.newportfolio;
      var name = newportfolio.name,
          shares_owned = newportfolio.shares_owned,
          cost_per_share = newportfolio.cost_per_share,
          market_price = newportfolio.market_price;

      var totalMarketValue = portfolio.reduce(function (sum, value) {
        return sum + value.market_price * value.shares_owned;
      }, 0);
      var totalGainLoss = totalMarketValue - portfolio.reduce(function (sum, value) {
        return sum + value.cost_per_share * value.shares_owned;
      }, 0);

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Stock Portofolio'
        ),
        React.createElement(
          'table',
          { className: 'table' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { scope: 'col' },
                'Name'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Shares Owned'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Cost per Share'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Market Price'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Market Value'
              ),
              React.createElement(
                'th',
                { scope: 'col' },
                'Unrealized Gain/Loss'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            portfolio.map(function (value, index) {
              var name = value.name,
                  shares_owned = value.shares_owned,
                  cost_per_share = value.cost_per_share,
                  market_price = value.market_price;

              var marketValue = shares_owned * market_price;
              var gainLoss = marketValue - cost_per_share * shares_owned;
              return React.createElement(
                'tr',
                { key: index },
                React.createElement(
                  'td',
                  null,
                  name
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('input', { type: 'number', name: 'shares_owned', value: shares_owned, onChange: function onChange(event) {
                      return _this2.changeStock(event, index);
                    } })
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('input', { type: 'number', name: 'cost_per_share', value: cost_per_share, onChange: function onChange(event) {
                      return _this2.changeStock(event, index);
                    } })
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement('input', { type: 'number', name: 'market_price', value: market_price, onChange: function onChange(event) {
                      return _this2.changeStock(event, index);
                    } })
                ),
                React.createElement(
                  'td',
                  null,
                  marketValue
                ),
                React.createElement(
                  'td',
                  null,
                  gainLoss
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'button',
                    { className: 'btn btn-light btn-sm', onClick: function onClick() {
                        return _this2.removeArray(index);
                      } },
                    'remove'
                  )
                )
              );
            }),
            React.createElement(
              'tr',
              { key: portfolio.length },
              React.createElement(
                'td',
                null,
                React.createElement('input', { type: 'text', name: 'name', value: name, onChange: function onChange(event) {
                    return _this2.updatenewStock(event);
                  } })
              ),
              React.createElement(
                'td',
                null,
                React.createElement('input', { type: 'number', name: 'shares_owned', value: shares_owned, onChange: function onChange(event) {
                    return _this2.updatenewStock(event);
                  } })
              ),
              React.createElement(
                'td',
                null,
                React.createElement('input', { type: 'number', name: 'cost_per_share', value: cost_per_share, onChange: function onChange(event) {
                    return _this2.updatenewStock(event);
                  } })
              ),
              React.createElement(
                'td',
                null,
                React.createElement('input', { type: 'number', name: 'market_price', value: market_price, onChange: function onChange(event) {
                    return _this2.updatenewStock(event);
                  } })
              ),
              React.createElement(
                'td',
                null,
                React.createElement(
                  'button',
                  { className: 'btn btn-primary btn-sm', onClick: function onClick(event) {
                      return _this2.addArray(event, portfolio.length);
                    } },
                  'add'
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            'Portofolio Value: ',
            totalMarketValue
          ),
          React.createElement(
            'p',
            null,
            'Gain/Loss:',
            totalGainLoss,
            ' '
          )
        )
      );
    }
  }]);

  return Portfolio;
}(React.Component);

ReactDOM.render(React.createElement(Portfolio, null), document.getElementById("root"));