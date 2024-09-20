import { useQuerySelector } from "../composiable/useQuerySelector.js";
import { useQuerySelectorAll } from "../composiable/useQuerySelectorAll.js";

let previousMonth = null;
let previousAmount = null;
let result = null;

const precent = {
  0: 4.3,
  1: 5.3,
  2: 6.3,
  3: 7.3,
  4: 8.3,
};

function addScroll() {
  if (window.scrollY > 0) {
    useQuerySelector(".header").classList.add("header_scroll");
  } else {
    useQuerySelector(".header").classList.remove("header_scroll");
  }
}

window.addEventListener("scroll", addScroll);

// burger
useQuerySelector(".menu__icon").addEventListener("click", () => {
  useQuerySelector(".menu__icon").classList.toggle("menu__icon_active");
  useQuerySelector(".menu__body").classList.toggle("menu__body_active");
});

// validation
useQuerySelector(".banner__form").addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = useQuerySelector("#name");
  const sanitizedNameInput = nameInput.value.replace(/\d/g, "");
  const inputNameValue = nameInput.value.trim();
  const surnameInput = useQuerySelector("#surname");
  const sanitizedSurnameInput = surnameInput.value.replace(/\d/g, "");
  const inputSurnameValue = surnameInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // name
  if (inputNameValue === "") {
    useQuerySelector(".banner__form-error-name").innerHTML =
      "Це поле не може бути порожнім.";
    useQuerySelector(".banner__form-error-name").style.display = "block";
  } else if (inputNameValue !== sanitizedNameInput) {
    useQuerySelector(".banner__form-error-name").innerHTML =
      "Ім'я не може містити цифри.";
    useQuerySelector(".banner__form-error-name").style.display = "block";
  } else if (sanitizedNameInput.length < 2) {
    useQuerySelector(".banner__form-error-name").innerHTML =
      "Ім'я має містити принаймні 2 символи.";
    useQuerySelector(".banner__form-error-name").style.display = "block";
  } else {
    useQuerySelector(".banner__form-error-name").innerHTML = "";
    useQuerySelector(".banner__form-error-name").style.display = "none";
  }

  // surname
  if (inputSurnameValue === "") {
    useQuerySelector(".banner__form-error-surname").innerHTML =
      "Це поле не може бути порожнім.";
    useQuerySelector(".banner__form-error-surname").style.display = "block";
  } else if (inputSurnameValue !== sanitizedSurnameInput) {
    useQuerySelector(".banner__form-error-surname").innerHTML =
      "Прізвище не може містити цифри.";
    useQuerySelector(".banner__form-error-surname").style.display = "block";
  } else if (sanitizedSurnameInput.length < 2) {
    useQuerySelector(".banner__form-error-surname").innerHTML =
      "Прізвище має містити принаймні 2 символи.";
    useQuerySelector(".banner__form-error-surname").style.display = "block";
  } else {
    useQuerySelector(".banner__form-error-surname").innerHTML = "";
    useQuerySelector(".banner__form-error-surname").style.display = "none";
  }

  // email
  if (!useQuerySelector("#email").value.trim()) {
    useQuerySelector(".banner__form-error-email").innerHTML =
      "Це поле не може бути порожнім.";
    useQuerySelector(".banner__form-error-email").style.display = "block";
  } else if (!emailPattern.test(useQuerySelector("#email").value)) {
    useQuerySelector(".banner__form-error-email").innerHTML =
      "Будь ласка, введіть коректний e-mail.";
    useQuerySelector(".banner__form-error-email").style.display = "block";
  } else {
    useQuerySelector(".banner__form-error-email").innerHTML = "";
    useQuerySelector(".banner__form-error-email").style.display = "none";
  }

  const lengthNum =
    useQuerySelector("#phone").value.trim().length < 12 ||
    useQuerySelector("#phone").value.trim().length > 12;

  if (!useQuerySelector("#phone").value.trim()) {
    useQuerySelector(".banner__form-error-phone").innerHTML =
      "Це поле не може бути порожнім.";
    useQuerySelector(".banner__form-error-phone").style.display = "block";
  } else if (lengthNum) {
    useQuerySelector(".banner__form-error-phone").innerHTML =
      "Не віриний формат номеру";
    useQuerySelector(".banner__form-error-phone").style.display = "block";
  } else {
    useQuerySelector(".banner__form-error-phone").innerHTML = "";
    useQuerySelector(".banner__form-error-phone").style.display = "none";
  }
});

console.log(useQuerySelector("#phone").value);

function calcResult() {
  if (previousAmount !== null) {
    result = Math.round(previousAmount * previousMonth);

    useQuerySelector(".info__result_sum").innerHTML = "€" + " " + result;
  }
}

$(".month").ionRangeSlider({
  grid: true,
  from: 0,
  values: ["1 month", "3 month", "6 month", "9 month", "12 month"],

  onFinish: function (data) {
    if (data.from === previousMonth) return;

    let convertVal = precent[data.from];

    previousMonth = convertVal;

    calcResult();
  },
  onStart: function (data) {
    previousMonth = precent[data.from];
  },
});

$(".summa").ionRangeSlider({
  grid: true,
  min: 300,
  max: 15000,
  step: 100,
  from: 2000,
  postfix: "  €",
  prettify_enabled: true,

  onChange: function (data) {
    if (data.from === previousAmount) return;

    previousAmount = data.from;

    calcResult();
  },

  onUpdate: function (data) {
    console.log(data.from);
  },

  onStart: function (data) {
    previousAmount = data.from;

    calcResult();
  },
});

window.intlTelInput(useQuerySelector("#phone"), {
  initialCountry: "ua",
  separateDialCode: false,
  useFullscreenPopup: false,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js",
});

// swiper
const swiper = new Swiper(".swiper", {
  loop: true,
  spaceBetween: 20,
});
