import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  const getTopSellers = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );

    setTopSellers(data);
  };

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {topSellers.length ? (
              <ol className="author_list">
                {topSellers.map((sellers) => (
                  <li key={sellers.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${sellers.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={sellers.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${sellers.authorId}`}>
                        {sellers.authorName}
                      </Link>
                      <span>{sellers.price}</span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to="">
                        <Skeleton
                          height="50px"
                          width="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="">
                        <Skeleton width="75%" height="20px" />
                      </Link>
                      <span>
                        <Skeleton width="25%" height="16px" />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
