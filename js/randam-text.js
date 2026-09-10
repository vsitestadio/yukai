// 1文字づつspanタグで囲う関数
const wrapCharactersWithSpan = (element, className = "") => {
  const text = element.textContent.trim();
  const characters = text.split("");
  let wrappedContent = "";

  characters.forEach((char, index) => {
    if (char === " ") {
      wrappedContent += '<span aria-hidden="true">&nbsp;</span>';
    } else {
      wrappedContent += `<span class="${className}" aria-hidden="true" translate="no" style="--index: ${index};">${char}</span>`;
    }
  });

  wrappedContent += `<span class="alternative">${text}</span>`;
  element.innerHTML = wrappedContent;
};

const chars = document.querySelectorAll("[data-char-span]");

// 1文字づつspanタグで囲う関数を実行
chars.forEach((char) => {
  wrapCharactersWithSpan(char);
});

// テキストアニメーションの一連の処理
const fadeInChars = document.querySelectorAll(
  '[data-text-animation="fadeIn"] span'
); // アニメーション対象の要素をNodeListとして取得
const spansArray = Array.from(fadeInChars); // NodeListを配列に変換

// ランダムに要素を選択してアクティブ化する関数
const addActiveClassRandomly = () => {
  if (spansArray.length === 0) return; // 配列が空の場合は処理を終了

  const randomIndex = Math.floor(Math.random() * spansArray.length); // 0から配列の長さ-1までのランダムな整数を生成
  const randomSpan = spansArray[randomIndex]; // ランダムに選択された要素を取得

  randomSpan.classList.add("is-active"); // 選択された要素にis-activeを追加
  spansArray.splice(randomIndex, 1); // 処理済みの要素を配列から削除

  if (spansArray.length > 0) {
    // 配列の要素数が0になるまで
    setTimeout(addActiveClassRandomly, 100); // 100ミリ秒後に再帰的に関数を呼び出し
  }
};

addActiveClassRandomly(); // アニメーション処理の開始