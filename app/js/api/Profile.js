'use strict';

var $ = require('jquery');

var { API_URL } = require('../OzoneConfig');

var ProfileApi = {
    getOwnedListings: function (profileId) {
    	return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}/listing`)
            .then(resp => (resp._embedded ? resp._embedded.item : null) || []);
    },

    getProfile: function (profileId) {
        return $.getJSON(`${API_URL}/api/profile/${encodeURIComponent(profileId)}`);
    }
};

module.exports = ProfileApi;