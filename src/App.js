import React, { useState } from "react";
import "./App.css";
import vs from "./vs.png";
//make a option to decide randomly, in case people still can't decide
//optimal solution: being able to get inputs from multiple application

//make an array of all the restaurants we want index 0 and 1 compete against
//remove from the array from the front and then continue until one restaurant left
const RandomRestaurant = ({
  setActiveRestaurants,
  restaurantToRemove,
  activeRestaurants,
}) => {
  return (
    <div
      className="card random"
      onClick={() => {
        setActiveRestaurants(
          activeRestaurants.filter(
            (restaurant) => restaurant !== activeRestaurants[restaurantToRemove]
          )
        );
      }}
    >
      <div className="card-body">
        <div className="card-title">Choose for me!</div>
      </div>
    </div>
  );
};
const Restaurant = ({
  restaurant,
  setActiveRestaurants,
  activeRestaurants,
  restaurantToRemove,
}) => {
  return (
    <div
      className="card p-2 restaurant"
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
  const shuffled = choices.sort(() => Math.random() - 0.5)
  const [activeRestaurants, setActiveRestaurants] = useState(shuffled);

  if (activeRestaurants.length === 1) {
    setWinner(activeRestaurants[0]);
  }

  return (
    <>
      <h3 className="currentRound">
        {" "}
        Round {choices.length - activeRestaurants.length + 1} of{" "}
        {choices.length - 1}
      </h3>
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
        <RandomRestaurant
          setActiveRestaurants={setActiveRestaurants}
          activeRestaurants={activeRestaurants}
          restaurantToRemove={Math.random() < 0.5 ? 0 : 1}
        />
      </div>
    </>
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
      <h1>DINNER DUELS</h1>
    </header>
  );
};

const RestaurantForm = ({ inputList, setInputList, setFormScreen }) => {
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { restaurant: "" }]);
  };

  const handleSubmit = () => {
    setFormScreen(false);
  };

  return (
    <div className="restaurant-form">
      <h2> Enter Your Restaurant Options </h2>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <div className="restaurant-wrapper">
              <input
                name="restaurant"
                placeholder="Enter Restaurant"
                value={x.restaurant}
                onChange={(e) => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveClick(i)}
                  >
                    x
                  </button>
                )}
              </div>
            </div>

            {inputList.length - 1 === i && (
              <button className="add-button" onClick={handleAddClick}>
                Add Another Restaurant
              </button>
            )}
          </div>
        );
      })}

      <hr></hr>
      <div className="rests-to-duel">
        {/* <h3> Restaurants To Duel </h3>

        <div className="restaurants-dueling">
          {inputList
            .filter((r) => r.restaurant !== "")
            .map((r) => (
              <li>{r.restaurant}</li>
            ))}
        </div> */}
        <button className="submit-button" onClick={handleSubmit}>
          START DUELING
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [winner, setWinner] = useState();
  const [formScreen, setFormScreen] = useState(true);
  const [inputList, setInputList] = useState([{ restaurant: "" }]);

  return (
    <>
      <Header></Header>
      {formScreen ? (
        <RestaurantForm
          inputList={inputList}
          setInputList={setInputList}
          setFormScreen={setFormScreen}
        />
      ) : winner ? (
        <WinningRestaurant winner={winner} />
      ) : (
        <RestaurantChoices
          choices={inputList.map((r) => r.restaurant).filter((r) => r !== "")}
          setWinner={setWinner}
        />
      )}
    </>
  );
};

export default App;
