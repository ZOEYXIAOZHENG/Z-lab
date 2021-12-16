export default function News() {
    const news = [
        {
            id: 1,
            title: "Fashion Week Shanghai: Spring / Summer 2021 – The Best Shows & Designers.",
            url: "https://www.vogue.com/slideshow/best-street-style-at-shanghai-fashion-week-spring-2022",
            picture: "./img/shanghai.jpeg",
        },
        {
            id: 2,
            title: "This is how Norway puts artificial intelligence to use",
            url: "https://www.theexplorer.no/stories/technology/this-is-how-norway-puts-artificial-intelligence-to-use/?gclid=Cj0KCQiAweaNBhDEARIsAJ5hwbdqW9iNLmxhan1JBO7leKq4tf4gwvtiK25zVooe9zzn-ycrHTSjFOwaAgqOEALw_wcB",
            picture: "./img/norway.webp",
        },
        {
            id: 3,
            title: "Copenhagen Fashion Week Dates: Fashion show, designers, fairs and events",
            url: "https://copenhagenfashionweek.com/",
            picture: "./img/cph.png",
        },
    ];

    return (
        <div>
            <div id="news-container">
                {news.map((each) => (
                    <div key={each.id} className="news-box">
                        <a href={`${each.url}`}>
                            <img src={each.picture} alt={`${each.title}`} />
                            <h4>{each.title}</h4>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
