var my_news = [
  {
    author: "Vasia Pupkin",
    text: "Vasia rulit"
  },
  {
    author: "Vania Ivanow",
    text: "$ po 8"
  },
  {
    author: "Guest",
    text: "Free. Sex. Rock. N. Roll."
  }
];

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    var data = this.props.data;
    var newsTemplate;
    if (data.length) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        );
      });
    } else {
      newsTemplate = "Nothing to show";
    }

    return (
      <div className="news">
        {newsTemplate}
        <strong
          className={"news__count " + (data.length > 0 ? "" : "display-none")}
        >
          Summary: {data.length} news
        </strong>
      </div>
    );
  }
});

var Article = React.createClass({
  render: function() {
    var author = this.props.data.author;
    var text = this.props.data.text;
    var articleTemplate = (
      <div className="article">
        <p className="news__author">
          {author}:
        </p>
        <p className="news__text">
          {text}
        </p>
      </div>
    );

    return articleTemplate;
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>News</h3>
        <News data={my_news} />
        {/*Comment*/}
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
