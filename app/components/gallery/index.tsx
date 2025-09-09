import StandardBnr from "../common/StandardBnr";
import Gallery from "./Gallery";
const Index = () => {
  return (
    <>
    <section className="pt-57px">
      <div className="container">
        <StandardBnr title="Gallery" />
      </div>
    </section>
    <Gallery />
    </>
  );
}

export default Index;