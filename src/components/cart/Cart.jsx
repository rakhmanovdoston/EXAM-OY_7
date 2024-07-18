const Cart = ({ products }) => {
  return (
    <div>
      <h2>Cart</h2>
      <div>
        {products.map((p) => {
          <li key={p.id}>{p.name}</li>;
        })}
      </div>
    </div>
  );
};

export default Cart;
