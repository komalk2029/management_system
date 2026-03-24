document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formcont");
    const email = document.querySelector(".email");
    const pass = document.querySelector(".pass");

    const toast = document.querySelector("#rj-tost");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!email.value || !pass.value) {
            useToast(1, "All fields are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.value,
                    pass: pass.value
                })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("raj:auth", true);
                useToast(0, data.message);

                setTimeout(() => {
                    window.location.href = "/Frontend/index.html";
                }, 1200);

            } else {
                useToast(1, data.message);
            }

        } catch (err) {
            useToast(1, "Server error");
        }
    });

    const useToast = (mode, message) => {
        toast.innerHTML = "";

        const p = document.createElement("p");
        p.textContent = message;
        toast.appendChild(p);

        toast.style.background = mode ? "red" : "green";

        toast.classList.remove("close");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("close");
        }, 3000);
    };
});