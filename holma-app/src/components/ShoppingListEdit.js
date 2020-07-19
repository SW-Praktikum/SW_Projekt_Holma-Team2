import React, { Component } from 'react';

class ShoppingListEdit extends Component {
    constructor(props) {
      super(props)
      this.state= {
        shoppingListId: this.props.match.params.shoppingListId
      }
    }


    render(){
        console.log(this.props)
        console.log("ShoppingListId:", this.state.shoppingListId)
        return( 
            <div>Bier</div>
        )
    }
}
export default ShoppingListEdit