
// Находим элементы HTML
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");

// Функция получения цитаты
async function getQuote() {

    try {
        // Показываем загрузку
        quoteElement.textContent = "Loading...";
        authorElement.textContent = "";

        // Отправляем запрос к API
        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        // Проверяем ответ
        if (!response.ok) {
            throw new Error("API Error");
        }

        // Получаем данные
        const data = await response.json();

        // Показываем цитату и автора
        quoteElement.textContent = `"${data.quote}"`;
        authorElement.textContent = "— " + data.author;

    } catch (error) {

        quoteElement.textContent =
            "Oops! Something went wrong.";

        authorElement.textContent =
            "Please try again.";

        console.log(error);
    }
}

// Кнопка получения новой цитаты
newQuoteButton.addEventListener("click", getQuote);

// Загружаем цитату при открытии сайта
getQuote();
const copyButton = document.getElementById("copy-quote");

copyButton.addEventListener("click", async () => {
    const text = quoteElement.textContent + " " +
                 authorElement.textContent;

    try {
        await navigator.clipboard.writeText(text);

        copyButton.textContent = "✓ Copied!";

        setTimeout(() => {
            copyButton.textContent = "📋 Copy";
        }, 1500);

    } catch (error) {
        alert("Unable to copy quote!");
    }
});