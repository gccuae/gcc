import StandardBnr from "../common/StandardBnr";
import Gallery from "./Gallery";
const Index = () => {
  return (
    <>
    <section className="py-57px">
      <div className="container">
        <StandardBnr title="Gallery" />
      </div>
    </section>
    <Gallery />
    </>
  );
}

export default Index;