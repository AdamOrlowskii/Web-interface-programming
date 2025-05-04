export default function TypeSelector({ selectedCategory, setSelectedCategory }) {
    return (
        <aside className="list-horizontal">
            <label>
                <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "okładka twarda"}
                    onChange={() => setSelectedCategory("okładka twarda")}
                />
                📕 Okładka twarda
            </label>

            <label>
                <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "okładka miękka"}
                    onChange={() => setSelectedCategory("okładka miękka")}
                />
                📗 Okładka miękka
            </label>

            <label>
                <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "audiobook"}
                    onChange={() => setSelectedCategory("audiobook")}
                />
                🎧 Audiobook
            </label>

            <label>
                <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "ebook"}
                    onChange={() => setSelectedCategory("ebook")}
                />
                📱 Ebook
            </label>
        </aside>
    );
}
