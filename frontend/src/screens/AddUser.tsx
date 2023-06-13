import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { CreateUserRequest, User } from "../api/types";
import axios from "axios";
import { Link } from "react-router-dom";


export default function AddUser() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

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

    return (
        <VStack h="100vh" justifyContent="center">
            <HStack justifyContent="center" spacing={3}>
                <Text>Well Hello There.</Text>
                <Text color="red">General Kenobi.</Text>
            </HStack>
            <div>
                <Button as={Link} to="/">Home</Button>
            </div>
            <div>
                <Button as={Link} to="/posts">Posts</Button>
            </div>


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


        </VStack>
    )


}