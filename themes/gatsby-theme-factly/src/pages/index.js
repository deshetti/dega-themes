import React, { useState} from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Layout from '../components/layout';
import ListItems from '../components/listItems';
import Footer from '../components/footer';
import PostsGroup from '../components/postsGroup';

function IndexPage({ data }) {
  const { degaCMS: { factchecks, categories, posts }} = data;
  const mergedPosts = [...posts.nodes, ...factchecks.nodes]

  const featured = factchecks.nodes[0] || {}
  const [postItems, setPostItems] = useState(mergedPosts.slice(0, 2));
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleLoadMore = () => {
    if (!hasNextPage) return false;
    const nextPageItems = mergedPosts.slice(postItems.length, postItems.length + 2);
    setPostItems([...postItems, ...nextPageItems]);
    setHasNextPage(postItems.length < mergedPosts.length);
  };

  return (
    <Layout>
      <div className="flex flex-row justify-between lg:border-b">
        <div className="sidebar xl:flex xl:w-1/4 border-r sticky">
          <div className="block">
            <div className="mb-4 pb-4 border-b px-6">
              <h5 className="heading">Headlines</h5>
            </div>
            {categories.nodes.map((item, index) => (
              <div
              className='flex flex-col leading-tight border-b last:border-b-0 py-2 px-6 border-gray-200'
            >
              <a
                href={`#${item.slug}`}
                className={`w-full flex no-underline hover:no-underline font-bold font-sans text-base text-gray-800`}
              >
                  {item.name}
              </a>
            </div>
            ))}
          </div>
          <div className="flex w-full justify-start items-start my-4 p-4">
            <img
              alt=""
              src="https://factly.in/wp-content/uploads//2018/09/banner-survey-side.png"
              className="w-full object-cover rounded"
            />
          </div>
        </div>
        <div className="main-content w-full md:w-3/4 xl:w-2/4 mx-auto">
          {/* <div className="mb-4 pb-4 border-b">
              <h5 className="font-semibold text-2xl leading-tight text-gray-900">
                Top In Factchecks
              </h5>
            </div> */}
          <div className="bg-white rounded-t rounded-b-none overflow-hidden px-6">
            <a
              href="/"
              className="flex flex-wrap no-underline hover:no-underline"
            >
              <img
                alt={featured.media.alt_text}
                src={featured.media.source_url}
                className="h-full w-full rounded"
              />
              <p className="w-full text-gray-600 text-xs md:text-sm pt-2">
                {featured.sub_title}
              </p>
              <div className="w-full font-bold text-xl leading-tight text-gray-900 break-all">
                {featured.title}
              </div>
              <p className="text-gray-800 font-sans text-lg pt-2 break-all">
                {featured.excerpt}
              </p>
            </a>
            <div className="flex-none mt-auto py-4">
              <div className="flex items-center justify-between">
                <div className="flex justify-center items-center">
                  {featured.degaUsers && featured.degaUsers.map((value, index, arr) => (
                    <Link
                      to="/author-details"
                      className="text-gray-600 text-xs md:text-sm mr-2"
                    >
                      {value.display_name}
                      {arr.length - index > 1 && ','}
                    </Link>
                  ))}
                </div>
                  <p className="text-gray-600 text-xs md:text-sm">{featured.published_date}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-6">
          {categories.nodes.map((category, index) => (
            <PostsGroup category={category}></PostsGroup>
            ))}
          <div id="more-stories">
              <div className="border-b p-6">
                <h5 className="font-semibold text-2xl leading-tight text-gray-900">
                  More stories from factly.....
                </h5>
              </div>
              <InfiniteScroll
                pageStart={0}
                loadMore={handleLoadMore}
                hasMore={hasNextPage}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                {postItems.map((item, index) => (
                  <ListItems
                    orientation="vertical horizontal"
                    item={item}
                    index={index}
                    tags
                    excerpt
                    imageSize="w-full md:w-1/3 h-48 md:h-full py-4 md:py-0"
                  />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <div className="sidebar lg:flex lg:w-2/6 xl:w-1/4 border-l sticky">
          <div className="block">
            <div className="mb-4 pb-4 border-b px-6">
              <h5 className="heading">Top In Factchecks</h5>
            </div>
            {factchecks.nodes.slice(0,10).map((item, index) => (
              <ListItems
                orientation="vertical"
                imageSize="h-40"
                tags
                item={item}
                index={index}
              />
            ))}
            <Footer></Footer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    file: {
      childImageSharp: {}
    }
  })
};

export default IndexPage;
export const query = graphql`
  query {
    degaCMS {
      categories(limit: 5, sortBy: "last_updated_date", sortOrder: "ASC"){
        nodes{
         name
         slug
       }
      }
      posts(limit: 20){
        nodes{
          title
          sub_title
          published_date
          excerpt
          slug
          __typename
          media{
            source_url
            alt_text
          }
          degaUsers{
            display_name
          }
          categories{
            name
          }
        }
      }
      factchecks(limit: 20){
        nodes{
          title
          sub_title
          published_date
          excerpt
          slug
          __typename
          media{
            source_url
            alt_text
          }
          degaUsers{
            display_name
          }
          categories{
            name
          }
        }
      }
    }
    file(relativePath: { eq: "logo/logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
