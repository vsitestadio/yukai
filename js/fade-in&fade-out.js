	function toggleButtons(buttonToFadeOut, buttonToFadeIn) {
    // フェードアウト開始
    buttonToFadeOut.classList.add("fade-out");

    // フェードアウト終了後の処理
    buttonToFadeOut.addEventListener("animationend", function () {
        // ボタン1を完全に非表示
        buttonToFadeOut.classList.add("hidden");
        buttonToFadeOut.classList.remove("fade-out");

        // フェードイン開始
        buttonToFadeIn.classList.remove("hidden");
        buttonToFadeIn.classList.add("fade-in");

        // フェードイン終了後のクラスリセット
        buttonToFadeIn.addEventListener("animationend", function () {
            buttonToFadeIn.classList.remove("fade-in");
        }, { once: true });
    }, { once: true });
}

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

// ボタン1をクリックしたとき
button1.addEventListener("click", function () {
    toggleButtons(button1, button2);
});

// ボタン2をクリックしたとき
button2.addEventListener("click", function () {
    toggleButtons(button2, button1);
});