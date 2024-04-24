/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
// import './style/OrderPaymentDetail.css';
// import './style/GlobalStyle.css';
import "./Videos.css"
import { css } from '@emotion/react';
import { Link, Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import Search from '../../assets/VideoIcon/search.svg';
import Arrow from '../../assets/VideoIcon/arrow.svg';
import OrangeArrow from '../../assets/VideoIcon/arrow-orange.svg';
import axios from 'axios';
import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router';
import { DotLoader } from 'react-spinners';
import { useRef } from 'react';
import styled from 'styled-components';
import { getVideoGroupsService, getVideosService } from '../../Services/VideoService';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0b647c;
`;

const Videos = () => {
  const history = useHistory();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [childId, setChildId] = useState('');
  const [innerId, setInnerId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [id, setId] = useState(0);

  const detailHandler = (mainId, detailId) => {
    if (detailId !== 0) {
      getVideos(detailId);
    }
    if (id.main === mainId && detailId === 0) {
      setId(0);
      history.push({
        pathname: '/videos',
        search: '?childId=0&innerId=0&videoId=0',
      });
    } else if (id.main === mainId && id.detail === detailId) {
      setId({ main: mainId, detail: 0 });
      history.push({
        pathname: '/videos',
        search: `?childId=${mainId}&innerId=0&videoId=0`,
      });
    } else {
      setId({ main: mainId, detail: detailId });
      history.push({
        pathname: '/videos',
        search: `?childId=${mainId}&innerId=${detailId}&videoId=0`,
      });
    }
  };

  const [player, setPlayer] = useState(0);
  const playHandler = (id) => {
    if (id === player) {
      setPlayer(0);
    } else {
      setPlayer(id);
    }
  };

  const [videos, setVideos] = useState(null);
  const [videosGroups, setVideosGroups] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loadingGroups, setLoadingGroups] = useState(null);

  useEffect(() => {
    setLoadingGroups(true);
    getVideoGroupsService()
      .then((res) => {
        setVideosGroups(res.data.Data);
        setLoadingGroups(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingGroups(false);
      });
  }, []);
  
  const getVideos = (id) => {
    setLoading(true);
    getVideosService(id)
      .then((res) => {
        setVideos(res.data.Data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Copy link handler
  const [hovered, setHovered] = useState(false);
  const [clickedId, setClickedId] = useState('');

  const copyLinkHandler = (childId, innerId, videoId) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/videos?childId=${childId}&innerId=${innerId}&questionId=${videoId}`,
    );
  };

  useEffect(() => {
    const handleClick = () => setHovered(false);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  useEffect(() => {
    setChildId(parseInt(searchParams.get('childId')));
  }, [searchParams.get('childId')]);
  useEffect(() => {
    setInnerId(parseInt(searchParams.get('innerId')));
  }, [searchParams.get('innerId')]);
  useEffect(() => {
    setVideoId(parseInt(searchParams.get('videoId')));
  }, [searchParams.get('videoId')]);
  useEffect(() => {
    if (innerId !== null || innerId !== 0) {
      getVideos(innerId);
    }
  }, [innerId]);
  return (
    <div className='questionsBody'>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <div class='searchContainer'>
          <input className='searchStyle' placeholder='جستجو کن' type={'text'} />
          <img
            onClick={() => console.log('searching...')}
            src={Search}
            class='searchIcon'
            alt='Search'
          />
        </div>
      </div>
      <div
        style={{
          paddingLeft: '10px',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          maskImage: 'linear-gradient(to bottom, black calc(100% - 48px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 48px), transparent 100%)',
        }}
      >
        {loadingGroups ? (
          <DotLoader color={'#36c5ec'} loading={loadingGroups} css={override} size={30} />
        ) : (
          videosGroups?.map((item, index) => (
            <>
              <div style={{ margin: '20px 0' }} className='questionsHeader'>
                <span style={{ color: '#9E9E9E' }}>آموزش‌های {item.Title}</span>
                <div className='questionsLine' />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {item.childs.map((child) => (
                  <div
                    style={{ marginBottom: `${index === videosGroups.length - 1 ? '100px' : 0}` }}
                  >
                    <div
                      style={{
                        cursor: 'pointer',
                        borderBottomRightRadius: `${childId === child.id ? '0' : '12px'}`,
                        borderBottomLeftRadius: `${childId === child.id ? '0' : '12px'}`,
                      }}
                      onClick={() => detailHandler(child.id, 0)}
                      className='questionsItem'
                    >
                      <h3 style={{ padding: '10px' }}>{child.Title}</h3>
                      <img
                        src={Arrow}
                        alt='Arrow'
                        className='questionsItem_header'
                        style={{
                          transition: 'height 0.5s',
                          transform: `${childId === child.id ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                        }}
                      />
                    </div>
                    {childId === child.id && (
                      <div className='questionsItems_list'>
                        {child.childs.map((inner) => (
                          <>
                            <div
                              className='questionsDetail'
                              style={{ cursor: 'pointer' }}
                              onClick={() => detailHandler(child.id, inner.id)}
                            >
                              <h3 className='questionsItem_header'>{inner.Title}</h3>
                              <img
                                src={OrangeArrow}
                                alt='OrangeArrow'
                                style={{
                                  transform: `${
                                    childId === child.id && innerId === inner.id
                                      ? 'rotate(180deg)'
                                      : 'rotate(0deg)'
                                  }`,
                                  transition: 'transform 0.5s',
                                  marginLeft: '10px',
                                }}
                              />
                            </div>
                            {childId === child.id &&
                              innerId === inner.id &&
                              // <div className='questionsDetail_question'>
                              (loading ? (
                                <DotLoader
                                  color={'#36c5ec'}
                                  loading={loading}
                                  css={override}
                                  size={30}
                                />
                              ) : videos !== null ? (
                                <div className='videosList'>
                                  {videos?.map((item) => (
                                    <div
                                      key={item.Id}
                                      style={{
                                        position: `relative`,
                                        zIndex: `${player === item.Id ? 1 : 0}`,
                                        width: `${player === item.Id ? '90%' : '320px'}`,
                                        height: `${player === item.Id ? '90%' : '240px'}`,
                                      }}
                                    >
                                      <iframe
                                        style={{
                                          position: `${
                                            player === item.Id ? 'absolute' : 'relative'
                                          }`,
                                          zIndex: `${player === item.Id ? 1 : 0}`,
                                          width: `100%`,
                                          height: `100%`,
                                          borderRadius: `${player === item.Id ? '20px' : '20px'}`,
                                        }}
                                        className='iframe'
                                        src={item.Link}
                                        allowFullScreen
                                        webkitallowfullscreen='true'
                                        mozallowfullscreen='true'
                                      ></iframe>
                                      <div
                                        style={{
                                          zIndex: 2,
                                          position: 'absolute',
                                          right: '5px',
                                          top: '8%',
                                          transform: 'translate(-50%, -50%',
                                          color: 'white',
                                        }}
                                        onMouseLeave={() => {
                                          setHovered(false);
                                        }}
                                      >
                                        {/* {hovered && item.Id !== parseInt(clickedId) && (
                                          <div
                                            onMouseMove={(e) => {
                                              setHovered(true);
                                              setClickedId(item.Id);
                                            }}
                                            style={{
                                              fontWeight: '600',
                                              fontSize: '20px',
                                            }}
                                          >
                                            ⋮
                                          </div>
                                        )} */}
                                        {!hovered && (
                                          <div
                                            onMouseMove={(e) => {
                                              setHovered(true);
                                              setClickedId(item.Id);
                                            }}
                                            style={{
                                              fontWeight: '600',
                                              fontSize: '20px',
                                            }}
                                          >
                                            ⋮
                                          </div>
                                        )}
                                        {hovered && item.Id !== parseInt(clickedId) && (
                                          <div
                                            onMouseMove={(e) => {
                                              setHovered(true);
                                              setClickedId(item.Id);
                                            }}
                                            style={{
                                              fontWeight: '600',
                                              fontSize: '20px',
                                            }}
                                          >
                                            ⋮
                                          </div>
                                        )}
                                        {hovered && item.Id === parseInt(clickedId) && (
                                          <ContextMenu>
                                            <ul>
                                              <li
                                                onClick={() =>
                                                  copyLinkHandler(child.id, inner.id, item.Id)
                                                }
                                              >
                                                Copy Link
                                              </li>
                                            </ul>
                                          </ContextMenu>
                                        )}
                                      </div>
                                      <div
                                        style={{
                                          zIndex: 1,
                                          position: 'absolute',
                                          left: '50%',
                                          top: '8%',
                                          transform: 'translate(-50%, -50%',
                                          color: 'white',
                                          fontWeight: '600',
                                          fontSize: '20px',
                                        }}
                                      >
                                        {item.Title}
                                      </div>
                                      <img
                                        src={Search}
                                        alt={'search'}
                                        style={{
                                          zIndex: 2,
                                          position: 'absolute',
                                          left: '5px',
                                          top: '10px',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => playHandler(item.Id)}
                                      ></img>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <>آموزشی وجود ندارد!</>
                              ))}
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

export default Videos;

export const ContextMenu = styled.div`
  position: absolute;
  width: 200px;
  background-color: #383838;
  color: white;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 500;
  top: -20px;
  left: -200px;
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
