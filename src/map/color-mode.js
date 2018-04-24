'use strict';

const log = require('../log');
const SunCalc = require('suncalc');
const svgMarker = require('../svg-marker');

const leafletObject = {
  attribution: '',
  tileUrl: '',
};

let colorModeType = '';

const pos = {
  lat: null,
  lng: null,
};

const self = (module.exports = {
  checkColorMode: (option, lat, lng) => {
    let sunPos = SunCalc.getTimes(Date.now(), lat, lng);
    if (Date.now() > sunPos.sunrise && Date.now() < sunPos.sunset) {
      self.setColorModeType("light");
      leafletObject[option] = self.getColorMode(option, "light");
      return leafletObject[option];
    } else {
      self.setColorModeType("dark");
      leafletObject[option] = self.getColorMode(option, "dark");
      return leafletObject[option];
    }
  },

  getColorMode: (option, type) => {
    if (type === "light") {
      if (option === "attribution") {
        return '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';
      } else {
        return "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
      }
    } else if (type === "dark") {
      if (option === "attribution") {
        return '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
      } else {
        return "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
      }
    } else {
      // default values just in case
      if (option === "attribution") {
        return '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';
      } else {
        return "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
      }
    }
  },

  setPositionsForColorMode: (lat, lng) => {
    pos.lat = lat;
    pos.lng = lng;
  },

  getLeafletAttribution: (lat, lng) => {
    return self.checkColorMode("attribution", lat, lng);
  },

  getLeafletTileUrl: (lat, lng) => {
    return self.checkColorMode("tileUrl", lat, lng);
  },

  updateCheckColorMode: (option, lat, lng) => {
    let sunPos = SunCalc.getTimes(Date.now(), lat, lng);
    if (Date.now() > sunPos.sunrise && Date.now() < sunPos.sunset) {
      self.setColorModeType("light");
      return self.getColorMode(option, "light");
    } else {
      self.setColorModeType("dark");
      return self.getColorMode(option, "dark");
    }
  },

  update: map => {
    if (
      self.updateCheckColorMode("tileUrl", pos.lat, pos.lng) !==
      leafletObject.tileUrl
    ) {
      log.info("color-mode updated");
      map.update(pos.lat, pos.lng);
    }
  },

  getColorModeType: () => {
    return colorModeType;
  },

  setColorModeType: type => {
    colorModeType = type;
  },

  getLocationIcon: () => {
    if (self.getColorModeType() === 'dark') {
      return svgMarker.whiteLocation;
    } else {
      return svgMarker.blackLocation;
    }
  },

  getLockedIcon: () => {
    if (self.getColorModeType() === 'dark') {
      return svgMarker.whiteLocked;
    } else {
      return svgMarker.blackLocked;
    }
  },

  getUnlockedIcon: () => {
    if (self.getColorModeType() === 'dark') {
      return svgMarker.whiteUnlocked;
    } else {
      return svgMarker.blackUnlocked;
    }
  }
});
