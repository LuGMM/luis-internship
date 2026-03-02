import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import CountDown from "../CountDown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItms, setExploreItms] = useState([]);
  const [itemsShown, setItemsShown] = useState(8);
  const [loading, setLoading] = useState(true);

  const getExploreItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    );
    setExploreItms(data);
  };

  async function filterItems(filter) {
    setLoading(false);
    const filteredItems = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`,
    );
    setExploreItms(filteredItems.data);
    setLoading(true);
  }

  useEffect(() => {
    getExploreItems();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItms.length && loading ? (
        <>
          {exploreItms.slice(0, itemsShown).map((items) => (
            <div
              key={items.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${items.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={items.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {items.expiryDate ? (
                  <CountDown expiryDate={items.expiryDate} />
                ) : null}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${items.nftId}`}>
                    <img
                      src={items.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${items.nftId}`}>
                    <h4>{items.title}</h4>
                  </Link>
                  <div className="nft__item_price">{items.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{items.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="" data-bs-toggle="tooltip" data-bs-placement="top">
                    <Skeleton height="50px" width="50px" borderRadius="50%" />
                  </Link>
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="">
                    <Skeleton height="200px" width="100%" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Skeleton height="20px" width="100%" />

                  <div className="nft__item_price">
                    <Skeleton height="12px" width="25%" />
                  </div>
                  <div className="nft__item_like">
                    <span>
                      <Skeleton height="12px" width="20px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="col-md-12 text-center">
        {itemsShown !== 16 && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => {
              setItemsShown(itemsShown + 4);
            }}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
