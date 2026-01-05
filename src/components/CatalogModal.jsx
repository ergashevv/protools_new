import { Drawer } from "antd";

import React from "react";

const CatalogModal = ({ children, onClose, showDrawer }) => {
  return (
    <Drawer
      closable={false}
      autoFocus
      placement="top"
      onClose={onClose}
      open={showDrawer}
    >
      {children}
    </Drawer>
  );
};

export default CatalogModal;
