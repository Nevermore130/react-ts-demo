import {Menu} from "antd";
import {sideMenuList} from "./mockup";
import {GifOutlined} from "@ant-design/icons";
import React from "react";
import styles from "../sideMenu/SideMenu.module.css"


export const SideMenu: React.FC = () => {
    return (
        <Menu className={styles['side-menu']} mode="vertical" items={sideMenuList.map((m) => ({
            label: m.title,
            key: m.title,
            icon: <GifOutlined/>,
            children: m.subMenu.map((sm) => ({
                label: sm.title,
                key: sm.title,
                icon: <GifOutlined/>,
                children: sm.subMenu.map((sms) => ({
                    label: sms,
                    key: sms,
                    icon: <GifOutlined/>
                }))
            }))
        }))}>
        </Menu>
    );
}
