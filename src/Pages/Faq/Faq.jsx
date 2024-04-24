/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import './style/OrderPaymentDetail.css';
// import './style/GlobalStyle.css';
import Remove from "../../assets/VideoIcon/remove-question.svg";
import Add from "../../assets/VideoIcon/add-question.svg";
import Search from "../../assets/VideoIcon/search.svg";
import Arrow from "../../assets/VideoIcon/arrow.svg";
import OrangeArrow from "../../assets/VideoIcon/arrow-orange.svg";
import { useState } from "react";
import { DotLoader } from "react-spinners";
import styled, { css } from "styled-components";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  getFaqGroupsService,
  getQuestionsService,
} from "../../Services/FaqServices";
import { useRef } from "react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36c5ec;
`;

const Faq = ({ token }) => {
  const history = useHistory();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [childId, setChildId] = useState("");
  const [innerId, setInnerId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [rightClickedId, setRightClickedId] = useState("");
  const [id, setId] = useState(0);
  useEffect(() => {
    if (
      childId !== null &&
      childId !== 0 &&
      innerId !== null &&
      innerId !== 0
    ) {
      setId({
        main: childId,
        detail: innerId,
      });
    }
  }, [childId, innerId]);
  const detailHandler = (mainId, detailId) => {
    if (detailId !== 0) {
      getQuestions(detailId);
    }
    if (id.main === mainId && detailId === 0) {
      setId(0);
      history.push({
        pathname: "/questions",
        search: "?childId=0&innerId=0&questionId=0",
      });
      setOpenQuestion(null);
    } else if (id.main === mainId && id.detail === detailId) {
      setId({ main: mainId, detail: 0 });
      history.push({
        pathname: "/questions",
        search: `?childId=${mainId}&innerId=0&questionId=0`,
      });
      setOpenQuestion(null);
    } else {
      setId({ main: mainId, detail: detailId });
      history.push({
        pathname: "/questions",
        search: `?childId=${mainId}&innerId=${detailId}&questionId=0`,
      });
      setOpenQuestion(null);
    }
  };

  const [openQuestion, setOpenQuestion] = useState(null);
  const openMode = (id) => {
    history.push({
      pathname: "/questions",
      search: `?childId=${childId}&innerId=${innerId}&questionId=${id}`,
    });
    setOpenQuestion(id);
  };
  const closeMode = () => {
    history.push({
      pathname: "/questions",
      search: `?childId=${childId}&innerId=${innerId}&questionId=0`,
    });
    setOpenQuestion(null);
  };

  const [questions, setQuestions] = useState(null);
  const [faqGroups, setFaqGroups] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(null);

  useEffect(() => {
    setLoadingGroups(true);
    getFaqGroupsService()
      .then((res) => {
        setFaqGroups(res.data.Data);
        setLoadingGroups(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingGroups(false);
      });
  }, []);
  const getQuestions = (id) => {
    setLoading(true);
    getQuestionsService(id)
      .then((res) => {
        setQuestions(res.data.Data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //Handle right click event
  const [clicked, setClicked] = useState(false);
  const [link, setLink] = useState("");
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  const copyLinkHandler = (childId, innerId, questionId) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/questions?childId=${childId}&innerId=${innerId}&questionId=${questionId}`
    );
  };
  useEffect(() => {
    if (innerId !== null || innerId !== 0) {
      getQuestions(innerId);
    }
  }, [innerId]);

  useEffect(() => {
    setChildId(parseInt(searchParams.get("childId")));
  }, [searchParams.get("childId")]);
  useEffect(() => {
    setInnerId(parseInt(searchParams.get("innerId")));
  }, [searchParams.get("innerId")]);
  useEffect(() => {
    setQuestionId(parseInt(searchParams.get("questionId")));
  }, [searchParams.get("questionId")]);
  const ref = useRef();


  const isBottom = (ref) => {
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
  };


  return (
    <div className="questionsBody" ref={ref}>
      <div
        style={{
          height: "100%",
        }}
      >
        {loadingGroups ? (
          <DotLoader
            color={"#36c5ec"}
            loading={loadingGroups}
            css={override}
            size={30}
          />
        ) : (
          faqGroups?.map((item, index) => (
            <>
              <div style={{ margin: "20px 0" }} className="questionsHeader">
                <span style={{ color: "#9E9E9E" }}>پرسش‌های {item.Title}</span>
                <div className="questionsLine" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {item.childs.map((child) => (
                  <div
                    style={{
                      marginBottom: `${
                        index === faqGroups.length - 1 ? "100px" : 0
                      }`,
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        borderBottomRightRadius: `${
                          childId === child.id ? "0" : "12px"
                        }`,
                        borderBottomLeftRadius: `${
                          childId === child.id ? "0" : "12px"
                        }`,
                      }}
                      onClick={() => detailHandler(child.id, 0)}
                      className="questionsItem"
                    >
                      <h3 style={{ padding: "10px" }}>{child.Title}</h3>
                      <img
                        src={Arrow}
                        alt="Arrow"
                        className="questionsItem_header"
                        style={{
                          transition: "height 0.5s",
                          transform: `${
                            childId === child.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)"
                          }`,
                        }}
                      />
                    </div>
                    {childId === child.id && (
                      <div className="questionsItems_list">
                        {child.childs.map((inner) => (
                          <>
                            <div
                              className="questionsDetail"
                              style={{ cursor: "pointer" }}
                              onClick={() => detailHandler(child.id, inner.id)}
                            >
                              <h3 className="questionsItem_header">
                                {inner.Title}
                              </h3>
                              <img
                                src={OrangeArrow}
                                alt="OrangeArrow"
                                style={{
                                  transform: `${
                                    childId === child.id && innerId === inner.id
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)"
                                  }`,
                                  transition: "transform 0.5s",
                                  marginLeft: "10px",
                                }}
                              />
                            </div>
                            {childId === child.id && innerId === inner.id && (
                              <div className="questionsDetail_question">
                                {loading ? (
                                  <DotLoader
                                    color={"#36c5ec"}
                                    loading={loading}
                                    css={override}
                                    size={30}
                                  />
                                ) : questions !== null ? (
                                  questions.map((item) =>
                                    questionId === item.Id ? (
                                      <div className="questionsItem_collapse">
                                        <img
                                          onClick={closeMode}
                                          className="questionItem_imageHeader__add"
                                          src={Remove}
                                          alt="Remove"
                                        />

                                        <div
                                          onContextMenu={(e) => {
                                            e.preventDefault();
                                            setClicked(true);
                                            setRightClickedId(item.Id);
                                            setPoints({
                                              x: 0,
                                              y: 0,
                                            });
                                          }}
                                          onClick={closeMode}
                                          className="questionItem_collapse__header"
                                        >
                                          {item.Question}
                                        </div>

                                        <h3
                                          style={{
                                            color: "#6E6D6D",
                                            margin: "20px",
                                            fontSize: "1vw",
                                            fontWeight: "500",
                                            marginTop: "32px",
                                          }}
                                        >
                                          {item.Answer}
                                        </h3>
                                        {clicked &&
                                          item.Id ===
                                            parseInt(rightClickedId) && (
                                            <ContextMenu top={0} left={0}>
                                              <ul>
                                                <li
                                                  onClick={() =>
                                                    copyLinkHandler(
                                                      child.id,
                                                      inner.id,
                                                      item.Id
                                                    )
                                                  }
                                                >
                                                  Copy Link
                                                </li>
                                              </ul>
                                            </ContextMenu>
                                          )}
                                      </div>
                                    ) : (
                                      <div className="questionsItem_notCollapse">
                                        <img
                                          onClick={() => openMode(item.Id)}
                                          className="questionItem_imageHeader__remove"
                                          src={Add}
                                          alt="Add"
                                        />
                                        <div
                                          onContextMenu={(e) => {
                                            e.preventDefault();
                                            setClicked(true);
                                            setRightClickedId(item.Id);
                                            setPoints({
                                              x: 0,
                                              y: 0,
                                            });
                                          }}
                                          onClick={() => openMode(item.Id)}
                                          className="questionItem_notCollapse__header"
                                        >
                                          {item.Question}
                                        </div>
                                        {clicked &&
                                          item.Id ===
                                            parseInt(rightClickedId) && (
                                            <ContextMenu
                                              top={points.y}
                                              left={points.x}
                                            >
                                              <ul>
                                                <li
                                                  onClick={() =>
                                                    copyLinkHandler(
                                                      child.id,
                                                      inner.id,
                                                      item.Id
                                                    )
                                                  }
                                                >
                                                  Copy Link
                                                </li>
                                              </ul>
                                            </ContextMenu>
                                          )}
                                      </div>
                                    )
                                  )
                                ) : (
                                  <>پرسشی وجود ندارد!</>
                                )}
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default Faq;

export const ContextMenu = styled.div`
  position: absolute;
  width: 200px;
  background-color: #383838;
  color: white;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 500;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  & > ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  & > ul > li {
    padding: 18px 12px;
  }
  /* hover */
  & > ul > li:hover {
    cursor: pointer;
    background-color: #000000;
  }
`;
