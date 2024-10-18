import Header from "@/components/Header";
import Item from "@/components/Item";

export default function Home() {
  return (
    <>
      <Header/>

      <main>
        <h2 id="meals">Meals</h2>
        <Item
          name="Chick-fil-a Sandwich"
          price="8.00"
          id="price_1QB9DTBGQeDfXxj7OevU3VgC"
        />
        
        <h2 id="snacks">Drinks</h2>
        
        <h2 id="snacks">Snacks & Treats</h2>
        
      </main>
    </>
  );
}
