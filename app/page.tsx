"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

// Create Amplify client
const client = generateClient<Schema>();

export default function App() {
  const { signOut } = useAuthenticator(); // ⭐ Sign out
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // ⭐ Listen to todos
  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  // ⭐ Create todo
  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  // ⭐ Delete todo
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>My todos</h1>

      {/* Create new todo */}
      <button onClick={createTodo}>+ new</button>

      {/* Sign out button */}
      <button onClick={signOut} style={{ marginLeft: "10px" }}>
        Sign out
      </button>

      {/* Show todos */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {todo.content}
          </li>
        ))}
      </ul>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
