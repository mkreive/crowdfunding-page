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
        id: 1,
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
        id: 2,
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

// VARIABLES
let openedModal;
let activePledge;
let pledgeActive;
let bookmarked;

// FUNCTIONS
const openModal = function (modal) {
    openedModal = modal;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function (modal) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

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

const setLocalStorage = function () {
    localStorage.setItem("pledge", JSON.stringify(pledges));
};
const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("pledge"));
    if (!data) {
        bookmarked = false;
    } else {
        pledges = data;
    }
    return data;
};

const bookmarkIt = function () {
    bookmarkBtn.classList.add("bookmarked");
    bookmarkBtn.innerText = "Bookmarked!";
    bookmarked = true;
};
const removeBookmark = function () {
    bookmarkBtn.classList.remove("bookmarked");
    bookmarkBtn.innerText = "Bookmark";
    bookmarked = false;
};

const innerTextSetter = function (pledge) {
    pledgeSumGoalEl.innerText = pledge.sumGoal;
    pledgeSumBackedEl.innerText = pledge.sumBacked;
    pledgeBackersCountEl.innerText = pledge.numBackers;
    pledgeDaysLeftEl.innerText = pledge.daysLeft;
    progressBar.value = pledge.sumBacked;
    progressBar.max = pledge.sumGoal;
};

// EVENT HANDLERS
window.addEventListener("load", function () {
    const savedData = getLocalStorage();

    if (!savedData) {
        return (activePledge = pledges[0]);
    } else if (savedData) {
        [activePledge] = savedData.filter(
            (pledge) => pledge.bookmarked === true
        );
        bookmarkIt();
    }

    innerTextSetter(activePledge);
});

bookmarkBtn.addEventListener("click", function () {
    if (activePledge.bookmarked === false) {
        localStorage.clear();
        activePledge.bookmarked = true;
        setLocalStorage();
        bookmarkIt();
    } else if (activePledge.bookmarked === true) {
        localStorage.clear();
        activePledge.bookmarked = false;
        setLocalStorage();
        removeBookmark();
    }
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
