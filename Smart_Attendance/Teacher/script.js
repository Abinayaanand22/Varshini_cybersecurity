let expiryTime = 0;
let students = [];

function generateQR() {
    document.getElementById("qrcode").innerHTML = "";
    students = [];
    document.getElementById("attendanceList").innerHTML = "";

    let sessionCode = "CLASS-" + new Date().getTime();
    expiryTime = Date.now() + (5 * 60 * 1000); // 5 minutes

    new QRCode(document.getElementById("qrcode"), {
        text: sessionCode,
        width: 200,
        height: 200
    });

    localStorage.setItem("attendanceSession", sessionCode);
    localStorage.setItem("expiryTime", expiryTime);

    startTimer();
}

function startTimer() {
    let timer = document.getElementById("timer");
    let interval = setInterval(() => {
        let remaining = expiryTime - Date.now();
        if (remaining <= 0) {
            timer.innerHTML = "❌ QR Expired";
            clearInterval(interval);
        } else {
            timer.innerHTML = "QR Valid for: " + Math.floor(remaining / 1000) + " sec";
        }
    }, 1000);
}
