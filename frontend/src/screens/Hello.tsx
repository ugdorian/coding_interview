import { HStack, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreateUserRequest, User, Post } from "../api/types";

export default function Hello() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [updatedPostTitle, setUpdatedPostTitle] = useState("");
  const [updatedPostContent, setUpdatedPostContent] = useState("");

  const handleAddUser = () => {
    const newUser: CreateUserRequest = {
      name,
      age: parseInt(age),
    };
    axios
      .post<User>("http://localhost:5000/user", newUser)
      .then((response) => {
        const addedUser = response.data;
        setName("");
        setAge("");
        console.log("New User:", addedUser);
        console.log("User added successfully!");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const handleAddPost = () => {
    const newPost = {
      title: newPostTitle,
      content: newPostContent,
      userId: 1,
    };
    axios
      .post<Post>("http://localhost:5000/post", newPost)
      .then((response) => {
        const addedPost = response.data;
        setPosts((prevPosts) => [...prevPosts, addedPost]);
        setNewPostTitle("");
        setNewPostContent("");
        console.log("New Post:", addedPost);
        console.log("Post added successfully!");
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  
  const handleUpdatePost = () => {
    if (selectedPostId) {
      const updatedPost = {
        title: updatedPostTitle,
        content: updatedPostContent,
      };
      axios
        .put<Post>(`http://localhost:5000/posts/${selectedPostId}`, updatedPost)
        .then((response) => {
          const updatedPost = response.data;
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === selectedPostId ? updatedPost : post
            )
          );
          setSelectedPostId(null);
          setUpdatedPostTitle("");
          setUpdatedPostContent("");
          console.log("Post updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    }
  };

  const handleDeletePost = (postId: number) => {
    axios
      .delete<Post>(`http://localhost:5000/posts/${postId}`)
      .then((response) => {
        const deletedPost = response.data;
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== deletedPost.id)
        );
        console.log("Post deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };


  useEffect(() => {
    axios
      .get<Post[]>("http://localhost:5000/posts") // Updated response data type
      .then((response) => {
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);
        console.log("Posts fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <VStack h="100vh" justifyContent="center">
      <HStack justifyContent="center" spacing={3}>
        <Text>Well Hello There.</Text>
        <Text color="red">General Kenobi.</Text>
      </HStack>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPost();
        }}
      >
        <div>
          <label htmlFor="newPostTitle">Title:</label>
          <input
            type="text"
            id="newPostTitle"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPostContent">Content:</label>
          <textarea
            id="newPostContent"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Post</button>
      </form>

      <div>
        <h2>Posts:</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>Title: {post.title}</p>
              <p>Content: {post.content}</p>
              <p>User ID: {post.userId}</p>
              {selectedPostId === post.id ? (
                <div>
                  <label htmlFor="updatedPostTitle">Updated Title:</label>
                  <input
                    type="text"
                    id="updatedPostTitle"
                    value={updatedPostTitle}
                    onChange={(e) => setUpdatedPostTitle(e.target.value)}
                  />
                  <label htmlFor="updatedPostContent">Updated Content:</label>
                  <textarea
                    id="updatedPostContent"
                    value={updatedPostContent}
                    onChange={(e) => setUpdatedPostContent(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdatePost}>Update</button>
                </div>
              ) : (
                <div>
                  <button onClick={() => setSelectedPostId(post.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </VStack>
  );
}