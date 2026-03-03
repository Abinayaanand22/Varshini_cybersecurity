const nameInput = document.getElementById("studentName");
const resultBox = document.getElementById("result");

let html5QrcodeScanner = new Html5QrcodeScanner(
  "qr-reader",
  { fps: 10, qrbox: 250 },
  false
);

function onScanSuccess(decodedText) {
  const studentName = nameInput.value.trim();

  if (studentName === "") {
    resultBox.innerHTML = "❌ Please enter your name";
    resultBox.style.color = "red";
    return;
  }

  // ✅ DIRECT SUCCESS (NO validation)
  resultBox.innerHTML = `✅ Attendance marked successfully for <b>${studentName}</b>`;
  resultBox.style.color = "green";

  console.log("QR:", decodedText);
  console.log("Student:", studentName);

  html5QrcodeScanner.clear();
}

function onScanFailure(error) {
  // ignore
}

html5QrcodeScanner.render(onScanSuccess, onScanFailure);
