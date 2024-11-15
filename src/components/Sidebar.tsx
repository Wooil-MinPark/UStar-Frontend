import style from 'styles/Sidebar.module.css';
import Menubtn from './Menubtn';
import Userblock from './Userblock';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const USER_ICON = <i className="fa-regular fa-circle-user"></i>;
const LOG_OUT_ICON = <i className="fa-solid fa-arrow-right-from-bracket"></i>;
const SATR_ICON = <i className="fa-regular fa-star"></i>;
const TENT_ICON = <i className="fa-solid fa-campground"></i>;

interface Props {
  handleIsSky?: () => void;
  isSky: boolean;
  userEmail: string | null;
  userName: string | null;
  userUid: number | null;
}

const Sidebar: React.FC<Props> = ({ handleIsSky, isSky, userEmail, userName, userUid }) => {
  // case 1,2,3 식으로 구현해보기 _ bool값이 아닌 숫자 0,1,2론
  const [collapsed, setCollapsed] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const navigator = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    (document.cookie as string) = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigator('/');
  };

  // 버튼 눌렀을때 사이드바 열고 접는 함수
  const toggleCollapse = () => {
    if (collapsed === false && minimized === false) {
      setCollapsed(true);
      setMinimized(true);
    } else if (collapsed === false && minimized === true) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
      setMinimized(false);
    }
  };

  // 사이드바가 호버될 때 상태 업데이트
  const handleMouseEnter = () => {
    if (minimized) {
      setMinimized(false);
    } else {
      setMinimized(true);
    }
  };

  // 사이드바에서 마우스가 떠날 때 상태 업데이트
  const handleMouseLeave = () => {
    setMinimized(true);
    // setCollapsed(false);
  };

  return (
    <div className={style.container}>
      <div
        className={`${style.sidebar} ${collapsed ? style.collapsed : ''} ${minimized ? style.minimized : ''}`}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseEnter}
        // onMouseDown={handleMouseEnter}
        // onMouseUp={handleMouseLeave}
      >
        <div className={style.sidebarHeader}>
          <Userblock name={userName} nickname={userEmail} profileIcon={USER_ICON} />
        </div>

        <div className={`${style.dividingline} ${minimized ? style.dividingline_mini : ''}`}></div>

        <div className={style.menu}>
          <div className={style.menuItem}>
            <Menubtn
              icon={isSky ? TENT_ICON : SATR_ICON}
              text={isSky ? '홈으로' : '별보러 가기'}
              Clikfunction={handleIsSky}
            />
            <Menubtn icon={USER_ICON} text="테스트2" />
            <Menubtn icon={USER_ICON} text="테스트3" />
          </div>

          <div className={style.logout}>
            <Menubtn icon={LOG_OUT_ICON} text="Log out" Clikfunction={handleLogOut} />
          </div>
        </div>
      </div>
      <button onClick={toggleCollapse} className={style.arrowbtn}>
        {collapsed ? <i className="fa-solid fa-angles-right"></i> : <i className="fa-solid fa-angles-left"></i>}
        {/* <i className="fa-solid fa-angles-left"></i> */}
      </button>
    </div>
  );
};

export default Sidebar;
