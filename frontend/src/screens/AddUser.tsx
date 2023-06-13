import { useState, useEffect } from "react";
import { Button, VStack, Alert, AlertIcon, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { CreateUserRequest, User } from "../api/types";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface FormValues {
  name: string;
  age: number;
}

export default function AddUser() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createUser = async (newUser: CreateUserRequest) => {
    const response = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Error adding user");
    }
    return response.json() as Promise<User>;
  };

  const mutation = useMutation<User, Error, CreateUserRequest>(createUser, {
    onSuccess: (addedUser) => {
      console.log("New User:", addedUser);
      console.log("User added successfully!");
      setIsSubmitted(true);
    },
    onError: (error) => {
      console.error("Error adding user:", error);
    },
  });

  const handleAddUser = (values: FormValues, { resetForm }: any) => {
    const newUser: CreateUserRequest = {
      name: values.name,
      age: values.age,
    };

    mutation.mutate(newUser);

    resetForm({
      values: { name: "Name", age: "Age" },
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <VStack h="100vh" justifyContent="center">
      <div>
        <Button as={Link} to="/">
          Home
        </Button>
      </div>
      <div>
        <Button as={Link} to="/posts">
          Posts
        </Button>
      </div>

      <Formik
        initialValues={{ name: "", age: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.age) {
            errors.age = "Required";
          } else if (isNaN(values.age)) {
            errors.age = "Age must be a number";
          } else if (values.age < 1 || values.age > 200) {
            errors.age = "Age must be between 1 and 200";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          handleAddUser(values, { resetForm });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name">
              {({ field }: any) => <Input {...field} placeholder="Name" />}
            </Field>
            <ErrorMessage name="name" component="div" />
            <Field name="age">
              {({ field }: any) => (
                <NumberInput min={1} max={200}>
                  <NumberInputField
                    {...field}
                    placeholder={isSubmitted ? "Age" : "Age"}
                  />
                </NumberInput>
              )}
            </Field>
            <ErrorMessage name="age" component="div" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {isSubmitted && (
        <Alert status="success" mt={4} display="flex" alignItems="center">
          <AlertIcon />
          User added successfully!
        </Alert>
      )}
    </VStack>
  );
}
