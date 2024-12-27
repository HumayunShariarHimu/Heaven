const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillators = [];

function playHeavenlySounds() {
  const frequencies = [432, 528, 639]; // মৃদু এবং স্বর্গীয় সুর
  frequencies.forEach(freq => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    gainNode.gain.value = 0.3; // সুরের উচ্চতা নিয়ন্ত্রণ

    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();
    oscillators.push(oscillator);
  });
}

function stopHeavenlySounds() {
  oscillators.forEach(osc => osc.stop());
  oscillators = [];
}

function showGuidedMessage() {
  const messages = [
    "শীতের সকালে কেমন এক শীতল আবহে শরীরের ওপর যখন হালকা মৃদ্যু আলোক আভায় উত্তপ্ততা উপভোগ করেন....",
    "মনে তো এমন হয় যেন মেঘের ভেলায় ভেসে ভেসে অচিন দূর দিগন্তের সীমাহীন স্বাধীনতা ভোগ করছেন....",
    "আপনার সকল দুঃশ্চিন্তা আর দূর্ভাবনা কিংবা মনের যাবতীয় কষ্টদায়ক স্মৃতি ও অনুভূতিগুলো খানিক ভুলে যান তো.....কেমন লাগছে?"
  ];
  let index = 0;

  const messageDiv = document.getElementById("message");
  const interval = setInterval(() => {
    messageDiv.textContent = messages[index];
    index = (index + 1) % messages.length;
  }, 5000); // প্রতি ৫ সেকেন্ডে বার্তা পরিবর্তন

  return interval;
}

// শুরু এবং থামানোর জন্য বাটন কার্যকারিতা
document.getElementById("start-btn").addEventListener("click", () => {
  playHeavenlySounds();
  const interval = showGuidedMessage();

  document.getElementById("start-btn").style.display = "none";
  document.getElementById("stop-btn").style.display = "inline-block";

  document.getElementById("stop-btn").addEventListener("click", () => {
    stopHeavenlySounds();
    clearInterval(interval);

    document.getElementById("start-btn").style.display = "inline-block";
    document.getElementById("stop-btn").style.display = "none";

    document.getElementById("message").textContent = "আপনার উপলব্ধিতে 'সুখী আপনি' কে আবিষ্কার করুন....";
  });
});