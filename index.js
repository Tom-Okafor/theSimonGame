(() => {
    function app() {
        showGameBlock();
        startGame();
    }
    app();
    // remove details and put main block
    function showGameBlock() {
        const START_BUTTON = document.querySelector(".start");
        const GAME_DETAILS = document.querySelector(".details");
        const HEADER1 = document.querySelector("h1");
        const HEADER1_SPAN = document.querySelector(".span");
        const MAIN_SECTION = document.querySelector("main");
        START_BUTTON.addEventListener("click", handleNecessarySwitches);
        function handleNecessarySwitches() {
            HEADER1.classList.add("shrink");
            HEADER1_SPAN.classList.add("shrink1");
            GAME_DETAILS.classList.add("hideDetails");
            START_BUTTON.classList.add("hideDetails");
            GAME_DETAILS.addEventListener("animationend", () => {
                MAIN_SECTION.className = "showMain";
            });
        }
    }
    //start game

    function startGame() {
        const BEGIN_BUTTON = document.getElementById("begin");
        BEGIN_BUTTON.addEventListener("click", beginGame);
        function beginGame() {
            BEGIN_BUTTON.style.visibility = "hidden";
            document.querySelector(".alert").innerText = "";
            let level = 1;
            setTimeout(() => {
                          createPattern(level);

            }, 1000);
        }
    }

    //create a pattern
    function createPattern(n) {
        const NUMBER_OF_BUTTONS = 4;
        const SEQUENCE = [];
        for (let i = 0; i < n; i++) {
            SEQUENCE.push(Math.floor(Math.random() * 4));
        }
        playSounds(SEQUENCE);
    }

    //play the sounds
    function playSounds(pattern) {
        const BUTTONS_ARRAY = ["green", "red", "yellow", "blue"];
        const SOUNDS_PATH = "sounds/";
        const NUMBER_OF_SOUNDS = pattern.length;
        const SOUNDS_ARRAY = [];
        for (let i = 0; i < NUMBER_OF_SOUNDS; i++) {
            SOUNDS_ARRAY.push(BUTTONS_ARRAY[pattern[i]]);
        }
        let soundsMade = 0;
        makeSound();
        function makeSound() {
            const SOUND = new Audio(
                SOUNDS_PATH + SOUNDS_ARRAY[soundsMade] + ".mp3"
            );
            SOUND.play();
            animateButton(SOUNDS_ARRAY[soundsMade]);
            soundsMade++;
            setTimeout(() => {
                if (soundsMade < NUMBER_OF_SOUNDS) {
                    makeSound();
                } else {
                    recordUserClick(SOUNDS_ARRAY);
                }
            }, 500);
        }
    }
    function animateButton(button) {
        document.getElementById(button).classList.add("flash");
        setTimeout(() => {
            document.getElementById(button).classList.remove("flash");
        }, 400);
    }
    //compare the tunes and return judgement

    function recordUserClick(playedSounds) {
        let clicks = 0;
        const BUTTONS = document.querySelectorAll(".child");
        for (const BUTTON of BUTTONS) {
            BUTTON.addEventListener("click", checkSound);
        }
        function checkSound() {
            const CLICKED_ID = event.target.id;
            animateButton(CLICKED_ID);
            const CLICK_SOUND = new Audio(`sounds/${CLICKED_ID}.mp3`);
            CLICK_SOUND.play();
            if (CLICKED_ID === playedSounds[clicks]) {
                if (clicks === playedSounds.length - 1) {
                    for (const BUTTON of BUTTONS) {
                        BUTTON.removeEventListener("click", checkSound);
                    }
                    document.querySelector(".figures").innerText = clicks + 1;
                    setTimeout(() => {
                        createPattern(playedSounds.length + 1);
                    }, 1000);
                } else {
                    clicks++;
                }
            } else {
                for (const BUTTON of BUTTONS) {
                    BUTTON.removeEventListener("click", checkSound);
                }
                handleFailure(showGameOverMessage);
            }
        }
        function showGameOverMessage() {
            document.querySelector(
                ".alert"
            ).innerText = `GAME OVER! Your score is “${
                document.querySelector(".figures").innerText
            }”`;
        }
    }

    function handleFailure(message) {
        const WRONG_SOUND = new Audio("sounds/wrong.mp3");
        WRONG_SOUND.play();
        const BODY_COLOR = document.querySelector("body").style.backgroundColor;
        document.querySelector("body").style.backgroundColor = "#000000";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = BODY_COLOR;
            document.getElementById("begin").innerText = "RESTART";
            document.getElementById("begin").style.visibility = "visible";
            message();

            document.querySelector(".figures").innerText = 0;
        }, 300);
    }

})();
