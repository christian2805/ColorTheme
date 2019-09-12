"use strict";

window.addEventListener("DOMcontentLoaded", selectColor);

const colorPicker = document.querySelector("#start-color");
colorPicker.addEventListener("input", selectColor);

function selectColor(event) {
  const color = event.target.value;
  console.log(color);

  document.querySelector("#color-display").style.backgroundColor = color;
  document.querySelector(".hex").innerHTML = color;

  hex2rgb(color);
}
function hex2rgb(hexcolor) {
  let r = Number.parseInt(hexcolor.substring(1, 3), 16);
  let g = Number.parseInt(hexcolor.substring(3, 5), 16);
  let b = Number.parseInt(hexcolor.substring(5, 7), 16);

  document.querySelector(".rgb").innerHTML = `rgb ${r}, ${g}, ${b}`;
  rgb2hsl();
  function rgb2hsl() {
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
      h = 0;
    } else if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
      h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
      s = 0;
    } else {
      s = (max - l) / Math.min(l, 1 - l);
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    l;

    document.querySelector(".hsl").innerHTML = `hsl ${h}, ${s}, ${l}`;
    const hslColor = `hsl(${h}, ${s}%, ${l}%)`;
    console.log(hslColor);
    somthing(h, s, l);
    colorCodeRGB(h, s, l);
    rgb2hsl2(r, g, b);
    // hslToRgb(h, s, l);
  }
}
function somthing(h, s, l) {
  let selectedValue = document.querySelector("#colorTheme").value;
  if (selectedValue == "Analougus") {
    analogue(h, s, l);
  } else if (selectedValue == "Monocromatic") {
    monocromatic(h, s, l);
  }
}
function analogue(h, s, l) {
  console.log(h);
  let colorOne = h + 30;
  let colorTwo = colorOne + 30;
  let colorThree = h - 30;
  let colorFour = colorThree - 30;

  document.querySelector(
    "#color-display1"
  ).style.backgroundColor = `hsl(${colorOne}, ${s}%, ${l}%)`;
  document.querySelector(
    "#color-display2"
  ).style.backgroundColor = `hsl(${colorTwo}, ${s}%, ${l}%)`;
  document.querySelector(
    "#color-display3"
  ).style.backgroundColor = `hsl(${colorThree}, ${s}%, ${l}%)`;
  document.querySelector(
    "#color-display4"
  ).style.backgroundColor = `hsl(${colorFour}, ${s}%, ${l}%)`;
}

function monocromatic(h, s, l) {
  console.log(l);
  let mColorOne = l + 10;
  let mColorTwo = mColorOne + 10;
  let mColorThree = l - 10;
  let mColorFour = mColorThree - 10;

  document.querySelector(
    "#color-display1"
  ).style.backgroundColor = `hsl(${h}, ${s}%, ${mColorOne}%)`;
  document.querySelector(
    "#color-display2"
  ).style.backgroundColor = `hsl(${h}, ${s}%, ${mColorTwo}%)`;
  document.querySelector(
    "#color-display3"
  ).style.backgroundColor = `hsl(${h}, ${s}%, ${mColorThree}%)`;
  document.querySelector(
    "#color-display4"
  ).style.backgroundColor = `hsl(${h}, ${s}%, ${mColorFour}%)`;
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion?fbclid=IwAR3FFAyAAykf3ru6WO980TFHhXx4ctCLbgNkpPckHQPNgziCHoLudo4O-Pc
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  Math.round(r * 255), Math.round(g * 255), Math.round(b * 255);
  console.log("hjemme", r, g, b);
}
function colorCodeRGB(h, s, l) {
  let oneRGB = document.querySelector("#color-display1").style.backgroundColor;
  let twoRGB = document.querySelector("#color-display2").style.backgroundColor;
  let threeRGB = document.querySelector("#color-display3").style
    .backgroundColor;
  let fourRGB = document.querySelector("#color-display4").style.backgroundColor;

  document.querySelector(".rgb1").innerHTML = `${oneRGB}`;
  document.querySelector(".rgb2").innerHTML = `${twoRGB}`;
  document.querySelector(".rgb3").innerHTML = `${threeRGB}`;
  document.querySelector(".rgb4").innerHTML = `${fourRGB}`;

  oneRGB = oneRGB.split(",");
  console.log(oneRGB);
  let r = oneRGB[0].slice(4, 7);
  r = parseInt(r, 10);
  let g = oneRGB[1].slice(1, 4);
  g = parseInt(g, 10);
  let b = oneRGB[2].slice(1, 4);
  b = parseInt(b, 10);
  let rgb = {};
  rgb.r = r;
  rgb.g = g;
  rgb.b = b;

  let rgbToHex = function(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }

    return hex;
  };
  let fullColorHex = function(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
  };
  document.querySelector(".hex1").textContent = `HEX: #${fullColorHex(
    r,
    g,
    b
  )}`;
}
function rgb2hsl2(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  l;
  Math.round.h;
  Math.round.s;
  Math.round.l;

  document.querySelector(".hsl1").textContent = `hsl ${h}, ${s}%, ${l}%`;
  console.log("what?", Math.round(h), Math.round(l), Math.round(s));
}
