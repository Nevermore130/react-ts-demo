import styles from "./Header.module.css"
import {Typography, Dropdown, Menu, Button, Layout, Input} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import logo from "../../assets/logo.svg"
import React from "react";
import {RouteComponentProps, withRouter} from "../../helpers/withRouter";
import {withTranslation, WithTranslation} from "react-i18next";
import {LanguageState} from "../../redux/language/languageReducer";
import store, {RootState} from "../../redux/store";
import {addLanguageActionCreator, changeLanguageActionCreator} from "../../redux/language/languageActions";

//通过connect函数把store的state和dispatch方法与组件连接起来
import {connect} from 'react-redux'
import {Dispatch} from "redux";

interface State extends LanguageState {
}

const mapStateToProps = (state: RootState) => ({
    language: state.language,
    languageList: state.languageList
})

type PropsType = RouteComponentProps // react-router 路由props类型
    & WithTranslation // i18n props类型
    & ReturnType<typeof mapStateToProps> // redux store 映射类型
    & ReturnType<typeof mapDispatchToProps> // redux dispatch映射类型


//因为mapDispatchToProps的return 对象会被connect函数注入header的props属性，所以也需要在PropsType中定义一下
const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeLanguage: (code: "zh" | "en") => {
        const action = changeLanguageActionCreator(code)
        dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
        const action = addLanguageActionCreator(name, code)
        dispatch(action)
    }
})


class HeaderComponent extends React.Component<PropsType> {

    // handleStoreChange = () => {
    //     const storeState = store.getState()
    //     this.setState({
    //         language: storeState.language,
    //         languageList: storeState.languageList
    //     })
    // }


    menuClickHandler = (e: any) => {
        if (e.key === "new") {
            this.props.addLanguage("新语言", "new_lang")
        } else {
            this.props.changeLanguage(e.key)
        }
    }

    render(): React.ReactNode {
        const {navigate, t} = this.props
        return (
            <div className={styles['app-header']}>
                {/*top-header*/}
                <div className={styles["top-header"]}>
                    <div className={styles.inner}>
                        <Typography.Text>让旅游更幸福</Typography.Text>
                        <Dropdown.Button style={{marginLeft: 15}}
                                         overlay={<Menu onClick={this.menuClickHandler} items={[
                                             ...this.props.languageList.map((l) => {
                                                 return {key: l.code, label: l.name}
                                             }), {key: "new", label: t("header.add_new_language")}
                                         ]}/>} icon={<GlobalOutlined/>}>
                            {this.props.language === "zh" ? "中文" : "English"}
                        </Dropdown.Button>

                        <Button.Group className={styles['button-group']}>
                            <Button>注册</Button>
                            <Button>登录</Button>
                        </Button.Group>

                    </div>
                </div>

                <Layout.Header className={styles['main-header']}>
                    <img src={logo} alt="" className={styles['App-logo']}/>
                    <Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
                    <Input.Search placeholder={'请输入旅游目的地，主题，关键字'}
                                  className={styles['search-input']}></Input.Search>
                </Layout.Header>

                <Menu className={styles['main-menu']} mode={"horizontal"} items={[
                    {key: "1", label: t("header.home_page")},
                    {key: "2", label: t("header.weekend")},
                    {key: "3", label: t("header.group")},
                    {key: "4", label: t("header.backpack")},
                    {key: "5", label: t("header.private")},
                    {key: "6", label: t("header.cruise")},
                    {key: "7", label: t("header.hotel")},
                    {key: "8", label: t("header.local")},
                    {key: "9", label: t("header.theme")},
                    {key: "10", label: t("header.custom")},
                    {key: "11", label: t("header.study")},
                    {key: "12", label: t("header.visa")},
                    {key: "13", label: t("header.enterprise")},
                    {key: "14", label: t("header.high_end")},
                    {key: "15", label: t("header.outdoor")},
                    {key: "16", label: t("header.insurance")},
                ]}>

                </Menu>

            </div>

        );
    }
}

export const HeaderClass = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))

