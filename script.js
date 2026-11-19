
/* ==========================================
   BAVANI'S MAGICAL BIRTHDAY SURPRISE ❤️
   COMPLETE script.js
========================================== */


/* SETTINGS */

const SECRET_PASSWORD = "BAVANI";

const BIRTHDAY = new Date(2026, 11, 4, 0, 0, 0);

// TEST MODE
// true  = Countdown bypass for testing
// false = Wait until birthday

const TEST_MODE = true;

const FORMSPREE_URL = "https://formspree.io/f/xzepljrz";


/* ==========================================
   1. NAVIGATION
========================================== */

function next(number) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById("s" + number);

    if (!target) return;

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (number === 4) {
        createBalloons();
    }

    if (number === 6) {
        requestAnimationFrame(setupScratch);
    }

    if (number === 7 || number === 8) {
        createSparkles();
    }
}


/* ==========================================
   2. BACKGROUND MUSIC
========================================== */

const music = new Audio("romantic.mp3");

music.loop = true;
music.volume = 0.35;

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    music.play()
        .then(() => {
            musicStarted = true;
        })
        .catch(error => {
            console.log("Music waiting for user interaction.");
        });
}

document.addEventListener("click", startMusic);


/* ==========================================
   3. LIVE COUNTDOWN
========================================== */

function updateCountdown() {

    const now = new Date();

    const difference = BIRTHDAY.getTime() - now.getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const countText = document.getElementById("countText");

    const continueButton = document.getElementById("countContinue");


    if (TEST_MODE) {

        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";

        if (countText) {
            countText.textContent = "🎉 Your surprise is ready!";
        }

        if (continueButton) {
            continueButton.disabled = false;
        }

        return;
    }


    if (difference <= 0) {

        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";

        if (countText) {
            countText.textContent = "🎂 Happy Birthday Bavani!";
        }

        if (continueButton) {
            continueButton.disabled = false;
        }

        return;
    }


    if (continueButton) {
        continueButton.disabled = true;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    if (daysElement) {
        daysElement.textContent = String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

    if (countText) {
        countText.textContent = "Counting every moment... ❤️";
    }

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ==========================================
   4. PASSWORD PROTECTION
========================================== */

function checkPassword() {

    const passwordInput = document.getElementById("password");

    const error = document.getElementById("passError");

    if (!passwordInput) return;

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword.toUpperCase() === SECRET_PASSWORD) {

        if (error) {
            error.textContent = "";
        }

        passwordInput.value = "";

        next(4);

    } else {

        if (error) {
            error.textContent = "Wrong password! Try again ❤️";
        }

        passwordInput.value = "";

        passwordInput.focus();

    }

}


/* ENTER KEY FOR PASSWORD */

document.addEventListener("DOMContentLoaded", () => {

    const passwordInput = document.getElementById("password");

    if (passwordInput) {

        passwordInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                checkPassword();
            }

        });

    }

});


/* ==========================================
   5. 24 SPECIAL BIRTHDAY MESSAGES
========================================== */

const messages = [

    "You are one of the most beautiful reasons to smile. ❤️",

    "Your smile makes ordinary moments magical. ✨",

    "May your life always be filled with happiness. 🌸",

    "You deserve all the beautiful things in this world. 💖",

    "Keep smiling. Your smile is precious. 😊",

    "May every dream of yours come true. 🌟",

    "You are special in your own beautiful way. 🦋",

    "Wishing you endless love and happiness. ❤️",

    "May your days shine brighter than the stars. ⭐",

    "Never stop believing in yourself. 💫",

    "Your happiness matters more than words can explain. 🥰",

    "May life surprise you with beautiful moments. 🎁",

    "Keep shining like the brightest star. 🌟",

    "You deserve a lifetime of beautiful memories. 💕",

    "May every sunrise bring you new hope. 🌅",

    "Your presence makes moments more special. 🌷",

    "May your heart always stay peaceful. 🕊️",

    "You are a beautiful chapter in someone's story. ❤️",

    "May laughter follow you everywhere. 😍",

    "Never lose that beautiful smile. 😊",

    "May your wishes turn into reality. 🎀",

    "A beautiful soul deserves a beautiful life. 🌹",

    "Today and always, keep being yourself. 💗",

    "Happy Birthday, Bavani! You are truly special. 🎂"

];


const balloonColors = [

    "#ff4d6d",
    "#ff85a1",
    "#c77dff",
    "#7b2cbf",
    "#4895ef",
    "#4cc9f0",
    "#06d6a0",
    "#ffd166",
    "#fb8500",
    "#f72585",
    "#b5179e",
    "#90be6d"

];


/* SHUFFLE */

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];

    }

    return result;

}


/* ==========================================
   6. CREATE 24 BALLOONS
========================================== */

let balloonsCreated = false;

let openedBalloons = 0;

function createBalloons() {

    const container = document.getElementById("balloonGrid");

    if (!container) return;

    if (balloonsCreated) return;

    balloonsCreated = true;

    container.innerHTML = "";

    openedBalloons = 0;

    updateBalloonCount();

    const order = shuffle(
        Array.from({ length: 24 }, (_, index) => index)
    );


    order.forEach((messageIndex, index) => {

        const balloon = document.createElement("button");

        balloon.className = "balloon";

        balloon.type = "button";

        balloon.textContent = "🎈";

        balloon.style.background =
            balloonColors[index % balloonColors.length];

        balloon.dataset.number = index + 1;

        balloon.style.position = "relative";

        balloon.addEventListener("click", () => {

            if (balloon.disabled) return;

            balloon.disabled = true;

            balloon.classList.add("opened");

            openedBalloons++;

            updateBalloonCount();

            showBalloonMessage(messageIndex);

        });

        container.appendChild(balloon);

    });

}


/* BALLOON COUNTER */

function updateBalloonCount() {

    const counter = document.getElementById("balloonCount");

    const button = document.getElementById("balloonContinue");

    if (counter) {
        counter.textContent = openedBalloons + " / 24 opened";
    }

    if (button) {
        button.disabled = openedBalloons !== 24;
    }

}


/* SHOW BALLOON MESSAGE */

function showBalloonMessage(index) {

    const modal = document.getElementById("modal");

    const title = document.getElementById("modalTitle");

    const message = document.getElementById("modalMessage");

    const emoji = document.getElementById("modalEmoji");

    if (!modal || !title || !message) return;

    title.textContent = "A Little Message For You ❤️";

    message.textContent = messages[index];

    if (emoji) {
        emoji.textContent = "💗";
    }

    modal.classList.add("show");

    createSparkles();

}


/* CLOSE MODAL */

function closeModal() {

    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.remove("show");
    }

}


/* ==========================================
   7. GIFT BOX
========================================== */

let giftOpened = false;

function openBox() {

    if (giftOpened) return;

    giftOpened = true;

    const box = document.querySelector(".big-box");

    const boxText = document.getElementById("boxText");

    if (box) {

        box.style.transform = "scale(1.3) rotate(15deg)";

        box.style.filter = "drop-shadow(0 0 40px #ff83d8)";

    }

    if (boxText) {

        boxText.textContent =
            "Your special memory is waiting... ❤️";

    }

    createSparkles();

    setTimeout(() => {

        next(6);

    }, 1200);

}


/* ==========================================
   8. SCRATCH PHOTO REVEAL
========================================== */

const hiddenPhoto = document.getElementById("hiddenPhoto");

const canvas = document.getElementById("scratchCanvas");

const ctx = canvas ? canvas.getContext("2d") : null;


let scratching = false;

let scratched = false;

let scratchReady = false;


/* PHOTO LOADING */

if (hiddenPhoto) {

    hiddenPhoto.onload = () => {

        if (document.getElementById("s6")?.classList.contains("active")) {

            resetScratch();

        }

    };


    hiddenPhoto.onerror = () => {

        console.error("Birthday photo not found!");

        const progress = document.getElementById("scratchProgress");

        if (progress) {

            progress.textContent =
                "Photo loading failed. Check bavani-photo.jpg";

        }

    };

}


/* SETUP SCRATCH */

function setupScratch() {

    if (!canvas || !ctx || !hiddenPhoto) return;

    if (hiddenPhoto.complete && hiddenPhoto.naturalWidth > 0) {

        resetScratch();

    }

}


/* RESET SCRATCH */

function resetScratch() {

    if (!canvas || !ctx || !hiddenPhoto) return;

    const wrap = document.getElementById("scratchWrap");

    if (!wrap || !hiddenPhoto.naturalWidth) return;

    const width = wrap.clientWidth;

    const height = wrap.clientHeight;

    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(width * dpr);

    canvas.height = Math.round(height * dpr);

    canvas.style.width = width + "px";

    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = "source-over";


    const gradient = ctx.createLinearGradient(
        0, 0, width, height
    );

    gradient.addColorStop(0, "#ff4d6d");

    gradient.addColorStop(0.5, "#c77dff");

    gradient.addColorStop(1, "#4895ef");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, width, height);


    ctx.fillStyle = "#ffffff";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.font = "bold 22px Arial";

    ctx.fillText(
        "✨ SCRATCH TO REVEAL ✨",
        width / 2,
        height / 2
    );


    ctx.font = "15px Arial";

    ctx.fillText(
        "A little surprise is waiting for you ❤️",
        width / 2,
        height / 2 + 35
    );


    ctx.globalCompositeOperation = "destination-out";

    scratched = false;

    scratching = false;

    scratchReady = true;


    const progress = document.getElementById("scratchProgress");

    if (progress) {
        progress.textContent = "0% revealed";
    }

    const button = document.getElementById("scratchContinue");

    if (button) {
        button.disabled = true;
    }

}


/* POINTER POSITION */

function getPosition(event) {

    const rect = canvas.getBoundingClientRect();

    return {

        x: event.clientX - rect.left,

        y: event.clientY - rect.top

    };

}


/* SCRATCH */

function scratch(event) {

    if (!scratching || scratched || !scratchReady) return;

    const position = getPosition(event);

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(
        position.x,
        position.y,
        24,
        0,
        Math.PI * 2
    );

    ctx.fill();

    sparkleBurst(position.x, position.y);

    checkScratchProgress();

}


/* CHECK SCRATCH PERCENTAGE */

function checkScratchProgress() {

    if (!ctx || !canvas || scratched) return;

    const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imageData.data;

    let transparent = 0;

    let total = 0;


    for (let i = 3; i < data.length; i += 160) {

        total++;

        if (data[i] < 80) {

            transparent++;

        }

    }


    const percent = Math.floor(
        (transparent / total) * 100
    );


    const progress = document.getElementById("scratchProgress");

    if (progress) {

        progress.textContent = percent + "% revealed";

    }


    if (percent >= 80) {

        scratched = true;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const button = document.getElementById("scratchContinue");

        if (button) {

            button.disabled = false;

        }


        if (progress) {

            progress.textContent =
                "🎉 Surprise revealed! ❤️";

        }

        createSparkles();

    }

}


/* SCRATCH EVENTS */

if (canvas) {

    canvas.addEventListener("pointerdown", event => {

        if (scratched || !scratchReady) return;

        scratching = true;

        canvas.setPointerCapture(event.pointerId);

        scratch(event);

    });


    canvas.addEventListener("pointermove", scratch);


    canvas.addEventListener("pointerup", () => {

        scratching = false;

    });


    canvas.addEventListener("pointercancel", () => {

        scratching = false;

    });

}


/* ==========================================
   9. SCRATCH SPARKLE EFFECT
========================================== */

function sparkleBurst(x, y) {

    const wrap = document.getElementById("scratchWrap");

    if (!wrap) return;

    for (let i = 0; i < 3; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "scratchSparkle";

        sparkle.textContent = "✨";

        sparkle.style.position = "absolute";

        sparkle.style.left = x + "px";

        sparkle.style.top = y + "px";

        sparkle.style.pointerEvents = "none";

        sparkle.style.zIndex = "5";

        wrap.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 800);

    }

}


/* ==========================================
   10. GENERAL SPARKLE EFFECT
========================================== */

function createSparkles() {

    for (let i = 0; i < 20; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "particle";

        sparkle.textContent =
            ["✨", "⭐", "💖", "🌟"][
                Math.floor(Math.random() * 4)
            ];

        sparkle.style.left =
            Math.random() * 100 + "vw";

        sparkle.style.top =
            Math.random() * 100 + "vh";

        sparkle.style.setProperty(
            "--x",
            (Math.random() - 0.5) * 150 + "px"
        );

        sparkle.style.setProperty(
            "--y",
            (Math.random() - 0.5) * 150 + "px"
        );

        document.body.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 1200);

    }

}


/* ==========================================
   11. SEND HER MESSAGE
========================================== */

async function saveResponse() {

    const messageInput = document.getElementById("herMessage");

    const status = document.getElementById("responseStatus");

    const sendButton = document.getElementById("sendButton");


    if (!messageInput || !messageInput.value.trim()) {

        if (status) {

            status.textContent =
                "Write a little message first ❤️";

        }

        return;

    }


    const data = {

        name: "Bavani",

        message: messageInput.value.trim(),

        subject: "A special message from Bavani ❤️"

    };


    if (status) {

        status.textContent = "Sending your message... 💌";

    }

    if (sendButton) {

        sendButton.disabled = true;

        sendButton.textContent = "SENDING...";

    }


    try {

        const response = await fetch(FORMSPREE_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Accept": "application/json"

            },

            body: JSON.stringify(data)

        });


        if (!response.ok) {

            throw new Error("Message sending failed.");

        }


        if (status) {

            status.textContent =
                "Your message has been sent successfully! ❤️";

        }

        messageInput.value = "";

        createSparkles();


    } catch (error) {

        console.error(error);

        if (status) {

            status.textContent =
                "Something went wrong. Please try again. 💗";

        }

    } finally {

        if (sendButton) {

            sendButton.disabled = false;

            sendButton.textContent = "SEND WITH LOVE 💕";

        }

    }

}


/* ==========================================
   12. WINDOW RESIZE
========================================== */

window.addEventListener("resize", () => {

    if (
        document.getElementById("s6")?.classList.contains("active") &&
        !scratched
    ) {

        resetScratch();

    }

});


/* ==========================================
   WEBSITE LOADED
========================================== */

console.log(
    "❤️ Bavani's Magical Birthday Website Loaded Successfully!"
);
       
