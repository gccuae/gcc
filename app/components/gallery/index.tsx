import StandardBnr from "../common/StandardBnr";
import Gallery from "./Gallery";
import { GalleryType } from "./type";

const Index = ({data}: {data: GalleryType}) => {
  console.log(data)
  return (
    <>
    <section className="pt-57px">
      <div className="container">
        <StandardBnr title={data.pageTitle} />
      </div>
    </section>
    <Gallery data={data}/>
    </>
  );
}

export default Index;