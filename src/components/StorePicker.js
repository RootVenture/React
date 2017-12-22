// ES6 imports
import React from 'react';
import { getFunName } from '../helpers'
class StorePicker extends React.Component {
  // One method to allow custom methods to utilize 'this'
  // constructor() {
  //   // super will create the react component that is extended by this class
  //   super();
  //   // super will allow this to function with bind
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(e) {
    // stops form submission/page refresh
    e.preventDefault();
    // first grab the text from the box
    const storeId = this.storeInput.value;
    // second, transition url to the text /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  // render methods are bound to the Component, therefore 'this' references the component
  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        { /* TODO: need a method and action for the form */}
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => this.storeInput = input} />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

// Surface our React Router
// use context to use our global Router; Not usually recommended
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

// ES6 exports
export default StorePicker;