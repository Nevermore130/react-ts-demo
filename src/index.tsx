import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "antd/dist/antd.min.css";
import "./i18n/config"
import store from './redux/store'
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    //现在redux store就可以从全局范围内使用了
    <Provider store={store}>
        <App/>
    </Provider>
);

