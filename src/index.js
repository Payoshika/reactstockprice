class Portfolio extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      portfolio: [
        {
          name: 'Feetbook',
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130
        },{
          name: 'Yamazon',
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500
        },{
          name: 'Snoozechat',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3
        }
      ],
      newportfolio:{
        name: '',
        shares_owned:0 ,
        cost_per_share:0 ,
        market_price:0
      }
    };
  }

  removeArray = (index) => {
    const copyPortfolio = this.state.portfolio.slice()
    copyPortfolio.splice(index,1);
    console.log(copyPortfolio);
    this.setState({portfolio: copyPortfolio})
  }

  changeStock =(event, index)=>{
    const copyPortfolio = this.state.portfolio.slice()
    const newValue = event.target.value;
    const name = event.target.name
    copyPortfolio[index][name] = newValue
    this.setState({
      portfolio: copyPortfolio
    })
  }

  updatenewStock = (event)=> {
    event.stopPropagation();
    const copyPortfolio = this.state.newportfolio
    const name = event.target.name
    let value;
    name === "name"? value = event.target.value : value = Number(event.target.value);
    copyPortfolio[name] = value
    this.setState ({
      newPortfolio: copyPortfolio
    })
  }

  addArray =(event, index) => {
    const copyPortfolio = this.state.portfolio.slice()
    const copyPortfolioNew = this.state.newportfolio
    copyPortfolio.push(copyPortfolioNew)
    this.setState ({
      portfolio: copyPortfolio
    })
    this.setState ({
      newportfolio: {
        name: '',
        shares_owned:0 ,
        cost_per_share:0 ,
        market_price:0
      }
    })
  }

  render(){
    const {portfolio} = this.state;
    const {newportfolio} = this.state;
    const { name, shares_owned, cost_per_share, market_price} = newportfolio;
    const totalMarketValue = portfolio.reduce((sum, value)=>{return sum + (value.market_price*value.shares_owned)},0)
    const totalGainLoss = totalMarketValue - portfolio.reduce((sum, value)=>{return sum + (value.cost_per_share*value.shares_owned)},0)

    return(
      <div>
        <h2>Stock Portofolio</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Shares Owned</th>
              <th scope="col">Cost per Share</th>
              <th scope="col">Market Price</th>
              <th scope="col">Market Value</th>
              <th scope="col">Unrealized Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((value, index) => {
              const{ name, shares_owned, cost_per_share, market_price} = value;
              const marketValue = shares_owned * market_price;
              const gainLoss = marketValue - (cost_per_share * shares_owned )
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td><input type="number" name="shares_owned" value={shares_owned} onChange={(event)=>this.changeStock(event, index)}/></td>
                  <td><input type="number" name="cost_per_share" value={cost_per_share} onChange={(event)=>this.changeStock(event,index)}/></td>
                  <td><input type="number" name="market_price" value={market_price} onChange={(event)=>this.changeStock(event,index)}/></td>
                  <td>{marketValue}</td>
                  <td>{gainLoss}</td>
                  <td><button className="btn btn-light btn-sm" onClick={()=>this.removeArray(index)}>remove</button></td>
                </tr>
              )
            }
          )}
          <tr key={portfolio.length}>
            <td><input type="text" name="name" value={name} onChange={(event)=>this.updatenewStock(event)}/></td>
            <td><input type="number" name="shares_owned" value={shares_owned} onChange={(event)=>this.updatenewStock(event)}/></td>
            <td><input type="number" name="cost_per_share" value={cost_per_share} onChange={(event)=>this.updatenewStock(event)}/></td>
            <td><input type="number" name="market_price" value={market_price} onChange={(event)=>this.updatenewStock(event)}/></td>
            <td><button className="btn btn-primary btn-sm" onClick={(event)=>this.addArray(event, portfolio.length)}>add</button></td>
          </tr>
          </tbody>
        </table>
        <div>
          <p>Portofolio Value: {totalMarketValue}</p>
          <p>Gain/Loss:{totalGainLoss} </p>
        </div>
      </div>
    )
}}

ReactDOM.render(
  <Portfolio />,
  document.getElementById("root")
)
