import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    };
    handleChange = (event) => {
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value,
        };
        this.props.updateFish(this.props.index, updatedFish);
    };
    render() {
        const { name, price, status, desc, image } = this.props.fish;

        return (
            <form className="fish-edit">
                <input
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    value={name}
                />
                <input
                    name="price"
                    type="text"
                    onChange={this.handleChange}
                    value={price}
                />
                <select
                    name="status"
                    onChange={this.handleChange}
                    value={status}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea
                    name="desc"
                    placeholder="Desc"
                    onChange={this.handleChange}
                    value={desc}
                />
                <input
                    name="image"
                    type="text"
                    onChange={this.handleChange}
                    value={image}
                />
                <button
                    onClick={() => {
                        this.props.deleteFish(this.props.index);
                    }}
                >
                    Delete Fish
                </button>
            </form>
        );
    }
}
export default EditFishForm;
