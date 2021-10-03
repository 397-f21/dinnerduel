import React, { useState } from "react";
import "./App.css";
import vs from "./vs.png";
//make a option to decide randomly, in case people still can't decide
//optimal solution: being able to get inputs from multiple application

const choices = [
  "Tomate",
  "Cozi Noodles",
  "Five & Dime",
  "Allison Dining Hall",
];

//make an array of all the restaurants we want index 0 and 1 compete against
//remove from the array from the front and then continue until one restaurant left

const Restaurant = ({
  restaurant,
  setActiveRestaurants,
  activeRestaurants,
  restaurantToRemove,
}) => {
  return (
    <div
      className="card m-2 p-2 restaurant"
      onClick={() => {
        setActiveRestaurants(
          activeRestaurants.filter(
            (restaurant) => restaurant !== activeRestaurants[restaurantToRemove]
          )
        );
      }}
    >
      <div className="card-body">
        <div className="card-title">{restaurant}</div>
      </div>
    </div>
  );
};

const RestaurantChoices = ({ choices, setWinner }) => {
  const [activeRestaurants, setActiveRestaurants] = useState(choices);

  if (activeRestaurants.length === 1) {
    setWinner(activeRestaurants[0]);
  }

  return (
    <div className="restaurant-choices">
      <Restaurant
        restaurant={activeRestaurants[0]}
        setActiveRestaurants={setActiveRestaurants}
        activeRestaurants={activeRestaurants}
        restaurantToRemove={1}
      />
      <img src={vs} className="vs" />
      <Restaurant
        restaurant={activeRestaurants[1]}
        setActiveRestaurants={setActiveRestaurants}
        activeRestaurants={activeRestaurants}
        restaurantToRemove={0}
      />
    </div>
  );
};

const RestaurantWinner = ({ restaurant }) => {
  return (
    <div className="card-body">
      <h2> {restaurant}</h2>
    </div>
  );
};

const WinningRestaurant = ({ winner }) => {
  return (
    <div className="winning-restaurant">
      <h3> The winning restaurant is...</h3>
      <RestaurantWinner restaurant={winner} />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <h1>Dinner Duel</h1>
    </header>
  );
};
const App = () => {
  const [winner, setWinner] = useState();
  return (
    <>
      <Header></Header>
      {winner ? (
        <WinningRestaurant winner={winner} />
      ) : (
        <RestaurantChoices choices={choices} setWinner={setWinner} />
      )}
    </>
  );
};

export default App;

// const RestaurantForm = () => {
//   const [inputs, setInputs] = useState({});

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs((values) => ({ ...values, [name]: value }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(inputs);
//   };

//   return (
//     <>
//       <h2> Enter your restaurant choices</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="restaurant1"
//           value={inputs.restaurant1 || ""}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="restaurant2"
//           value={inputs.restaurant2 || ""}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="restaurant3"
//           value={inputs.restaurant3 || ""}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="restaurant4"
//           value={inputs.restaurant4 || ""}
//           onChange={handleChange}
//         />
//         <input type="submit" />
//       </form>
//     </>
//   );
// };
