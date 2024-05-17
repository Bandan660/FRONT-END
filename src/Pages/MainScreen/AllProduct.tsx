import React, { Fragment } from "react";
import { useGetcategoryQuery } from "../../Redux/api/categoryAPI";

const AllProduct = () => {
  const { data } = useGetcategoryQuery({});
  const category = data.categories;
  console.log(category);
  return (
    <Fragment>
      <main className="main">
        <div className="container">
          <div className="row">
            <aside className="sidebar-shop col-lg-3  ">
              <div className="sidebar-wrapper">
                <div className="category p-2">
                  <h6>CATEGORIES</h6>
                  <ul className="px-2">
                    {category &&
                      category.map((item) => {
                        return <li key={item.id}>{item.title}</li>;
                      })}
                  </ul>
                </div>
              </div>
            </aside>
            <div className="col-lg-9"></div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AllProduct;
