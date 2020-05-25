import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link, Redirect, Switch} from 'react-router-dom';

const Companies = ({ companies, products, offerings }) => {
  
  return (
    <div>
      <h2>Companies</h2>
      <ul>
        {
          companies.map(company => 
            <div class = 'card-item' key = {company.id}>
            <li class = 'company-name'>{ company.name }</li>
            <div>{ company.catchPhrase }</div>
            <div>Offering:</div>
            <div>
              <ul>
                {
                offerings
                .filter(offering => offering.companyId === company.id)
                .map(offering => {
                  const product = products.find( product => product.id === offering.productId)
                  offering.name = product.name
                  return offering
                 })
                .map(offering => <li>{offering.name} {offering.price} </li>)
                }
              </ul>
            </div>
            </div>)
        }
      </ul>
    </div>
  )
}

const Products = ({ companies, products, offerings }) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map(product => 
            <div class = 'card-item' key = {product.id}>
            <li class = 'company-name'>{ product.name }</li>
            <div>${ product.suggestedPrice }</div>
            <div>{ product.description }</div>
            <div>Offered by:</div>
            { <div>
              <ul>
                {
                offerings
                .filter(offering => offering.productId === product.id)
                .map(offering => {
                  const company = companies.find( company => company.id === offering.companyId)
                  offering.companyName = company.name
                  return offering
                 })
                .map(offering => <li> {offering.companyName} </li>)
                }
              </ul>
            </div> 
            }
            </div>)
        }
      </ul>
    </div>
  )
}

const Nav = ({path, companies, products }) => {
  
  return (
    <nav>
      <div>ACME OFFERINGS * REACT</div>
    <Link to= '/companies'  className = {path === '/companies ' ? 'selected': ''}>Companies ({companies.length}) </Link> 
    <Link to= '/products'  className = {path === '/products ' ? 'selected': ''}>Products ({products.length}) </Link> 
    </nav>
  )
}

class App extends Component {
  constructor(){
    super()
    this.state= {
      products: [],
      companies: [],
      offerings: [],
    }
  }

  componentDidMount(){
    Promise.all([
      axios.get('https://acme-users-api-rev.herokuapp.com/api/companies'),
      axios.get('https://acme-users-api-rev.herokuapp.com/api/products'),
      axios.get('https://acme-users-api-rev.herokuapp.com/api/offerings')
    ])
    .then(responses => responses.map(res => res.data))
    .then(([companies, products, offerings]) => this.setState({ companies, products, offerings}))
  }
  
  render() {
    
    const { companies, products, offerings } = this.state
    console.log(this.state)
    //return <h1>Welcome to the JSX world...</h1>
    return (
      <HashRouter>
        <Route render= { ({ location }) => <Nav path = { location.pathname } products = { products } 
        companies = { companies }/> }/>
        <Switch>
        <Route path ='/companies' render={ ()=> <Companies companies={ companies } products = {products} offerings = {offerings}/>} /> 
        <Route path ='/products' render={ ()=> <Products companies={ companies } products = {products} offerings = {offerings}/>} />
        <Redirect to = '/companies' />
        </Switch>
    </HashRouter>
    )
  }
}
  

const root = document.querySelector('#root')
render(<App />, root)