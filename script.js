"use strict";
// ONLOAD FUNCTIONS
// const daysLeftCounter = function (startDay, endDay) {
//     let currentDay = new Date();
//     let end = new Date(endDay);
//     let start = new Date(startDay);
//     const oneDay = 24 * 60 * 60 * 1000;
//     console.log(currentDay);
//     console.log(startDay);
//     // return Math.ceil((end.getTime() - currentDay.getTime()) / oneDay);
// };

// DATA
let pledges = [
    {
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
        sumBacked: 89914,
        numBackers: 5007,
        startDate: "2020.01.13",
        daysTotal: 100,
        daysLeft: 70,
        bookmarked: false,
    },
    {
        name: "Magnificent New Board Game Project",
        rewards: [
            {
                name: "Pledge with no reward",
                countTotal: 999999,
                countLeft: 999999,
            },
            {
                name: "Junior Pledger",
                countTotal: 300,
                countLeft: 101,
            },
            {
                name: "Master Pledger",
                countTotal: 300,
                countLeft: 0,
            },
        ],
        sumGoal: 500000,
        sumBacked: 58990,
        numBackers: 985,
        daysTotal: 100,
        daysLeft: 77,
        bookmarked: false,
    },
];

// ELEMENTS
// buttons
const backProjectBtn = document.getElementById("backProjectBtn");
const selectRewardButton = document.querySelectorAll(".reward");
const closeBtn = document.querySelector(".btn-close");
const radioElement = document.querySelectorAll(".card-radio");
const bookmarkBtn = document.querySelector(".btn-bookmark");

// modals
const overlay = document.querySelector(".overlay");
const modalPledge = document.querySelector(".modal-default");
const pledgeElement = document.querySelectorAll(".card-modal");
const pledgeAddonElement = document.querySelector(".modal-addon");

// navigation
const navLinks = document.querySelectorAll(".nav__link");

// headers
const pledgeMOdalHeaders = modalPledge.querySelectorAll(".header-medium");
const chosenProject = document.getElementById("project");

// pledge info
const pledgeSumGoalEl = document.getElementById("sum-goal");
const pledgeSumBackedEl = document.getElementById("sum-backed");
const pledgeBackersCountEl = document.getElementById("backers");
const pledgeDaysLeftEl = document.getElementById("days-left");
const progressBar = document.getElementById("progress");

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
let activePledge;
let bookmarks = localStorage;
console.log(bookmarks);
window.addEventListener("load", function (e) {
    let project = chosenProject.innerText;
    [activePledge] = pledges.filter((pledge) => pledge.name == project);

    pledgeSumGoalEl.innerText = activePledge.sumGoal;
    pledgeSumBackedEl.innerText = activePledge.sumBacked;
    pledgeBackersCountEl.innerText = activePledge.numBackers;
    pledgeDaysLeftEl.innerText = activePledge.daysLeft;
    progressBar.value = activePledge.sumBacked;
    progressBar.max = activePledge.sumGoal;

    // return activePledge;
});

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

bookmarkBtn.addEventListener("click", function () {
    if ((localStorage.bookmarked = false)) {
        activePledge.bookmarked = true;
        localStorage.setItem(activePledge.bookmarked, true);
        bookmarkBtn.classList.add("btn-active");
        bookmarkBtn.innerHTML = "Bookmarked";
    } else {
    }
});
