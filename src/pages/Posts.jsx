import { useEffect, useState } from 'react';
import { BASE_URL } from '../components/forms/bio-data';

const Post = props => {
  const { firstName, lastName, writeup, image, avatar } = props;

  return (
    <div className="card mb-5" style={{ width: '100%' }}>
      <img src={image} className="card-img-top w-100" alt="post artwork" />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">
            {firstName} {lastName}
          </h5>
          <img
            src={avatar}
            className="rounded-circle shadow-4"
            style={{ height: '50px', width: '50px' }}
            alt="user avatar"
          />
        </div>
        <p className="card-text mt-3">{writeup}</p>
      </div>
    </div>
  );
};

const Posts = () => {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/posts`)
      .then(resp => resp.json())
      .then(resp => {
        setBlogList(resp.data.posts || []);
      });
  }, []);
  return (
    <div className="container-fluid">
      <p className="fs-1 text-lg-start text-md-center  text-center">Posts</p>
      <div className="row w-100">
        {blogList.map(post => (
          <div className="col-xl-4 col-md-6 col-sm-12">
            <Post
              firstName={post?.firstName}
              lastName={post?.lastName}
              writeup={post?.writeup}
              image={post?.image}
              avatar={post?.avatar}
              key={post.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
