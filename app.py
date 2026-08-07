from flask import Flask, render_template, request
from detector import check_url, check_message

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/url-checker", methods=["GET", "POST"])
def url_checker():

    result = None

    if request.method == "POST":

        url = request.form.get("url", "")

        result = check_url(url)

    return render_template(
        "url_checker.html",
        result=result
    )

@app.route("/message-checker", methods=["GET", "POST"])
def message_checker():

    result = None
    message = ""

    if request.method == "POST":

        message = request.form.get("message", "")

        result = check_message(message)

    return render_template(
        "message_checker.html",
        result=result,
        message=message
    )


@app.route("/awareness")
def awareness():
    return render_template("awareness.html")


@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


if __name__ == "__main__":
    app.run(debug=True)