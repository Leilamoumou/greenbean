import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
 
const COMMUNITIES = [
  { name: null,              label: 'All' },
  { name: 'houseplants',     label: 'Houseplants' },
  { name: 'grow-your-food',  label: 'Grow Your Food' },
  { name: 'nyc-local',       label: 'NYC Local' },
];
 
export default function Feed() {
  const [posts, setPosts]           = useState([]);
  const [community, setCommunity]   = useState(null);
  const [sort, setSort]             = useState('hot');
  const [loading, setLoading]       = useState(true);
 

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ sort });
    if (community) params.set('community', community);
 
    fetch(`/api/posts?${params}`)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); });
  }, [community, sort]);
 
  return (
    <div className="feed-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>communities</h3>
        <ul className="community-list">
          {COMMUNITIES.map(c => (
            <li key={c.label}>
              <button
                className={community === c.name ? 'active' : ''}
                onClick={() => setCommunity(c.name)}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        <Link to="/post/new" className="btn-primary full-width">+ new post</Link>
      </aside>
 
      {/* Posts */}
      <section className="post-list">
        <div className="sort-bar">
          <button className={sort === 'hot' ? 'active' : ''} onClick={() => setSort('hot')}>hot</button>
          <button className={sort === 'new' ? 'active' : ''} onClick={() => setSort('new')}>new</button>
        </div>
 
        {loading && <p className="loading">loading posts…</p>}
        {!loading && posts.length === 0 && <p className="empty">no posts yet — be the first to share :D!</p>}
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </section>
    </div>
  );
}
 