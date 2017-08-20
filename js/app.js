var my_news = [
  {
    author: "Vasia Pupkin",
    text: "Vasia rulit",
    bigText:
      "Lorem ipsum dolor sit amet, no vis nobis deseruisse reprimique, intellegat efficiantur vim cu, ad est justo delenit. Vix at solum vituperata, ne vis tota rationibus accommodare. Nisl abhorreant vix."
  },
  {
    author: "Vania Ivanow",
    text: "$ po 8",
    bigText:
      "An quem habeo idque has, te mea percipit menandri mnesarchum. Eum aeque albucius in, adolescens instructior est eu. Ei usu evertitur appellantur concludaturque, graeci probatus intellegam ea vel. Ne pri."
  },
  {
    author: "Guest",
    text: "Free. Sex. Rock. N. Roll.",
    bigText:
      "Mel at wisi ridens iisque. Veritus verterem repudiandae per eu. Augue impetus lobortis eam id, ut primis tibique nec. Quem ocurreret scriptorem ex nec, ad rebum virtute sit. Falli tritani."
  }
];

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      counter: 0
    };
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
        <strong>
          {this.state.counter}
        </strong>
      </div>
    );
  }
});

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({ visible: true });
  },
  render: function() {
    var author = this.props.data.author,
      text = this.props.data.text,
      bigText = this.props.data.bigText,
      visible = this.state.visible;
    return (
      <div className="article">
        <p className="news__author">
          {author}:
        </p>
        <p className="news__text">
          {text}
        </p>
        <a
          href="#"
          onClick={this.readmoreClick}
          className={"news__readmore " + (visible ? "display-none" : "")}
        >
          More detail
        </a>
        <p className={"news__big-text " + (visible ? "" : "display-none")}>
          {bigText}
        </p>
      </div>
    );
  }
});

var TestInput = React.createClass({
  componentDidMount: function() {
    //ставим фокус в input
    ReactDOM.findDOMNode(this.refs.myTestInput).focus();
  },
  onBtnClickHandler: function() {
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },
  render: function() {
    return (
      <div className="testInput">
        <input
          className="test-input"
          type="text"
          defaultValue=""
          ref="myTestInput"
          placeholder="type sth"
        />
        <input type="button" value="clickMe" onClick={this.onBtnClickHandler} />
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>News</h3>
        <TestInput />
        <News data={my_news} />
        {/*Comment*/}
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
