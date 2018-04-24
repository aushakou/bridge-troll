'use strict';

// Using Material Icons as inline SVG - https://material.io/icons/

const leaflet = require('leaflet');

// Read contents of SVG files from bundle as Data URLs
// const whiteLocationSvgUrl = require('../icons/material-icons/location-white.svg');
const blackLockedSvgUrl = require("../icons/material-icons/locked-black.svg");
const whiteLockedSvgUrl = require("../icons/material-icons/locked-white.svg");
const blackUnlockedSvgUrl = require("../icons/material-icons/unlocked-black.svg");
const whiteUnlockedSvgUrl = require("../icons/material-icons/unlocked-white.svg");
const whiteLocationSvgUrl = require('../icons/material-icons/location-white.svg');
const blackLocationSvgUrl = require("../icons/material-icons/location-black.svg");

// All icons share the same size, define it once
const iconSize = [25, 25];

module.exports.whiteLocation = leaflet.icon({
  iconUrl: whiteLocationSvgUrl,
  iconSize
});

module.exports.whiteLocked = leaflet.icon({
  iconUrl: whiteLockedSvgUrl,
  iconSize
});

module.exports.whiteUnlocked = leaflet.icon({
  iconUrl: whiteUnlockedSvgUrl,
  iconSize
});

module.exports.blackLocation = leaflet.icon({
  iconUrl: blackLocationSvgUrl,
  iconSize
});

module.exports.blackLocked = leaflet.icon({
  iconUrl: blackLockedSvgUrl,
  iconSize
});

module.exports.blackUnlocked = leaflet.icon({
  iconUrl: blackUnlockedSvgUrl,
  iconSize
});
