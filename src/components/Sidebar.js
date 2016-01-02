import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Sidebar extends React.Component {
  select(post) {
    const { onSelect } = this.props;
    onSelect(post);
  }

  create() {
    const { onCreate } = this.props;
    onCreate();
  }

  remove() {
    const { posts, onRemove } = this.props;

    if(confirm('(๑•﹏•)?')) {
      posts.forEach((post) => {
        if(post.selected) {
          onRemove(post);
        }
      });
    }
  }

  makeItem(post) {
    const className =
      `sidebar__item
      ${post.selected ? 'sidebar__item--selected' : ''}
    ${post.dirty ? 'sidebar__item--dirty' : ''}`;

    return (
        <div key={post.id}
          className={className}
          onClick={::this.select.bind(this, post)}>
          <h4 className="sidebar__item-title">{post.title}</h4>
          <p className='sidebar__item-body'>{post.body.substring(0, 20)}</p>
        </div>);
  }

  makeBlog(blog) {
    return (<option key={blog.name} value={blog.name}>{blog.title}</option>);
  }

  render() {
    const { blogs, posts } = this.props;
    const blogItems = blogs.map(::this.makeBlog);
    const items = posts.map(::this.makeItem);

    return <div id="list" className="sidebar">
      <div className="sidebar__nav">
        <div className="sidebar__blogs">
          <select>{blogItems}</select>
        </div>
        <div className="sidebar__actions">
          <button className="primary-button pure-button"
            onClick={::this.create}>
            <FontAwesome name='file-o' />
          </button>
          <button className="secondary-button pure-button"
            onClick={::this.remove}>
            <FontAwesome name='trash-o' />
          </button>
        </div>
      </div>
      <div className='sidebar__items'>
        {items}
      </div>
    </div>;
  }
}
