import style from 'styles/Sidebar.module.css';
import Menubtn from './Menubtn';
import Userblock from './Userblock';
import { useState } from 'react';

const USER_ICON = <i className="fa-regular fa-circle-user"></i>;
const LOG_OUT = <i className="fa-solid fa-arrow-right-from-bracket"></i>;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [minimized, setMinimized] = useState(true);

  // 버튼 눌렀을때 사이드바 열고 접는 함수
  const toggleCollapse = () => {
    if (collapsed) {
      setCollapsed(false);
      setMinimized(false);
    } else if (minimized) {
      setCollapsed(true);
    } else {
      setMinimized(true);
    }
  };

  // 사이드바가 호버될 때 상태 업데이트
  const handleMouseEnter = () => {
    setCollapsed(false);
    setMinimized(false);
    console.log(collapsed);
    console.log(minimized);
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
        // onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseEnter}
        // onMouseUp={handleMouseLeave}
      >
        <div className={style.sidebarHeader}>
          {minimized ? (
            <Userblock name="" nickname="" profileIcon={USER_ICON} />
          ) : (
            <Userblock name="홍길동" nickname="호부호형" profileIcon={USER_ICON} />
          )}
        </div>

        <div className={`${style.dividingline} ${minimized ? style.dividingline_mini : ''}`}></div>

        {!collapsed && (
          <div className={style.menu}>
            {minimized ? (
              <div className={style.menuItem}>
                <Menubtn icon={USER_ICON} text="" />
                <Menubtn icon={USER_ICON} text="" />
                <Menubtn icon={USER_ICON} text="" />
              </div>
            ) : (
              <div className={style.menuItem}>
                <Menubtn icon={USER_ICON} text="테스트1" />
                <Menubtn icon={USER_ICON} text="테스트2" />
                <Menubtn icon={USER_ICON} text="테스트3" />
              </div>
            )}

            {minimized ? (
              <div className={style.logout}>
                <Menubtn icon={LOG_OUT} text="" />
              </div>
            ) : (
              <div className={style.logout}>
                <Menubtn icon={LOG_OUT} text="Log out" />
              </div>
            )}
          </div>
        )}
      </div>

      <button onClick={toggleCollapse} className={style.arrowbtn}>
        {collapsed ? <i className="fa-solid fa-angles-right"></i> : <i className="fa-solid fa-angles-left"></i>}
      </button>
    </div>
  );
};

export default Sidebar;
