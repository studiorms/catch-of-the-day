import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import base, { firebaseApp } from "../base";
import Login from "./Login";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null,
    };

    authHandler = async (authData) => {
        // 1. Lookup current store in firebase db
        const store = await base.fetch(this.props.storeId, { context: this });
        // 2. Claim it if no owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid,
            });
        }
        // 3. Set the state of the inventory comp to reflect the current owner
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,
        });
    };
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}authProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    render() {
        const logout = <button onClick={this.logout}>Logout!</button>;

        // check if logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // check in not a owner of store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            );
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map((key) => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
                {logout}
            </div>
        );
    }
}

export default Inventory;
