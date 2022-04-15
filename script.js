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
// buttons
const backProjectBtn = document.getElementById("backProjectBtn");
const selectRewardButton = document.querySelectorAll(".reward");
const closeBtn = document.querySelector(".btn-close");
const radioElement = document.querySelectorAll(".card-radio");

// modals
const overlay = document.querySelector(".overlay");
const modalPledge = document.querySelector(".modal-default");
const pledgeElement = document.querySelectorAll(".card-modal");
const pledgeAddonElement = document.querySelector(".modal-addon");

// navigation
const navLinks = document.querySelectorAll(".nav__link");

// headers
const pledgeMOdalHeaders = modalPledge.querySelectorAll(".header-medium");

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

let pledgeActive;
const selectPledge = function (pledge) {
    pledgeActive = pledge;
    pledge.classList.add("active");
    pledgeAddonElement.classList.remove("hidden");
    pledge.appendChild(pledgeAddonElement);
};
const activePledgeRemoving = function () {
    let oldActivePledge = pledgeActive;
    oldActivePledge.classList.remove("active");
    oldActivePledge.removeChild(pledgeAddonElement);
};

// EVENT HANDLERS
backProjectBtn.addEventListener("click", function () {
    openModal(modalPledge);
});

closeBtn.addEventListener("click", function () {
    closeModal(modalPledge);
});
pledgeElement.forEach((pledge) => {
    pledge.addEventListener("click", function (e) {
        let pledge = e.currentTarget;
        if (!pledgeActive) {
            selectPledge(pledge);
        } else {
            activePledgeRemoving();
            selectPledge(pledge);
        }
    });
});

selectRewardButton.forEach((reward) => {
    reward.addEventListener("click", function (e) {
        let parentNode = e.target.parentNode.parentNode;
        let rewardName = parentNode.querySelector(".header-medium").innerText;

        pledgeMOdalHeaders.forEach((header) => {
            if (header.innerText.trim("") == rewardName) {
                const activeCard = header.closest(".card-modal");
                selectPledge(activeCard);
            } else {
                return;
            }
        });

        openModal(modalPledge);
    });
});
