import {withTranslation, WithTranslation} from 'react-i18next'
import React from "react";
import {Carousel, HeaderClass, ProductCollection, SideMenu} from "../../components";
import styles from './HomePage.module.css'
import {Col, Row, Spin, Typography} from "antd";
import sideImage from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import axios from "axios";


interface StateProps {
    loading: boolean,
    productList: any[],
    error: string | null
}

/**
 * WithTranslation 国际化对象传递过来的props
 */
class HomePageComponent extends React.Component<WithTranslation, StateProps> {

    constructor(props: WithTranslation) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            productList: []
        }
    }


    async componentDidMount() {
        try {
            const {data} = await axios.get('http://82.157.43.234:8080/api/productCollections', {
                headers: {
                    "x-icode": "6FE3D0FC0E643CAB"
                }
            })
            this.setState({
                loading: false,
                productList: data,
                error: null
            })
        } catch (e) {
            if (e instanceof Error) {
                this.setState({
                    loading: false,
                    error: e.message
                })
            }
        }
    }


    render(): React.ReactNode {
        const {t} = this.props
        const {productList, loading, error} = this.state

        if (loading) {
            return (<Spin size={"large"} style={{
                marginTop: 20,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
            }}/>)
        }

        if (error) {
            return <div>网站出错了: {error}</div>
        }

        return (
            <>
                <HeaderClass/>
                {/*页面内容 content*/}
                <div className={styles['page-content']}>
                    <Row style={{marginTop: 20}}>
                        <Col span={6}>
                            <SideMenu/>
                        </Col>
                        <Col span={18}>
                            <Carousel/>
                        </Col>
                    </Row>

                    <ProductCollection
                        title={<Typography.Title level={3} type={'warning'}>{t("home_page.hot_recommended")}
                        </Typography.Title>} sideImage={sideImage} products={productList[0].touristRoutes}/>


                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="danger">
                                新品上市
                            </Typography.Title>
                        }
                        sideImage={sideImage2}
                        products={productList[1].touristRoutes}
                    />

                    <ProductCollection
                        title={
                            <Typography.Title level={3} type="success">
                                国内游推荐
                            </Typography.Title>
                        }
                        sideImage={sideImage3}
                        products={productList[2].touristRoutes}
                    />

                </div>
            </>
        );
    }
}


export const HomePage = withTranslation()(HomePageComponent)
