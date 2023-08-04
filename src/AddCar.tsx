import React from "react";
import axios from "axios";
import { ICar } from "./App";

interface IProps {
  cars: ICar[];
  setIsOpen: (value: boolean) => void;
  setCars: (value: ICar[]) => void;
}

const AddCar: React.FC<IProps> = ({ cars, setCars, setIsOpen }) => {
  const [carName, setCarName] = React.useState<string>("");
  const [carPrice, setCarPrice] = React.useState<string>("");
  const [carImage, setCarImage] = React.useState<string>("");

  const createNewCar = async () => {
    const newCar: ICar = {
      id: Date.now(),
      name: carName,
      price: Number(carPrice.split(" ").join("")),
      image: carImage,
    };
    await axios.post("http://localhost:8080/cars", newCar);
    setCars([...cars, newCar]);
  };

  return (
    <div className="modal">
      <div className="car-form">
        <p onClick={() => setIsOpen(false)}>&#10006;</p>
        <form>
          <h1>Информация о машине</h1>
          <div className="input-field">
            <input
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              type="text"
              placeholder=" "
            />
            <span>Название машины</span>
          </div>
          <div className="input-field">
            <input
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              type="text"
              placeholder=" "
            />
            <span>Цена</span>
          </div>
          <div className="input-field">
            <input
              value={carImage}
              onChange={(e) => setCarImage(e.target.value)}
              type="text"
              placeholder=" "
            />
            <span>Ссылка на картинку</span>
          </div>
          <button type="button" onClick={() => createNewCar()}>
            Добавить
          </button>
        </form>
      </div>
      <div className="overlay" />
    </div>
  );
};

export default AddCar;
