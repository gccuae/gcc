import Main from "./Main";
import MoreBlog from "./MoreBlog";
import { BlogData } from "../blog/type";

const Index = ({data, allBlogData}: {data: BlogData['categories'][number]['blogs'][number], allBlogData: BlogData}) => {
  console.log(data);

  console.log(allBlogData);
  return (
    <>
      <Main
        title={data.title}
        category={data.category}
        date={data.date}
        author={data.author}
        mainImage={data.coverPhoto}
        content={data.content}
        quote={data.quote}
        quoteAuthor={data.quoteAuthor}
        createdAt={data.createdAt}
      />
      <MoreBlog category={data.category} items={allBlogData}/>
    </>
  );
};

export default Index;
