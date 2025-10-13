import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Community.css";

function Community() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Motivation");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
    const savedPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    setPosts(savedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem("communityPosts", JSON.stringify(posts));
  }, [posts]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleAddPost = () => {
    if (!newPost.trim() && !image) return alert("Write something or upload an image!");

    const user = JSON.parse(localStorage.getItem("userProfile"));
    const author = user?.name || "Anonymous";
    const avatar = user?.avatar || "https://img.icons8.com/fluency/48/user-male-circle.png";

    const post = {
      id: Date.now(),
      author,
      avatar,
      text: newPost,
      image,
      category,
      likes: [],
      reactions: { fire: 0, muscle: 0, clap: 0 },
      comments: [],
      date: new Date().toISOString(),
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setImage(null);
    showNotification("✅ Post shared successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (id) => {
    const username = JSON.parse(localStorage.getItem("userProfile"))?.name || "Guest";
    setPosts(
      posts.map((p) =>
        p.id === id
          ? {
              ...p,
              likes: p.likes.includes(username)
                ? p.likes.filter((l) => l !== username)
                : [...p.likes, username],
            }
          : p
      )
    );
  };

  const handleReact = (id, type) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } } : p
      )
    );
    showNotification(`🔥 Someone reacted with ${type.toUpperCase()}!`);
  };

  const handleAddComment = (id, commentText) => {
    if (!commentText.trim()) return;
    const username = JSON.parse(localStorage.getItem("userProfile"))?.name || "Guest";
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { user: username, text: commentText }] }
          : p
      )
    );
    showNotification("💬 Comment added!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
      showNotification("🗑 Post deleted");
    }
  };

  const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
    for (let i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count > 0) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
    return "just now";
  };

  let filtered = posts.filter(
    (p) =>
      p.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "likes") filtered.sort((a, b) => b.likes.length - a.likes.length);
  else filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalLikes = posts.reduce((sum, p) => sum + p.likes.length, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments.length, 0);

  return (
    <div className={`community-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="container py-4">
        {notification && (
          <div className="alert alert-success text-center position-fixed top-0 start-50 translate-middle-x mt-3">
            {notification}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h2>🏋️ Fitness Community Hub</h2>
          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="d-flex justify-content-between text-center mb-4">
          <div className="card p-2 flex-fill mx-2 shadow-sm">
            <h6>📢 Posts</h6>
            <p>{posts.length}</p>
          </div>
          <div className="card p-2 flex-fill mx-2 shadow-sm">
            <h6>❤️ Likes</h6>
            <p>{totalLikes}</p>
          </div>
          <div className="card p-2 flex-fill mx-2 shadow-sm">
            <h6>💬 Comments</h6>
            <p>{totalComments}</p>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Share your progress, tips, or motivation..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="d-flex gap-2 mb-2">
              <select
                className="form-select w-50"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Motivation</option>
                <option>Workout Tips</option>
                <option>Diet</option>
                <option>Transformation</option>
                <option>General</option>
              </select>
              <input type="file" className="form-control" onChange={handleImageUpload} />
            </div>
            <button className="btn btn-primary w-100" onClick={handleAddPost}>
              🚀 Share Post
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by keyword or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select w-25"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Newest</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="alert alert-warning text-center">No posts yet. Be the first! 💪</div>
        ) : (
          filtered.map((post) => (
            <div key={post.id} className="card mb-4 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <img src={post.avatar} alt="avatar" className="rounded-circle me-2" width="40" />
                  <div>
                    <strong>{post.author}</strong>{" "}
                    <span className="badge bg-info text-dark">{post.category}</span>
                    <div className="text-muted small">{timeAgo(post.date)}</div>
                  </div>
                </div>
                <p>{post.text}</p>
                {post.image && <img src={post.image} alt="" className="img-fluid rounded mb-2" />}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <button
                    className={`btn btn-sm ${
                      post.likes.includes(
                        JSON.parse(localStorage.getItem("userProfile"))?.name || "Guest"
                      )
                        ? "btn-success"
                        : "btn-outline-success"
                    }`}
                    onClick={() => handleLike(post.id)}
                  >
                    👍 {post.likes.length}
                  </button>
                  <div className="reactions d-flex gap-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleReact(post.id, "fire")}>
                      🔥 {post.reactions.fire}
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleReact(post.id, "muscle")}>
                      💪 {post.reactions.muscle}
                    </button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleReact(post.id, "clap")}>
                      👏 {post.reactions.clap}
                    </button>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(post.id)}>
                    🗑 Delete
                  </button>
                </div>
                <div className="mt-2">
                  <h6>💬 Comments ({post.comments.length})</h6>
                  {post.comments.map((c, i) => (
                    <div key={i} className="border rounded p-2 mb-1 bg-light">
                      <strong>{c.user}:</strong> {c.text}
                    </div>
                  ))}
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Write a comment and press Enter..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddComment(post.id, e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Community;
