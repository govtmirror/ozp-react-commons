'use strict';

var React = require('react');
var Reflux = require('reflux');

var { Navigation } = require('react-router');

var SelfStore = require('../../stores/SelfStore');
var ProfileActions = require('../../actions/ProfileActions');

var Modal = require('../Modal.jsx');

var Toggle = React.createClass({
    propTypes: {
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            <label className="switch">
                <input type="checkbox" className="ios"
                    onChange={this.props.onChange} checked={this.props.checked} />
                <div className="track"><div className="knob"/></div>
                {this.props.children}
            </label>
        );
    }
});

var SettingsWindow = React.createClass({
    mixins: [Reflux.listenTo(SelfStore, 'onStoreChange'), Navigation],

    propsTypes: {
        backRoute: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return this._getState(SelfStore.getDefaultData());
    },

    _getState: function(profileData) {
        var profile = profileData.currentUser,
            launchInWebtop = profile ? profile.launchInWebtop : undefined;

        return {launchInWebtop: launchInWebtop};
    },

    render: function() {
        return (
            <Modal ref="modal" className="settings-window" title="Settings"
                    cancel="Cancel" confirm="Save"
                    onCancel={this.close} onConfirm={this.save}>
                <dl>
                    <dt>
                        Default Application Launch
                        <small>
                            When you click on a listing, this is how
                            your listing will open
                        </small>
                    </dt>
                    <dd>
                        <Toggle onChange={this.onLaunchInWebtopChange}
                                checked={this.state.launchInWebtop}>
                            Open in Webtop
                        </Toggle>
                    </dd>
                </dl>
            </Modal>
        );
    },

    shouldComponentUpdate: function(newProps, newState) {
        return newState.launchInWebtop !== this.state.launchInWebtop;
    },

    onStoreChange: function(profileData) {
        this.setState(this._getState(profileData));
    },

    onLaunchInWebtopChange: function(e) {
        this.setState({launchInWebtop: e.target.checked});
    },

    close: function() {
        this.transitionTo(this.props.backRoute);
    },

    save: function() {
        ProfileActions.updateLaunchPreference(this.state.launchInWebtop);
        this.close();
    }
});

module.exports = SettingsWindow;