// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function () {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}
// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("Browser tidak mendukung notifikasi.");
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
    console.log("Notifikasi diijinkan")
  });
}
if (('PushManager' in window)) {
  navigator.serviceWorker.getRegistration().then(registration => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BNg0BbO5pWsD3J98ed5VyxI6HcAhhzVUfz5iuL-85hmt-CvNuZuE9UwHcTGIl7I01vUiCHcS6PR7DtR8g-okZSY")
    })
    .then(subscribe => {
      console.log('Berhasil melakukan subscribe dengan endpoint: ',subscribe.endpoint);
      console.log('Berhasil melakukan subscribe dengan p256dh key: ',btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
      console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
    })
    .catch(e => console.error('Tidak dapat melakukan subscribe : ', e.message))
  })
}