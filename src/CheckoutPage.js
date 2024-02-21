import React from "react";
import "./index.css";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import RevolutCheckout from "@revolut/checkout";
// const apiPublicKey = process.env.REACT_APP_API_PUBLIC_KEY;
const apiSecretKey = process.env.REACT_APP_API_SECRET_KEY;

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 1,
      order: {},
      loading: false,
      error: null,
    };
  }

  handleSubmit = (e) => {
    console.log("Pay now!");
    this.createRevOrder(e);
  };

  startPopUp = async (e) => {
    console.log("start pop up");
    e.preventDefault();
    const { order } = this.state;
    const response = await RevolutCheckout(order.token, "sandbox").then(
      function (instance) {
        console.log("RevolutCheckout.then -- ");
        instance.payWithPopup({
          onSuccess() {
            window.alert("Thank you!");
          },
          onCancel() {
            window.alert("Payment cancelled :(");
          },
          onError(error) {
            window.alert(`Something went wrong. ${error}`);
            this.setState({ error: error });
          },
        });
      }
    );
  };

  createRevOrder = (e) => {
    console.log("createRevOrder");
    let data = JSON.stringify({
      amount: this.totalPrice,
      currency: "GBP",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://sandbox-merchant.revolut.com/api/orders",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Revolut-Api-Version": "2023-09-01",
        Authorization: `Bearer ${apiSecretKey}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => response.json())
      .then((data) => {
        console.log("order created - ", data);
        let token = data.token;
        this.setState({ orderToken: token });
      })
      .then(() => {
        this.startPopUp(e);
      })
      .catch((error) => {
        console.log("error: ", error.message);
        this.setState({ error: error.message });
      });
  };

  render() {
    const { totalPrice, order, loading, error } = this.state;

    return (
      <div className="App">
        <nav>
          <h1>The Shop</h1>
        </nav>
        <div className="basket">
          <h3>Your Basket</h3>
          {loading && <ClipLoader color="#36d7b7" />}
          {error && <p className="error">Error: {error}</p>}
          <div className="basket-body">
            <div className="product">
              <p>Product Name</p>
              <p>£1.00</p>
            </div>
            <div className="basket-total">Total: £ {totalPrice}</div>
            <button onClick={this.handleSubmit}>Pay now</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutPage;
