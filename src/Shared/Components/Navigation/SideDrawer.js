import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  // const content = <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>

  const content = (
    <CSSTransition 
      in={props.show}
     
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      Timeout= {200}
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
