import React from "react";
import './App.css';

const choices = ["Tomate", "Cozi Noodles"];

const Restaurant = ({restaurant}) => {
  return (
    <div className = "card m-2 p-2">
      <div className = "card-body">
        <div className="card-title">{restaurant}</div>
      </div>
    </div>
  );
}
const RestaurantChoices = ({choices}) => {
  return (
    <div className="restaurant-choices">
      <Restaurant restaurant={choices[0]}/>
      <Restaurant restaurant={choices[1]}/>
    </div>
  );
}

const App = () => {
  return (
    <div className="app">
      <RestaurantChoices choices={choices}/> 
    </div>
  );
}

export default App;
