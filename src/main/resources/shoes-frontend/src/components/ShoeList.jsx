import ShoeCard from "./ShoeCard";
import "../css/ShoeList.css";
const ShoeList = ({ shoes }) => {
  return (
    <div className="shoe-list">
      {shoes.map((shoe) => (
        <ShoeCard
          key={shoe.id}
          image={shoe.image}
          name={shoe.name}
          description={shoe.description}
          price={shoe.price}
          discountPrice={shoe.discountPrice}
        />
      ))}
    </div>
  );
};

export default ShoeList;
