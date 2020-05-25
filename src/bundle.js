import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link, Redirect, Switch} from 'react-router-dom';



const Companies = ({ companies }) => {
  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {
          companies.map(company => <li>{ company.name }</li>)
        }
      </ul>
    </div>
  )
}

const Products = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {
          products.map(product => <li>{ product.name }</li>)
        }
      </ul>
    </div>
  )
}


const Nav = ({path, companies, products }) => {
  
  return (
    <nav>
      <div>ACME OFFERINGS * REACT</div>
    <Link to= '/companies' className = {path === '/companies ' ? 'selected': ''}>Companies ({companies.length}) </Link> 
    <Link to= '/products' className = {path === '/products ' ? 'selected': ''}>Products ({products.length}) </Link> 
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
    //return <h1>Welcome to the JSX world...</h1>
    return (
      <HashRouter>
        <Route render= { ({ location }) => <Nav path = { location.pathname } products = { products } 
        companies = { companies }/> }/>
        <Switch>
        <Route path ='/companies' render={ ()=> <Companies companies ={companies}/>} />
        <Route path ='/products' render={ ()=> <Products products ={products}/>} />
        <Redirect to = '/companies' />
        </Switch>
    </HashRouter>
    )
  }
}
  

const root = document.querySelector('#root')
render(<App />, root)