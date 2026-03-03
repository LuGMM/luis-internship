import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [authorInfo, setAuthorInfo] = useState({});
  const [collection, setCollection] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const getAuthorInfo = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
    );
    setAuthorInfo(data);
    setCollection(data.nftCollection);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorInfo();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {authorInfo.authorImage ? (
                      <div className="profile_avatar">
                        <img src={authorInfo.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authorInfo.authorName}
                            <span className="profile_username">
                              @{authorInfo.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorInfo.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    ) : (
                      <div className="profile_avatar">
                        <Skeleton
                          height="150px"
                          width="150px"
                          borderRadius="50%"
                        />

                        <div className="profile_name">
                          <h4>
                            <Skeleton height="20px" width="150px" />
                            <span className="profile_username">
                              <Skeleton height="16px" width="100px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton height="16px" width="120px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="profile_follow de-flex">
                    {authorInfo.followers ? (
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {authorInfo.followers + (isFollowing ? 1 : 0)}{" "}
                          followers
                        </div>
                        {isFollowing ? (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() => setIsFollowing(!isFollowing)}
                          >
                            Unfollow
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() => setIsFollowing(!isFollowing)}
                          >
                            Follow
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton height="16px" width="100px" />
                        </div>
                        <Skeleton
                          height="52px"
                          width="125px"
                          borderRadius="8px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    collection={collection}
                    AuthorImage={authorInfo.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
