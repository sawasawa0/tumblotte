import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import postsActions from '../actions/posts';
import authenticateActions from '../actions/authenticate';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import Login from '../components/Login';
import menu from '../electron/MainMenu';

class App extends React.Component {
  componentDidMount() {
    const { store, dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);
    menu(actions, store);
  }

  editor() {
    const { posts, dispatch } = this.props;
    const actions = bindActionCreators(postsActions, dispatch);
    const post = posts.find((post) => post.selected);

    return (
      <div id="layout">
        <Sidebar posts={posts}
          onRemove={actions.remove}
          onSelect={actions.select}
          onCreate={actions.create} />
        <div id="main" className="pure-g">
          <Editor post={post}
            onChange={actions.change}
            onPost={actions.post}
            onEdit={actions.edit} />
          <Preview post={post} />
        </div>
      </div>);
  }

  login() {
    const { authenticate, dispatch } = this.props;
    const actions = bindActionCreators(authenticateActions, dispatch);
    return (
      <Login authenticate={authenticate}
        authorize={actions.authorize}
        getAccessToken={actions.getAccessToken} />);
  }

  render() {
    const { authenticate } = this.props;
    return authenticate.accessToken ? this.editor() : this.login();
  }
}

export default connect((state)=> state)(App);
