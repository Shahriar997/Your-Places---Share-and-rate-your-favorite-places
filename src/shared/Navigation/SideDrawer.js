import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (

    /**mount On Enter and Unmount on Enter says that remove the dom inside the CSSTransision
     * once the it should be invisible. Also add it to the dom once it should be
     * visible
     */
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="slide-in-left"
      mountOnEnter   
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  //to mount the component outside the root div. go to index.html to see where it is mounted.
  // Portal is used to mount component outside the root div.
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
