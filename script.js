
/* ==========================================
   BAVANI BIRTHDAY SURPRISE WEBSITE ❤️
   COMPLETE JAVASCRIPT
========================================== */


/* SETTINGS */

const SECRET_PASSWORD = "BAVANI";
const BIRTHDAY = new Date(2026, 11, 4, 0, 0, 0);

// TEST MODE
// true  = Countdown bypass
// false = Real birthday countdown

const TEST_MODE = true;

const FORMSPREE_URL = "https://formspree.io/f/xzepljrz";


/* NAVIGATION */

function next(number) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById("s" + number);

    if (target) {
        target.classList.add("active");
    }

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

    if (number === 8) {
        createSparkles();
    }
}


/* BACKGROUND MUSIC */

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


/* COUNTDOWN */

function updateCountdown() {

    const now = new Date();
    const difference = BIRTHDAY.getTime() - now.getTime();

    const countdown = document.getElementById("countdown");
    const continueButton = document.getElementById("countdownContinue");

    if (TEST_MODE) {

        if (countdown) {
            countdown.innerHTML = "🎉 Your surprise is ready!";
        }

        if (continueButton) {
            continueButton.disabled = false;
        }

        return;
    }

    if (difference <= 0) {

        if (countdown) {
            countdown.innerHTML = "🎂 Happy Birthday Bavani!";
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

    if (countdown) {

        countdown.innerHTML = `
            <div>${days}<small>Days</small></div>
            <div>${hours}<small>Hours</small></div>
            <div>${minutes}<small>Minutes</small></div>
            <div>${seconds}<small>Seconds</small></div>
        `;
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* PASSWORD */

function checkPassword() {

    const passwordInput = document.getElementById("password");
    const error = document.getElementById("passwordError");

    if (!passwordInput) return;

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword.toUpperCase() === SECRET_PASSWORD) {

        if (error) {
            error.textContent = "";
        }

        next(4);

    } else {

        if (error) {
            error.textContent = "Wrong password! Try again ❤️";
        }

        passwordInput.value = "";
        passwordInput.focus();

    }
}


/* 24 SPECIAL BIRTHDAY MESSAGES */

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


/* BALLOON COLORS */

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


/* SHUFFLE ARRAY */

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];

    }

    return result;
}


/* CREATE 24 BALLOONS */

let balloonsCreated = false;

function createBalloons() {

    const container = document.getElementById("balloonContainer");

    if (!container) return;

    if (balloonsCreated) return;

    balloonsCreated = true;

    container.innerHTML = "";

    const order = shuffle(
        Array.from({ length: 24 }, (_, index) => index)
    );

    order.forEach((messageIndex, index) => {

        const balloon = document.createElement("button");

        balloon.className = "balloon";
        balloon.type = "button";

        balloon.style.background =
            balloonColors[index % balloonColors.length];

        balloon.style.animationDelay =
            Math.random() * 2 + "s";

        balloon.innerHTML = `
            <span>${index + 1}</span>
        `;

        balloon.addEventListener("click", () => {

            showBalloonMessage(messageIndex);

            balloon.classList.add("opened");

            balloon.disabled = true;

        });

        container.appendChild(balloon);

    });

}


/* SHOW BALLOON MESSAGE */

function showBalloonMessage(index) {

    const popup = document.getElementById("messagePopup");

    const messageText = document.getElementById("messageText");

    if (!popup || !messageText) return;

    messageText.textContent = messages[index];

    popup.classList.add("show");

    createSparkles();

}


/* CLOSE MESSAGE */

function closeMessage() {

    const popup = document.getElementById("messagePopup");

    if (popup) {
        popup.classList.remove("show");
    }

}


/* GIFT BOX */

function openGift() {

    const gift = document.getElementById("giftBox");

    if (gift) {

        gift.classList.add("opened");

        createSparkles();

    }

    setTimeout(() => {
        next(6);
    }, 1200);

}


/* SCRATCH PHOTO ELEMENTS */

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


/* RESET SCRATCH CANVAS */

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

    if (!ctx || !canvas) return;

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


/* CONTINUE AFTER SCRATCH */

function finishScratch() {

    if (scratched) {

        next(7);

    }

}


/* SCRATCH SPARKLE EFFECT */

function sparkleBurst(x, y) {

    const wrap = document.getElementById("scratchWrap");

    if (!wrap) return;

    for (let i = 0; i < 3; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "scratchSparkle";

        sparkle.textContent = "✨";

        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";

        wrap.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);

    }

}


/* GENERAL SPARKLE EFFECT */

function createSparkles() {

    for (let i = 0; i < 20; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.textContent =
            ["✨", "⭐", "💖", "🌟"][
                Math.floor(Math.random() * 4)
            ];

        sparkle.style.position = "fixed";

        sparkle.style.left =
            Math.random() * 100 + "vw";

        sparkle.style.top =
            Math.random() * 100 + "vh";

        sparkle.style.pointerEvents = "none";

        sparkle.style.zIndex = "9999";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1800);

    }

}


/* FINAL MESSAGE */

function showFinalMessage() {

    next(8);

    createSparkles();

}


/* SEND MESSAGE TO FORMSPREE */

async function saveResponse() {

    const nameInput = document.getElementById("herName");

    const messageInput = document.getElementById("herMessage");

    const status = document.getElementById("responseStatus");

    if (!messageInput || !messageInput.value.trim()) {

        if (status) {
            status.textContent =
                "Write a little message first ❤️";
        }

        return;

    }

    const data = {

        name: nameInput?.value.trim() || "Bavani",

        message: messageInput.value.trim(),

        subject: "A special message from Bavani ❤️"

    };

    if (status) {
        status.textContent = "Sending your message... 💌";
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

        if (response.ok) {

            if (status) {

                status.textContent =
                    "Your message has been sent successfully! ❤️";

            }

            messageInput.value = "";

            if (nameInput) {
                nameInput.value = "";
            }

            createSparkles();

        } else {

            throw new Error("Message sending failed.");

        }

    } catch (error) {

        console.error(error);

        if (status) {

            status.textContent =
                "Something went wrong. Please try again. 💗";

        }

    }

}


/* PASSWORD ENTER KEY */

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


/* WINDOW RESIZE */

window.addEventListener("resize", () => {

    if (
        document.getElementById("s6")?.classList.contains("active") &&
        !scratched
    ) {

        resetScratch();

    }

});


/* WEBSITE LOADED */

console.log(
    "❤️ Bavani Birthday Surprise Website Loaded Successfully!"
);
       
