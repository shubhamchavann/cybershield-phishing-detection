document.addEventListener(
    "DOMContentLoaded",
    function () {

        const message =
            document.getElementById("message");

        const counter =
            document.getElementById("counter");


        if (message && counter) {

            function updateCounter() {

                const length =
                    message.value.length;

                counter.textContent =
                    length + " characters";
            }


            message.addEventListener(
                "input",
                updateCounter
            );


            updateCounter();
        }


        const forms =
            document.querySelectorAll("form");


        forms.forEach(function (form) {

            form.addEventListener(
                "submit",
                function () {

                    const button =
                        form.querySelector(
                            "button[type='submit']"
                        );


                    if (button) {

                        button.disabled = true;

                        button.textContent =
                            "Processing...";

                    }

                }
            );

        });

    }
);function clearForm() {

    const form = document.querySelector(".scanner-form");

    if (!form) {
        return;
    }

    form.reset();

    const result = document.querySelector(".result-box");

    if (result) {
        result.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", function () {

    console.log("Cyber Shield loaded successfully.");

});