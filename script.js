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
                name: "Black Edition Stand",
                countTotal: 200,
                countLeft: 64,
                minSum: 25,
            },
            {
                name: "Bamboo Stand",
                countTotal: 300,
                countLeft: 101,
                minSum: 75,
            },
            {
                name: "Mahogany Special Edition",
                countTotal: 100,
                countLeft: 0,
                minSum: 200,
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
                name: "Junior Pledger",
                countTotal: 300,
                countLeft: 101,
                minSum: 50,
            },
            {
                name: "Master Pledger",
                countTotal: 300,
                countLeft: 0,
                minSum: 300,
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
const rewardHeaderEl = document.querySelectorAll(".reward-name");

// pledge info
const pledgeSumGoalEl = document.getElementById("sum-goal");
const pledgeSumBackedEl = document.getElementById("sum-backed");
const pledgeBackersCountEl = document.getElementById("backers");
const pledgeDaysLeftEl = document.getElementById("days-left");
const progressBar = document.getElementById("progress");
const pledgeInfoEl = document.querySelector(".pledge-main");

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

const renderReward = function (pledge) {
    const rewards = pledge.rewards;
    if (!rewards) return;

    rewards.forEach((reward) => {
        let html = `
        <div class="${
            reward.countLeft < 1
                ? "card card-pledge inactive"
                : "card card-pledge "
        }">
            <div class="couples">
                <h3 class="header-medium reward-name">
                    ${reward.name}
                </h3>
                <span class="bidding">Pledge $${reward.minSum} or more</span>
            </div>
            <p class="text">
                You get an ergonomic stand made of natural
                bamboo. You've helped us launch our promotional
                campaign, and you’ll be added to a special
                Backer member list.
            </p>
            <div class="couples">
                <div class="couples-left">
                <span class="header-big">${reward.countLeft}</span
                    ><span class="text">left</span>
            </div>
            <button class="btn reward">
                ${reward.countLeft > 1 ? "Select Reward" : "Out of Stock"}
            </button>
            </div>
        </div>
        `;

        pledgeInfoEl.insertAdjacentHTML("beforeend", html);
    });
};

const innerTextSetter = function (pledge) {
    pledgeSumGoalEl.innerText = `of $${pledge.sumGoal.toLocaleString()} backed`;
    pledgeSumBackedEl.innerText = `$${pledge.sumBacked.toLocaleString()}`;
    pledgeBackersCountEl.innerText = pledge.numBackers.toLocaleString();
    pledgeDaysLeftEl.innerText = pledge.daysLeft;
    progressBar.value = +pledge.sumBacked;
    progressBar.max = +pledge.sumGoal;
};

// EVENT HANDLERS
window.addEventListener("load", function () {
    const savedData = getLocalStorage();

    if (!savedData) {
        activePledge = pledges[0];
    } else if (savedData) {
        const [...bookmarkedPledges] = savedData.filter(
            (pledge) => pledge.bookmarked === true
        );

        if (bookmarkedPledges.length < 1) {
            activePledge = pledges[0];
        } else {
            bookmarkIt();
            activePledge = bookmarkedPledges[0];
        }
        if (!activePledge) {
            activePledge = pledges[0];
        }
    }

    innerTextSetter(activePledge);

    activePledge.rewards;
    renderReward(activePledge);
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
