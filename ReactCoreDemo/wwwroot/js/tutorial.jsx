
//class Comment extends React.Component {
//    render() {
//        return (
//            <div className="comment">
//                <h2 className="commentAuthor">
//                    {this.props.author}
//                </h2>
//                {this.props.children}
//            </div>
//            );
//    }
//}

const Comment = (props) => {
    return (
        <div className="comment">
            <h2 className="commentAuthor">
                {props.author}
            </h2>
            {props.children}
        </div>
    );
};

class CommentList extends React.Component {
    render() {
        var commentNodes = this.props.data.map(comment => (
            <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
        ));

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: ''
        };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({
            author: e.target.value
        });
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({
            Author: author,
            Text: text
        });
        this.setState({
            author: '',
            text: ''
        });
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <label htmlFor="author">Your name: </label>
                <input
                    type="text"
                    id="author"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <label htmlFor="text">Say something: </label>
                <input
                    type="text"
                    id="text"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post"/>
            </form>
        );
    }
}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }

    handleCommentSubmit(comment) {
        const comments = this.state.data;
        comment.id = comments.length + 1;
        const newComments = comments.concat([comment]);
        this.setState({ data: newComments });


        const data = new FormData();
        data.append('author', comment.Author);
        data.append('text', comment.Text);

        const xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = () => this.loadCommentsFromServer();
        xhr.send(data);
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.loadCommentsFromServer();
        }
    }

    render() {
        return (
            <div className="commentBox">
                <CommentList data={this.state.data} />
                <br></br>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox url="/comments" submitUrl="/comments/new" pollInterval="{2000}"/>, document.getElementById('content')
);
