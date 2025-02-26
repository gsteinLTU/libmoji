"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// holds all possible traits and outfits
var assets = require("./json/assets.json");

// Holds all bitmoji template data
var apiData = require("./json/templates.json");

// regular bitmoji template data
var templates = apiData["imoji"]; // consider renaming too 'imoji' for passthrough consistency

// friend bitmoji (friendmoji) template data
var friends = apiData["friends"];

// holds all possible genders and their values
var genders = [["male", 1], ["female", 2]];

// holds all possible avatar poses
var poses = ["fashion", "head", "body"];

// holds all possible styles and their values
var styles = [["bitstrips", 1], ["bitmoji", 4], ["cm", 5]];

// holds the part of the preview avatar url that is the same for all combinations
var basePreviewUrl = "https://preview.bitmoji.com/avatar-builder-v3/preview/";

// holds the part of the cpanel avatar url that is the same for all comics
var baseCpanelUrl = "https://render.bitstrips.com/v2/cpanel/";

// holds the part of the render avatar url that is the same for all comics
var baseRenderUrl = "https://render.bitstrips.com/render/";

// returns an object with a list of all possible traits for a gender and style
var getTraits = function getTraits(gender, style) {
  return assets["traits"][gender][style]["categories"];
};

// returns an object with a list of all possible brands for a gender
var getBrands = function getBrands(gender) {
  return assets["outfits"][gender]["brands"];
};

// returns an object with a list of all possible outfits for a brand
var getOutfits = function getOutfits(brand) {
  return brand["outfits"];
};

// returns an object with a list of all possible values for a trait
var getValues = function getValues(trait) {
  return trait["options"];
};

// returns the name of a trait as a string
var getKey = function getKey(trait) {
  return trait["key"];
};

//return the avatar uuid from a comic url as a string
var getAvatarUuid = function getAvatarUuid(url) {
  return url.split('-').slice(5, 10).join('-');
};

// returns the avatar id from a comic url as a string
var getAvatarId = function getAvatarId(url) {
  return url.split('-').slice(1, 3).join('-');
};

// returns the comic id as a string
var getComicId = function getComicId(template) {
  return template["comic_id"];
};

// returns a random integer between 0 (included) and the max (excluded)
var randInt = function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

// returns a random brand object which contains outfits
var randBrand = function randBrand(brands) {
  return brands[randInt(brands.length)];
};

// returns a random outfit value as a string
var randOutfit = function randOutfit(outfits) {
  return outfits[randInt(outfits.length)]["id"];
};

// returns a random value for a trait as a string
var randValue = function randValue(values) {
  return values[randInt(values.length)]["value"];
};

// returns an array containing traits with random key value pairs
var randTraits = function randTraits(traits) {
  return traits.map(function (trait) {
    return [getKey(trait), randValue(getValues(trait))];
  });
};

// map a trait object to a list of strings
var mapTraits = function mapTraits(traits) {
  return traits.map(function (trait) {
    return "&".concat(trait[0], "=").concat(trait[1]);
  });
};

// return a random comic object
var randTemplate = function randTemplate(templates) {
  return templates[randInt(templates.length)];
};

// return brand data:
// filter out specific fields and values when returnFilteredFields = false
// return only specific fields and values when returnFilteredFields = true
var filterBrands = function filterBrands(brands, filters) {
  var returnFilteredFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return brands.map(function (brand) {
    var brandFilter = filters[brand.name];
    if (brandFilter !== undefined) {
      // filter configuration exists for this brand
      var filterKeys = Object.keys(brandFilter);
      return _objectSpread(_objectSpread({}, brand), {}, {
        outfits: brand.outfits.filter(function (outfit) {
          var filterKey, i, filterItem;
          for (i = 0; i < filterKeys.length; i++) {
            // iterate over filter keys; filter data
            filterKey = filterKeys[i];
            filterItem = brandFilter[filterKey].includes(outfit[filterKey]);
            if (filterItem) {
              return returnFilteredFields ? filterItem : !filterItem;
            }
          }
          return !returnFilteredFields;
        })
      });
    }
    return brand;
  });
};

// returns the image url of a bitmoji avatar with the specified parameters
function buildPreviewUrl(pose, scale, gender, style, rotation, traits, outfit) {
  // use string templating to build the url
  var url = "".concat(basePreviewUrl).concat(pose, "?scale=").concat(scale, "&gender=").concat(gender, "&style=").concat(style);
  url += "&rotation=".concat(rotation).concat(mapTraits(traits).join(""), "&outfit=").concat(outfit);
  return url;
}

// returns the image url of a bitmoji comic with the specified paramters
function buildCpanelUrl(comicId, avatarId, transparent, scale) {
  return "".concat(baseCpanelUrl).concat(comicId, "-").concat(avatarId, "-v3.png?transparent=").concat(transparent, "&scale=").concat(scale);
}

// returns the image url of a bitmoji comic with the specified paramters
function buildRenderUrl(comicId, avatarId, transparent, scale, outfit) {
  return "".concat(baseRenderUrl).concat(comicId, "/").concat(avatarId, "-v3.png?transparent=").concat(transparent, "&scale=").concat(scale).concat(outfit ? "&outfit=".concat(outfit) : '');
}

// returns the image url of a friendmoji comic with the specified paramters
function buildFriendmojiUrl(comicId, avatarId1, avatarId2, transparent, scale) {
  return "".concat(baseCpanelUrl).concat(comicId, "-").concat(avatarId1, "-").concat(avatarId2, "-v3.png?transparent=").concat(transparent, "&scale=").concat(scale);
}
// export all functions to be used
module.exports = _defineProperty(_defineProperty({
  templates: templates,
  friends: friends,
  genders: genders,
  poses: poses,
  styles: styles,
  basePreviewUrl: basePreviewUrl,
  baseCpanelUrl: baseCpanelUrl,
  baseRenderUrl: baseRenderUrl,
  getTraits: getTraits,
  getBrands: getBrands,
  filterBrands: filterBrands,
  getOutfits: getOutfits,
  getValues: getValues,
  getKey: getKey,
  getAvatarUuid: getAvatarUuid,
  getAvatarId: getAvatarId,
  getComicId: getComicId,
  randInt: randInt,
  randBrand: randBrand,
  randOutfit: randOutfit,
  randValue: randValue,
  randTraits: randTraits,
  mapTraits: mapTraits,
  randTemplate: randTemplate,
  buildPreviewUrl: buildPreviewUrl,
  buildCpanelUrl: buildCpanelUrl,
  buildRenderUrl: buildRenderUrl
}, "buildRenderUrl", buildRenderUrl), "buildFriendmojiUrl", buildFriendmojiUrl);