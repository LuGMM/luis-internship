import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const [options, setOptions] = useState({});

  async function fetchCollection() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );

    setCollection(data);
    setOptions({
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        900: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
    console.log(data);
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {collection.length ? (
            <OwlCarousel {...options} className="owl-theme">
              {collection.map((card, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${card.nftId}`}>
                      <img
                        src={card.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${card.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={card.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{card.title}</h4>
                    </Link>
                    <span>ERC-{card.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options} className="owl-theme">
              {new Array(6).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={""}>
                      <Skeleton width="100%" height="200px" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={""}>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={""}>
                      <Skeleton width="100px" height="20px" />
                    </Link>
                    <Skeleton width="60px" height="20px" />
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
