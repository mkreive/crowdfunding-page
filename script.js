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
                countLeft: 50,
                minSum: 30,
            },
            {
                id: 2,
                name: "Bamboo Stand",
                countTotal: 300,
                countLeft: 100,
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
        sumBacked: 8000,
        numBackers: 5000,
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

const renderRewardAddon = function (reward) {
    const rewardCard = reward;

    const html = `
        <div class="modal-addon card-addon couples">
            <hr class="line" />
            <span class="text">Enter your pledge</span>
            <div class="couples-left">
                <input
                    type="number"
                    class="btn-input pledge-amount"
                    placeholder="$"
                    maxlength="999999"
                    onfocus="this.value=''"
                />
            <button class="btn submit-pledge">Continue</button>
            </div>
        </div>
    `;

    rewardCard.insertAdjacentHTML("beforeend", html);
};

const removeRenders = function (elementClass) {
    const elements = document.querySelectorAll(elementClass);
    elements.forEach((element) => {
        element.remove();
    });
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
    if (pledgeActive) {
        activePledgeRemoving(pledgeActive);
    }

    pledgeActive = pledge;
    pledge.classList.add("active");
    renderRewardAddon(pledgeActive);
};
const activePledgeRemoving = function (pledge) {
    let oldActivePledge = pledge;
    const childaddon = oldActivePledge.querySelector(".card-addon");
    oldActivePledge.classList.remove("active");
    childaddon.remove();
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
    let pledgeSum = +value;
    let pledgedReward = reward;
    let localStorageData = getLocalStorage("pledge");

    if (!localStorageData) {
        activePledge.numBackers++;
        activePledge.sumBacked = +activePledge.sumBacked + pledgeSum;
        activePledge.rewards.forEach((reward) => {
            if (reward.id == pledgedReward.id) {
                reward.countLeft--;
            } else return;
        });
    } else if (localStorageData) {
        activePledge = localStorageData;
        activePledge.numBackers++;
        activePledge.sumBacked = +activePledge.sumBacked + pledgeSum;
        activePledge.rewards.forEach((reward) => {
            if (reward.id == pledgedReward.id) {
                reward.countLeft--;
            } else return;
        });
        localStorage.removeItem("pledge");
    } else {
        console.log("error saving pledging data");
    }

    // save data to local storage+-
    setLocalStorage("pledge", activePledge);
    pledgeSum = "";
    pledgedReward = "";

    // update HTML+
    innerTextSetter(activePledge);
    removeRenders(".card-pledge");
    renderReward(activePledge);
};

// EVENT HANDLERS
// page load
window.addEventListener("load", function () {
    // getting local storage data
    const pledgeDataStorage = getLocalStorage("pledge");
    const bookmarksDataStorage = getLocalStorage("bookmarks");

    // setting active pledge
    if (pledgeDataStorage || bookmarksDataStorage) {
        if (bookmarksDataStorage) {
            bookmarked = bookmarksDataStorage;
            activePledge = pledges.find((pledge) => pledge.id == bookmarked);
            console.log(bookmarked);
            bookmarkIt();
        } else {
            activePledge = pledgeDataStorage;
        }
    } else if (!pledgeDataStorage && !bookmarksDataStorage) {
        activePledge = pledges[0];
    } else {
        this.alert("Error loading page... sorry");
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

    radioButtonEl.forEach((radio) => {
        radio.addEventListener("click", function (e) {
            const parentNode = e.target.parentNode.parentNode;
            selectPledge(parentNode);

            const rewardBtnSubmit = parentNode.querySelector(".submit-pledge");

            const chosenRewardId = parentNode.id;
            const chosenReward = rewards.find(
                (reward) => reward.id == chosenRewardId
            );

            rewardBtnSubmit.addEventListener("click", function (e) {
                let inputValue = e.target.previousElementSibling.value;
                const rewardsLeft = chosenReward.countLeft;
                const minSum = chosenReward.minSum;

                if (inputValue >= minSum && rewardsLeft > 0 && inputValue) {
                    savePledgingInfo(inputValue, chosenReward);
                    closeModal(modalPledge);
                    removeRenders(".card-modal");
                    openModal(successModal);
                } else {
                    console.log("error submitting data");
                    return;
                }
            });
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
