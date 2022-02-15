import { useQuery } from '@apollo/client';
import { getAll } from "./GraphQL/Query";

function App() {
  const {loading,error,data}=useQuery(getAll)
  if (loading) return "Loading"
  if (error) return "Error"
  if(data) console.log(data)
  return (
    <div className="App">
      {data.getAll.map((data) => (

          <p key={data.title}>
            {data.title}----{data.description}
          </p>
        ))
      }
    </div>
  )
}

export default App;
