import React from 'react'
import Search from '../../assets/VideoIcon/search.svg';
// import Close from "../../assets/item-actions/close-white-color-red-bg.svg";
import Close from "../../assets/contract/close.svg";

function VideoList({setIsModal}) {
  return (
    <div >

      <div
        // key={item.Id}
        style={{
          position: `relative`,
          zIndex: `${true ? 1 : 0}`,
          width: `800px`,
          height: `400px`,
        }}
      >
        <iframe
          style={{
            // position: `${
            //   player === item.Id ? 'absolute' : 'relative'
            // }`,
            // zIndex: `${player === item.Id ? 1 : 0}`,
            width: `100%`,
            height: `100%`,
            borderRadius: `${true ? '20px' : '20px'}`,
          }}
          className='iframe'
          src={"https://www.aparat.com/video/video/embed/videohash/VOM0r/vt/frame"}
          allowFullScreen
          webkitallowfullscreen='true'
          mozallowfullscreen='true'
        ></iframe>
        <div
          style={{
            zIndex: 2,
            position: 'absolute',
            right: '0',
            top: '0',
            transform: 'translate(-50%, -50%',
            color: 'white',
          }}
          onMouseLeave={() => {
            // setHovered(false);
          }}
        >
       <img
          src={Close}
          onClick={()=>setIsModal(false)}
          alt={'search'}
          style={{
            zIndex: 2,
            position: 'absolute',
            right: '10px',
            top: '10px',
            cursor: 'pointer',
          }}
        //   onClick={() => playHandler(item.Id)}
        ></img>
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
          {/* {!hovered && (
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
          )} */}
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
          عنوان فیلم
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
        //   onClick={() => playHandler(item.Id)}
        ></img>
      </div>

  </div>
  )
}

export default VideoList