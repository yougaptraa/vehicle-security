const vehicleStatus = document.querySelector("#vehicleStatus");
const statusDescription = document.querySelector("#statusDescription");
const statusDot = document.querySelector("#statusDot");
const alarmStatus = document.querySelector("#alarmStatus");
const eventList = document.querySelector("#eventList");

function timeNow() {
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
}

function addEvent(title, detail, type = "normal") {
  const empty = eventList.querySelector(".empty");
  if (empty) empty.remove();

  const item = document.createElement("li");
  item.className = "event";

  const marker = document.createElement("span");
  marker.className = `event-marker${type === "warn" ? " warn" : type === "danger" ? " danger" : ""}`;

  const content = document.createElement("div");
  const titleNode = document.createElement("p");
  titleNode.className = "event-title";
  titleNode.textContent = title;
  const detailNode = document.createElement("p");
  detailNode.className = "event-detail";
  detailNode.textContent = detail;
  content.append(titleNode, detailNode);

  const time = document.createElement("time");
  time.textContent = timeNow();
  item.append(marker, content, time);
  eventList.prepend(item);

  while (eventList.children.length > 8) eventList.lastElementChild.remove();
}

function lockVehicle() {
  vehicleStatus.textContent = "TERKUNCI";
  statusDescription.textContent = "Kendaraan dalam kondisi aman.";
  statusDot.style.background = "var(--green)";
  alarmStatus.textContent = "SIAGA";
  addEvent("Kendaraan dikunci", "Status berubah melalui kontrol simulasi.");
}

function unlockVehicle() {
  vehicleStatus.textContent = "TERBUKA";
  statusDescription.textContent = "Akses dibuka dalam simulasi.";
  statusDot.style.background = "var(--yellow)";
  alarmStatus.textContent = "SIAGA";
  addEvent("Kendaraan dibuka", "Aksi simulasi berhasil dijalankan.");
}

function simulateVibration() {
  alarmStatus.textContent = "PERINGATAN";
  statusDescription.textContent = "Getaran simulasi terdeteksi.";
  statusDot.style.background = "var(--red)";
  addEvent("Peringatan getaran", "Simulasi mendeteksi getaran; periksa kendaraan.", "danger");
}

function resetDemo() {
  vehicleStatus.textContent = "TERKUNCI";
  statusDescription.textContent = "Kendaraan dalam kondisi aman.";
  statusDot.style.background = "var(--green)";
  alarmStatus.textContent = "SIAGA";
  eventList.replaceChildren();
  addEvent("Demo dimulai ulang", "Status simulasi dikembalikan ke kondisi awal.");
}

document.querySelector("#unlockBtn").addEventListener("click", unlockVehicle);
document.querySelector("#lockBtn").addEventListener("click", lockVehicle);
document.querySelector("#vibrationBtn").addEventListener("click", simulateVibration);
document.querySelector("#resetBtn").addEventListener("click", resetDemo);
document.querySelector("#clearLogBtn").addEventListener("click", () => {
  eventList.replaceChildren();
  const empty = document.createElement("li");
  empty.className = "empty";
  empty.textContent = "Belum ada kejadian. Gunakan tombol kontrol untuk mencoba demo.";
  eventList.append(empty);
});

addEvent("Sistem demo aktif", "Dashboard siap digunakan di browser.");
