class Comment extends React.Component {

  _handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.index);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "comment" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("p", { className: "comment-author col-8" }, this.props.author), /*#__PURE__*/
      React.createElement("p", { className: "comment-time col-4 text-right" }, this.props.time)), /*#__PURE__*/

      React.createElement("p", { className: "comment-body" }, this.props.body), /*#__PURE__*/
      React.createElement("div", { className: "comment-footer text-right" }, /*#__PURE__*/
      React.createElement("a", { href: "#", className: "comment-footer-delete", onClick: this._handleDelete.bind(this) }, "コメントの削除"))));



  }}



class CommentForm extends React.Component {

  _handleSubmit(event) {
    event.preventDefault();

    if (this._author.value === "" || this._body.value === "") {
      alert('Please enter a name and comment.');
      return;
    }

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);

    //reset the input fields
    author.value = "";
    body.value = "";

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("form", { className: "comment-form", onSubmit: this._handleSubmit.bind(this) }, /*#__PURE__*/
      React.createElement("h3", null, "ご自由にコメントしてください"), /*#__PURE__*/
      React.createElement("div", { className: "comment-form-fields form-group" }, /*#__PURE__*/
      React.createElement("input", { className: "input-group", placeholder: "名前:", ref: input => this._author = input }), /*#__PURE__*/
      React.createElement("textarea", { className: "input-group", placeholder: "コメント:", rows: "5", ref: textarea => this._body = textarea })), /*#__PURE__*/

      React.createElement("div", { className: "comment-form-actions text-right" }, /*#__PURE__*/
      React.createElement("button", { className: "btn btn-default btn-primary", type: "submit" }, "コメントする"))));





  }}


class CommentBox extends React.Component {

  constructor() {
    super();

    //quick formatting of a timeStamp
    let now = new Date();
    now = now.toString();
    now = now.substring(4, now.indexOf(":", 19));

    let retrievedObject = localStorage.getItem('state');
    if (retrievedObject) var parsedObject = JSON.parse(retrievedObject);else
    var parsedObject = { showComments: true, comments: [] };

    this.state = {
      showComments: true,
      comments: parsedObject.comments
      //Example: {id:1, index: 1, author:'Spencer Kingman', body:'You da best!', time: now} 
    };
  }

  _addComment(author, body) {

    let now = new Date();
    now = now.toString();
    now = now.substring(4, now.indexOf(":", 19));

    const comment = {
      id: this.state.comments.length + 1,
      index: this.state.comments.length + 1,
      time: now,
      author,
      body };


    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  _deleteComment(index) {

    const tempArr = this.state.comments;

    let newArr = tempArr.filter(function (item) {
      return item.id !== index;
    });

    this.setState({ comments: newArr });

  }

  _getComments() {
    return this.state.comments.map(comment => {
      return /*#__PURE__*/React.createElement(Comment, {
        author: comment.author,
        body: comment.body,
        time: comment.time,
        key: comment.id,
        index: comment.id,
        onDelete: this._deleteComment.bind(this) });

    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'コメントはまだありません...';
    } else if (commentCount === 1) {
      return '';
    } else {
      return `${commentCount} コメント`;
    }
  }

  _getTime() {
    let d = moment();
    alert(d);
    return d;
  }

  _handleClick() {
    event.preventDefault();

    this.setState({
      showComments: !this.state.showComments });

  }

  componentDidUpdate() {
    localStorage.state = JSON.stringify(this.state);
  }

  render() {
    const comments = this._getComments();

    let buttonText = 'コメント表示';
    let commentNodes;

    if (this.state.showComments) {
      buttonText = 'コメント非表示';
      commentNodes = /*#__PURE__*/React.createElement("div", { className: "comment-list" }, comments);
    };

    return /*#__PURE__*/(
      React.createElement("div", { className: "comment-box" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/

      React.createElement("div", { className: "col-lg-5 col-md-4 commentForm-container" }, /*#__PURE__*/
      React.createElement(CommentForm, { addComment: this._addComment.bind(this) })), /*#__PURE__*/


      React.createElement("div", { className: "col-lg-6 col-md-7 offset-md-1 comments-container" }, /*#__PURE__*/

      React.createElement("h3", null, "コメント"), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/

      React.createElement("div", { className: "col-6" }, /*#__PURE__*/
      React.createElement("h4", { className: "comment-count" },
      this._getCommentsTitle(comments.length))), /*#__PURE__*/



      React.createElement("div", { className: "col-6 text-right" }, /*#__PURE__*/
      React.createElement("button", { className: "btn btn-default btn-info", onClick: this._handleClick.bind(this) },
      buttonText))),





      commentNodes))));





  }}



ReactDOM.render( /*#__PURE__*/React.createElement(CommentBox, null), document.getElementById("mountNode"));