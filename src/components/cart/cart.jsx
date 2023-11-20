import styles from "./cart.module.css";
import CartHeader from "./cartHeader";
import CartList from "./cartList";
import TotalCart from "./totalCart";
import React, {useState} from "react";

export const Cart = ({cart, convertPrice, setCart, checkLists, setCheckLists}) => {

  const [total, setTotal] = useState(0);

  const handleAllCheck = (checked) => {
    if(checked) {
      const checkItems = [];
      cart.map((cart)=>checkItems.push(cart.id));
      setCheckLists(checkItems);
    } else {
      setCheckLists([]);
    }
  }
  const isAllChecked = cart.length === checkLists.length && checkLists.length !== 0;

  const select = checkLists.map((checkLists)=>
    cart.filter((el) => el.id === checkLists))

  const handleCheckList = (checked, id) =>{
    if(checked) {
      setCheckLists([...checkLists, id])
    }else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };
  console.log(checkLists)
  const handleRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id));
    setCheckLists(checkLists.filter((check) => check !== id));
  }

  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found); 
    const cartItem = {
      id : found.id,
      image : found.image,
      name : found.name,
      price : found.price,
      quantity : quantity,
      provider : found.provider,
    };

    if(type==="plus"){
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
    } else {  
      if(quantity === 0) return;    
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
    }
  }

  return (
    <> 
      <header className={styles.header}>
      <h1>장바구니</h1>
      </header>

    <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked}/>

    {cart.length === 0 ? (
      <div className={styles.not}>
        <h2>장바구니에 담긴 상품이 없습니다.</h2>
        <p>원하는 상품을 장바구니에 담아보세요 !</p>
      </div>
    ) : (
      cart.map((cart) =>{
        return(
          <CartList 
          key={`key-${cart.id}`} 
          cart={cart}
          convertPrice={convertPrice}
          setCart={setCart} 
          handleQuantity={handleQuantity}
          handleRemove={handleRemove}
          checkLists={checkLists}
          handleCheckList={handleCheckList} />
        )}))}
    {cart.length === 0 ? "" : <TotalCart convertPrice={convertPrice} total={total} setTotal={setTotal} cart={cart} select={select}/>}
    </>
  );
};
