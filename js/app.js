'use strict';

window.ee = new EventEmitter();

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

var Add = React.createClass({
  getInitialState: function() {
    //устанавливаем начальное состояние (state)
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },
  componentDidMount: function() {
    //ставим фокус в input
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
    var textEl = ReactDOM.findDOMNode(this.refs.text);
  
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = textEl.value;
  
    var item = [{
      author: author,
      text: text,
      bigText: '...'
    }];
  
    window.ee.emit('News.add', item);
  
    textEl.value = '';
    this.setState({textIsEmpty: true});
  },
  onCheckRuleClick: function(e) {
    this.setState({ agreeNotChecked: !this.state.agreeNotChecked }); //устанавливаем значение в state
  },
  onFieldChange: function(fieldName, e) {
    if (e.target.value.trim()) {
      this.setState({ ["" + fieldName]: false });
    } else {
      this.setState({ ["" + fieldName]: true });
    }
  },
  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked,
      authorIsEmpty = this.state.authorIsEmpty,
      textIsEmpty = this.state.textIsEmpty;
    return (
      <form className="add cf">
        <input
          type="text"
          className="add__author"
          defaultValue=""
          placeholder="Your name"
          ref="author"
          onChange={this.onFieldChange.bind(this, "authorIsEmpty")}
        />
        <textarea
          className="add__text"
          defaultValue=""
          placeholder="Text news"
          ref="text"
          onChange={this.onFieldChange.bind(this, "textIsEmpty")}
        />
        <label className="add__checkrule">
          <input
            type="checkbox"
            onChange={this.onCheckRuleClick}
            ref="checkrule"
          />I agree with rules
        </label>
        <button
          className="add__btn"
          onClick={this.onBtnClickHandler}
          ref="alert_button"
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
        >
          Add news
        </button>
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      news: my_news
    };
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addListener("News.add", function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({ news: nextNews });
    });
  },
  componentWillUnmount: function() {
    window.ee.removeListener("News.add");
  },
  render: function() {
    return (
      <div className="app">
        <Add />
        <h3>News</h3>
        <News data={my_news} />
        {/*Comment*/}
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
