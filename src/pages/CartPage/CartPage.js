import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  toggleCartQty,
  getCartTotal,
  clearCart,
} from "../../store/cartSlice";
import { formatPrice } from "../../utils/helpers";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};
const CartPage = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    data: cartProducts,
    totalItems,
    totalAmount,
    deliveryCharge,
  } = useSelector((state) => state.cart);

  const item = {
    price: "price_1NafivSAWOWJ4tXWD94Nfd6d",
    quantity: 1,
  };

  const SuccessUrl =
    window.location.hostname === "localhost"
      ? `${window.location.origin}/success/local`
      : `${window.location.origin}/success`;

  const CancelUrl =
    window.location.hostname === "localhost"
      ? `${window.location.origin}/cancel/local`
      : `${window.location.origin}/cancel`;
  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    // successUrl: `${window.location.origin}/success`,
    // successUrl: `https://64cf58e1dad64a2cde2ba9e6--musical-salmiakki-6c766e.netlify.app/success`,
    successUrl: SuccessUrl,

    // cancelUrl: `${window.location.origin}/cancel`,
    cancelUrl: CancelUrl,
  };

  const redirectToCheckout = async () => {
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    if (!error) {
      dispatch(getCartTotal());
    }
    if (error) setStripeError(error.message);
    setLoading(false);
  };
  if (stripeError) alert(stripeError);

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSelector((state) => state.cart)]);

  const emptyCartMsg = <h4 className="text-red fw-6">No items found!</h4>;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home"></i>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
      <div className="bg-ghost-white py-5">
        <div className="container">
          <div className="section-title bg-ghost-white">
            <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
              My Cart
            </h3>
          </div>
          {cartProducts.length === 0 ? (
            emptyCartMsg
          ) : (
            <div className="cart-content grid">
              <div className="cart-left">
                <div className="cart-items grid">
                  {cartProducts.map((cartProduct) => (
                    <div className="cart-item grid" key={cartProduct.id}>
                      <div className="cart-item-img flex flex-column bg-white">
                        <img
                          src={cartProduct.images[0]}
                          alt={cartProduct.title}
                        />
                        <button
                          type="button"
                          className="btn-square rmv-from-cart-btn"
                          onClick={() =>
                            dispatch(removeFromCart(cartProduct.id))
                          }
                        >
                          <DeleteIcon />
                        </button>
                      </div>

                      <div className="cart-item-info">
                        <h6 className="fs-16 fw-5 text-light-blue">
                          {cartProduct.title}
                        </h6>
                        <div className="qty flex">
                          <span className="text-light-blue qty-text">Qty:</span>
                          <div className="qty-change flex">
                            <IconButton
                              variant="contained"
                              color="primary"
                              className="qty-dec fs-14"
                              onClick={() =>
                                dispatch(
                                  toggleCartQty({
                                    id: cartProduct.id,
                                    type: "DEC",
                                  })
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <span className="qty-value flex flex-center">
                              {cartProduct.quantity}
                            </span>
                            <IconButton
                              aria-label="delete"
                              variant="contained"
                              color="primary"
                              className="qty-dec fs-14"
                              onClick={() =>
                                dispatch(
                                  toggleCartQty({
                                    id: cartProduct.id,
                                    type: "INC",
                                  })
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className="flex flex-between">
                          <div className="text-pine-green fw-4 fs-15 price">
                            Price : {formatPrice(cartProduct.price)}.00
                          </div>
                          <div className="sub-total fw-6 fs-18 text-regal-blue">
                            <span>Sub Total: </span>
                            <span className="">
                              {formatPrice(cartProduct.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => dispatch(clearCart())}
                >
                  <span className="fs-16">Clear Cart</span>
                </button>
              </div>
              <div className="cart-right bg-white">
                <div className="cart-summary text-light-blue">
                  <div className="cart-summary-title">
                    <h6 className="fs-20 fw-5">Order Summary</h6>
                  </div>
                  <ul className="cart-summary-info">
                    <li className="flex flex-between">
                      <span className="fw-4">
                        Selected {totalItems} items(s) Price
                      </span>
                      <span className="fw-7">{formatPrice(totalAmount)}</span>
                    </li>
                    <li className="flex flex-between">
                      <span className="fw-4">Discount</span>
                      <span className="fw-7">
                        <span className="fw-5 text-red">-&nbsp;</span>
                        {formatPrice(0)}
                      </span>
                    </li>
                    <li className="flex flex-between">
                      <span className="fw-4">Delivery Cost</span>
                      <span className="fw-7">
                        <span className="fw-5 text-gold">+&nbsp;</span>
                        {formatPrice(deliveryCharge)}
                      </span>
                    </li>
                  </ul>
                  <div className="cart-summary-total flex flex-between fs-18">
                    <span className="fw-6">Grand Total: </span>
                    <span className="fw-6">
                      {formatPrice(totalAmount + deliveryCharge)}
                    </span>
                  </div>
                  <div className="cart-summary-btn">
                    <button
                      disabled={isLoading}
                      type="button"
                      className="btn-secondary"
                      onClick={redirectToCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
