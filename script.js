"use strict";

// DATA
let pledges = [
    {
        id: 1,
        name: "Mastercraft Bamboo Monitor Riser",
        about: "A beautiful & handcrafted monitor stand to reduce neck and eye strain.",
        rewards: [
            {
                id: 1,
                name: "Black Edition Stand",
                countTotal: 200,
                countLeft: 55,
                minSum: 30,
            },
            {
                id: 2,
                name: "Bamboo Stand",
                countTotal: 300,
                countLeft: 99,
                minSum: 90,
            },
            {
                id: 3,
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
        about: "Neverseen before board game you will want to play everyday",
        rewards: [
            {
                id: 1,
                name: "Junior Pledger",
                countTotal: 300,
                countLeft: 101,
                minSum: 50,
            },
            {
                id: 2,
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
const successModal = document.querySelector(".modal-success");

// navigation
const navLinks = document.querySelectorAll(".nav__link");

// headers
const pledgeMOdalHeaders = modalPledge.querySelectorAll(".header-medium");
const chosenProject = document.getElementById("project");
const rewardHeaderEl = document.querySelectorAll(".reward-name");
const aboutPledgeEl = document.querySelector(".about-pledge");

// pledge info
const pledgeSumGoalEl = document.getElementById("sum-goal");
const pledgeSumBackedEl = document.getElementById("sum-backed");
const pledgeBackersCountEl = document.getElementById("backers");
const pledgeDaysLeftEl = document.getElementById("days-left");
const progressBar = document.getElementById("progress");
const pledegeInputValue = document.querySelectorAll(".pledge-amount");

// rewards card
const pledgeInfoEl = document.querySelector(".pledge-main");
const rewardsCardEl = document.querySelectorAll(".card-pledge");
const rewardsCountLeftEl = document.querySelectorAll(".rewards-count");
const rewardBiddingSumEl = document.querySelectorAll(".bidding");

// VARIABLES
let openedModal;
let activePledge;
let bookmarked;
let chosenRewardId;
let pledgeActive;

// FUNCTIONS
// local storage
const setLocalStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorage = function (key) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
        return data;
    } else if (!data) {
        return;
    }
};
const removeItemLocalStorage = function (key, value) {
    if (!key || !value) return;
    const data = getLocalStorage(key);
    if (data == value) window.localStorage.removeItem(key);
};

// rendering HTML elements
const innerTextSetter = function (pledge) {
    chosenProject.innerText = `${pledge.name}`;
    aboutPledgeEl.innerText = `${pledge.about}`;
    pledgeSumGoalEl.innerText = `of $${pledge.sumGoal.toLocaleString()} backed`;
    pledgeSumBackedEl.innerText = `$${pledge.sumBacked.toLocaleString()}`;
    pledgeBackersCountEl.innerText = pledge.numBackers.toLocaleString();
    pledgeDaysLeftEl.innerText = pledge.daysLeft;
    progressBar.value = +pledge.sumBacked;
    progressBar.max = +pledge.sumGoal;
};
const renderReward = function (pledge) {
    const rewards = pledge.rewards;
    if (!rewards) return;

    rewards.forEach((reward) => {
        const html = `
        <div class="${
            reward.countLeft > 0
                ? "card card-pledge"
                : "card card-pledge inactive"
        }" >
            <div class="couples">
                <h3 class="header-medium reward-name" id="${reward.id}">
                ${reward.name}</h3>
                <span class="bidding">Pledge $${reward.minSum} or more</span>
            </div>
            <p class="text">
                You get a Black Special Edition computer stand
                and a personal thank you. You’ll be added to our
                Backer member list. Shipping is included.
            </p>
            <div class="couples">
                <div class="couples-left">
                    <span class="header-big rewards-count"
                        >${reward.countLeft}</span
                    ><span class="text">left</span>
                </div>
                <button class="btn reward">
                    ${reward.countLeft > 0 ? "Select Reward" : "Out of Stock"}
                </button>
            </div>
        </div>`;
        pledgeInfoEl.insertAdjacentHTML("beforeend", html);
    });
    activateRewardListeners();
};
const renderRewardsModal = function (pledge) {
    const rewards = pledge.rewards;
    let i = 1;
    if (!rewards) return;
    rewards.forEach((reward) => {
        const html = `
            <div class="${
                reward.countLeft > 0
                    ? "card card-modal"
                    : "card card-modal inactive"
            }" id="${i++}">
                <div>
                    <input type="radio" name="radio" class="card-radio" />
                </div>
                <div>
                    <div class="couples">
                        <div class="couples-left">
                            <h3 class="header-medium">${reward.name}</h3>
                            <span class="bidding">Pledge $${
                                reward.minSum
                            } or more</span>
                    </div>
                    <div class="couples-left">
                        <span class="header-medium">${reward.countLeft}</span
                        ><span class="text">left</span>
                    </div>
                </div>
                <p class="text">
                    You get an ergonomic stand made of natural bamboo.
                    You've helped us launch our promotional campaign,
                    and you’ll be added to a special Backer member list.
                </p>
            </div>
        </div>`;
        modalPledge.insertAdjacentHTML("beforeend", html);
    });
    rewardModalListener(rewards);
};

// UI stuff
const openModal = function (modal) {
    openedModal = modal;
    openedModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    scroll(0, 0);
};
const closeModal = function (modal) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

const selectPledge = function (pledge) {
    if (!pledgeActive) {
        pledgeActive = pledge;
        pledge.classList.add("active");
        pledgeAddonElement.classList.remove("hidden");
        pledge.appendChild(pledgeAddonElement);
    } else {
        activePledgeRemoving(pledgeActive);
        pledgeActive = pledge;
        pledge.classList.add("active");
        pledgeAddonElement.classList.remove("hidden");
        pledge.appendChild(pledgeAddonElement);
    }
};
const activePledgeRemoving = function (pledge) {
    let oldActivePledge = pledge;
    oldActivePledge.classList.remove("active");
    oldActivePledge.removeChild(pledgeAddonElement);
};
const bookmarkIt = function () {
    bookmarkBtn.classList.add("bookmarked");
    bookmarkBtn.innerText = "Bookmarked!";
};
const removeBookmark = function () {
    bookmarkBtn.classList.remove("bookmarked");
    bookmarkBtn.innerText = "Bookmark";
};

// saving pledging info
const savePledgingInfo = function (value, reward) {
    const pledgeSum = value;
    const pledgedRewardId = reward;
    const pldegeId = activePledge.id;
    let localStorageData = getLocalStorage();

    if (!localStorageData) {
        const [pledgeSelected] = pledges.filter(
            (pledge) => pledge.id === pldegeId
        );
        const [rewardSelected] = pledgeSelected.rewards.filter(
            (rew) => rew.id == pledgedRewardId
        );
        rewardSelected.countLeft--;
    }
};

// EVENT HANDLERS
// page load
window.addEventListener("load", function () {
    // getting local storage data
    const pledgeDataStorage = getLocalStorage("pledge");
    const bookmarksDataStorage = getLocalStorage("bookmarks");

    // setting active pledge
    if (pledgeDataStorage) {
        [activePledge] = pledgeDataStorage;
    } else if (bookmarksDataStorage) {
        bookmarked = bookmarksDataStorage;
        activePledge = pledges.find((pledge) => pledge.id == bookmarked);
        bookmarkIt();
    } else if (!pledgeDataStorage && !bookmarksDataStorage) {
        activePledge = pledges[0];
    }

    // rendering page
    innerTextSetter(activePledge);
    renderReward(activePledge);
});

// bookmarking
bookmarkBtn.addEventListener("click", function () {
    const bookmarkedPledges = getLocalStorage("bookmarks");

    if (!bookmarkedPledges) {
        activePledge.bookmarked = true;
        setLocalStorage("bookmarks", activePledge.id);
        bookmarkIt();
    } else {
        activePledge.bookmarked = false;
        removeBookmark();
        const bookmarkId = activePledge.id;
        removeItemLocalStorage("bookmarks", bookmarkId);
    }
});

// home page reward button listeners
const activateRewardListeners = function () {
    const selectRewardButton = document.querySelectorAll(".reward");
    selectRewardButton.forEach((rewardBtn) => {
        rewardBtn.addEventListener("click", function () {
            openModal(modalPledge);
            renderRewardsModal(activePledge);
        });
    });
};
backProjectBtn.addEventListener("click", function () {
    openModal(modalPledge);
    renderRewardsModal(activePledge);
});

// rewards modal listener
const rewardModalListener = function (rewards) {
    const radioButtonEl = document.querySelectorAll(".card-radio");
    const rewardSubmitBtn = document.querySelectorAll(".submit-pledge");

    radioButtonEl.forEach((radio) => {
        radio.addEventListener("click", function (e) {
            parentNode = e.target.parentNode.parentNode;
            selectPledge(parentNode);
            chosenRewardId = parentNode;
        });
    });

    rewardSubmitBtn.forEach((submitBtn) => {
        submitBtn.addEventListener("click", function (e) {
            const inputValue = e.target.previousElementSibling.value;
            if (inputValue > 0 && inputValue) {
                closeModal(modalPledge);
                openModal(successModal);
                savePledgingInfo(inputValue, chosenRewardId);
            } else return;
        });
    });

    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", function () {
        closeModal(successModal);
    });
};
closeBtn.addEventListener("click", function () {
    closeModal(modalPledge);
});
