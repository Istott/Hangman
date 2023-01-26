import { useQuery, useMutation } from "@tanstack/react-query";
import logo from './logo.svg';
import './App.css';

const POSTS = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"},
  {id: 3, title: "Post 3"},
]

function App() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  })

  const newPostMutation = useMutation({
    mutationFn: title => {
      return wait(1000).then(() => 
        POSTS.push({ id: crypto.randomUUID(), title})
      )
    },
  })

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
            <button onClick={() => newPostMutation.mutate("New Post")}>
        add new
      </button>
      </header>
    </div>
  );
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App;
