document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const empid = e.target.empid.value;
  const password = e.target.password.value;
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ empid, password }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "/profile.html";
  } else {
    alert(data.error || "Login failed");
  }
});