document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formcont");
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const pass = document.querySelector(".pass");
    const tmc = document.querySelector("#tmc");

    const toast = document.querySelector("#rj-tost");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!name.value || !email.value || !pass.value) {
            useToast(1, "All fields are required");
            return;
        }

        if (!tmc.checked) {
            useToast(1, "Please accept terms & conditions");
            return;
        }

        try {
            const user = {
                name: name.value,
                email: email.value,
                pass: pass.value
            };

            const res = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("raj:auth", true);
                useToast(0, data.message);
                setTimeout(() => {
                    window.location.href = "/Frontend/login/login.html";
                }, 1200);
            } else {
                useToast(1, data.message);
            }

        } catch (error) {
            useToast(1, "Server error");
            console.log(error);
        }
        if (data.success) {
    useToast(0, data.message);

    setTimeout(() => {
        window.location.href = "/Frontend/login/login.html";
    }, 1200);

} else {
    useToast(1, data.message);

    if (data.message === "User already exists") {
        setTimeout(() => {
            window.location.href = "/Frontend/login/login.html";
        }, 2000);
    }
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