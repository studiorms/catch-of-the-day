import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { formatPrice } from "../helpers";

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func,
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        // Make sure fish is loaded from firebase
        if (!fish) {
            return null;
        }
        const isAvailable = fish.status === "available";
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 },
        };
        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {fish ? fish.name : "fish"} is no longer available
                    </li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name} {formatPrice(count * fish.price)}{" "}
                        <button onClick={() => this.props.deleteFromOrder(key)}>
                            &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
        );
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === "available";
            if (isAvailable) {
                return prevTotal + fish.price * count;
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;
