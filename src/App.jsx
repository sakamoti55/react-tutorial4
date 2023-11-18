import { useEffect, useState } from "react";

async function fetchCategory(category,searchTerm) {
  const request = await fetch("products.json");
  let data = await request.json();//dataの値が変化するため、const -> let
  if(searchTerm !== ""){
    data = data.filter(product => product.name.includes(searchTerm));
  }
  if(category === "All"){
    return data;
  }else{
    return data.filter(product => product.type === category);
  }

}


export default function App() {
  const [product,setProduct] = useState([]);

  const [category,setCategory] = useState("All");
  const [searchTerm,setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const newProduct = await fetchCategory("All","");
      setProduct(newProduct);
    })();
  }, []);

  async function handleClick(event){
    event.preventDefault();
    const newProduct = await fetchCategory(category,searchTerm);     
    setProduct(newProduct);
  }


  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select 
                id="category" 
                onChange={async (event) => setCategory(event.target.value)
                }
              >
                <option value="All">All</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
                <option value="soup">Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input 
                type="text" 
                id="searchTerm" 
                placeholder="e.g. beans" 
                value={searchTerm}
                onChange={async (event) => setSearchTerm(event.target.value) 
              }         
              >
              </input>           
            </div>
            <div>
              <button onClick={handleClick}>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {product.map((product, index) => (
            <section key={index} className={product.type}>
              <h2>{product.name}</h2>
              <p>{product.price}円</p>
              <img src={"images/" + product.image} alt={product.name} />
            </section>
          ))}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
