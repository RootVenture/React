import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  // define state
  constructor() {
    // allows to use 'this'
    super();
    // binds our methods to App itself
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }


  // will render this Component only once even if state changes
  componentWillMount() {
    // This runs right before <App> is rendered, points to the part of the firebase we sync
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      })

    // Check if there is any orer in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      // Update our App componenets order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  // stop syncing when we go to another page
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // invoked immediately before rendering when new props or state are received (changed)
  // working with local storage, which is tied to local host domain
  componentWillUpdate(nextProps, nextState) {
    // passing in our order state; note that localStorage can only take in primitives (No objects)
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish(fish) {
    // make copy of current state w/ spread operator
    const fishes = { ...this.state.fishes };
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // update state with our copy
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(fishKey) {
    // take a copy of state
    const order = { ...this.state.order };
    // update or add new fish ordered
    order[fishKey] = order[fishKey] + 1 || 1;
    // update state with our copy
    this.setState({ order })
  }

  // all Components must have unique tags, can use 'key' attribute to make Fish Components unique
  // pass through props via attributes
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(k => <Fish key={k} index={k} details={this.state.fishes[k]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;