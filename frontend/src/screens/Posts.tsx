import { Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "../api/types";



export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [updatedPostTitle, setUpdatedPostTitle] = useState("");
    const [updatedPostContent, setUpdatedPostContent] = useState("");



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
            <div>
                <Button as={Link} to="/">Home</Button>
            </div>
            <div>
                <Button as={Link} to="/add_user">Add User</Button>
            </div>
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
    )

}