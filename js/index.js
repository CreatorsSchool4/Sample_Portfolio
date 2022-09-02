/* 
index.htmlで使用しているJavaScriptファイルです。
本ポートフォリオに付与する機能は

- ローディングを実装する機能
- フォームを無効化する機能
- ポートフォリオをクリックした際にアラートがでる機能
- 画面内に入ったらアニメーションをつける機能

になります。
*/

// ↓↓↓ローディング機能↓↓↓

// ロード画面を非表示にしてLP本体を見せるための処理をまとめた関数
const isLoaded = () => {
    // js-loadingクラスがついた要素を取得
    const loading = document.querySelector('.js-loading');
    // js-loadingクラスがついた要素にis-hiddenクラスを追加（非表示にする）
    loading.classList.add('is-hidden')
}

// ロードした時に起動
window.addEventListener('load', () => {
    isLoaded();
});


// ↓↓↓汎用的なアラート↓↓↓
// HTML側でも何箇所かアラートを出したいので、まとめています
const onAlert = (msg) => {
    // onAlert('ここに設定した文字がアラートに表示')
    alert(msg)
}


// ↓↓↓フォーム無効化↓↓↓
const onSubmit = (msg) => {
    // アラートを出す部分は使いまわしです
    onAlert(msg);
    // falseを返して送信(リロード)を無効化
    onsubmit = () => {
        return false
    }
}


// ↓↓↓アニメーション↓↓↓

// アニメーションに使うクラス名を配列に挿入
// （scss/javascript/_animate.scssで定義したクラス名）
const animationList = ["fade-in", "slide-up", "slide-in-left", "slide-in-right"]

// animate関数を配列回数分繰り返し、配列の中身を引数に入れる
animationList.forEach(element => {
    // スクロールされるたびにanimate関数を実行
    window.addEventListener('scroll', () => {
        animate(element)
    });
});

// スクロールされたら起動するanimate関数を定義
const animate = (move) => {
    // scrollspy属性を取得
    // 例：<img scrollspy="fade-in">
    let targets = document.querySelectorAll('[scrollspy=' + move + ']');
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    // 要素が画面内に入るまで繰り返し
    for (let target of targets) {
        const position = target.getBoundingClientRect().top + scroll;
        // スクロール量が要素の高さまできたら起動
        if (scroll > position - windowHeight) {
            // js-****のアニメーションスタイルを追加
            target.classList.add('js-animate-' + move);
        }
    }
}