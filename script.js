"use strict";
// DATA
const pledge1 = {
    name: "Mastercraft Bamboo Monitor Riser",
    rewards: [
        {
            name: "Pledge with no reward",
            countTotal: 999999,
            countLeft: 999999,
        },
        {
            name: "Bamboo Stand",
            countTotal: 300,
            countLeft: 101,
        },
        {
            name: "Mahogany Special Edition",
            countTotal: 300,
            countLeft: 0,
        },
    ],
    sumGoal: 100000,
    sumBAcked: 89914,
    numBackers: 5007,
    daysTotal: 100,
    daysLeft: 56,
};

// ELEMENTS
const backBtn = document.getElementById("backBtn");
const modalPledge = document.querySelector(".modal-default");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn-close");

// FUNCTIONS
let openedModal;
const openModal = function (modal) {
    openedModal = modal;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function (modal) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

// EVENT HANDLERS
backBtn.addEventListener("click", function () {
    openModal(modalPledge);
});

closeBtn.addEventListener("click", function () {
    closeModal(modalPledge);
});
