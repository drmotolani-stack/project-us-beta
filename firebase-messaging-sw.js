/* Our Space — Firebase Cloud Messaging service worker */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDQGW7GQYtM-FEIV9UxfcnGf6uy_1xhxsM",
  authDomain: "project-us-paul-beta.firebaseapp.com",
  projectId: "project-us-paul-beta",
  storageBucket: "project-us-paul-beta.firebasestorage.app",
  messagingSenderId: "758738117814",
  appId: "1:758738117814:web:6c1bce03ed3ed901c63217"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Our Space";
  const body = payload.notification?.body || "Something new is waiting for you.";
  self.registration.showNotification(title, {
    body,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    data: { url: payload.fcmOptions?.link || "./" },
    tag: payload.messageId || "our-space"
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || "./";
  event.waitUntil(
    clients.matchAll({type:"window", includeUncontrolled:true}).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(target);
          return client.focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});
