import Main from "./Main";
import { blogDetailsData } from "./data";
import MoreBlog from "./MoreBlog";

const Index = () => {
  return (
    <>
      <Main
        title={blogDetailsData.title}
        category={blogDetailsData.category}
        date={blogDetailsData.date}
        author={blogDetailsData.author}
        mainImage={blogDetailsData.mainImage}
        description={blogDetailsData.description}
        extraContent={blogDetailsData.extraContent}
        quote={blogDetailsData.quote}
      />
      <MoreBlog category={blogDetailsData.category} />
    </>
  );
};

export default Index;
