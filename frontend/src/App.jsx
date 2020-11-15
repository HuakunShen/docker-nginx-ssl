import React, { useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
      })
      .catch((err) => {
        setPosts([{ id: 'error', title: 'error', body: 'error' }]);
      });
  }, []);
  return (
    <div>
      <h1>Posts</h1>
      <Link to='/'>home</Link>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>
              {post.title} ({post.id})
            </h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to='/posts'>Posts</Link>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/posts' component={Posts} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
