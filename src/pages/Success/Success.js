import "./Success.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="success-page">
      <h2>Thank you for your purchase! ✅</h2>
    </div>
  );
};

export default Success;
