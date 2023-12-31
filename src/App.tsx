import React from "react";
import axios from "axios";
import AddCar from "./AddCar";

export interface ICar {
  id: number;
  image: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [cars, setCars] = React.useState<ICar[]>([]);
  const [currentCar, setCurrentCar] = React.useState<number>(0);

  const getAllCars = async () => {
    setLoading(true);
    const { data } = await axios.get<ICar[]>("http://localhost:8080/cars");
    setCars(data);
    setLoading(false);
  };

  const removeCar = async (ID: number) => {
    await axios.delete(`http://localhost:8080/cars/${ID}`);
    currentCar === 0 ? setCurrentCar(0) : setCurrentCar(currentCar - 1);
    setCars(cars.filter((car) => car.id !== ID));
  };

  React.useEffect(() => {
    getAllCars();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Загрузка данных...</h1>
      </section>
    );
  }

  if (!cars.length) {
    return (
      <section className="section">
        <h1>Машин в базе данных нет!</h1>
      </section>
    );
  }

  if (!cars[currentCar]) {
    return (
      <section className="section error">
        <h1>Произошла ошибка... перезагрузите страницу</h1>
      </section>
    );
  }

  const { name, price, image, id } = cars[currentCar];
  return (
    <>
      <button className="new__car-btn" onClick={() => setIsOpen(true)}>
        Добавить новую машину
      </button>
      {isOpen && <AddCar setCars={setCars} cars={cars} setIsOpen={setIsOpen} />}
      <section className="section">
        <h1>Доступные автомобили</h1>
        <div className="cars">
          <div className="buttons">
            <ul>
              {cars.map((car, index) => (
                <li
                  className={currentCar === index ? "active" : ""}
                  key={index}
                  onClick={() => setCurrentCar(index)}
                >
                  {car.name.replace(/\b,/g, " ")}
                </li>
              ))}
            </ul>
          </div>
          <div className="car">
            <h3>{name.replace(/\b,/g, " ")}</h3>
            <strong>{price.toLocaleString("en-EN")}₽</strong>
            <img width="500px" src={image} alt="Car" />
            <div className="car__buttons">
              <button>Купить</button>
              <button>Подробнее</button>
              <button onClick={() => removeCar(id)}>Удалить</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
