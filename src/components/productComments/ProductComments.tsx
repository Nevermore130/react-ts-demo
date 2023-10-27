import {Comment, List} from "antd";

interface PropsType {
    data: {
        author: string,
        avatar: string,
        content: string,
        createDate: string
    }[]
}


export const ProductComments: React.FC<PropsType> = ({data}) => {
    return (
        <div>
            <List
                dataSource={data}
                itemLayout={"horizontal"}
                renderItem={(item) => {
                    return (
                        <li>
                            <Comment author={item.author} content={item.content} avatar={item.avatar}
                                     datetime={item.createDate}></Comment>
                        </li>
                    )
                }}
            >
            </List>
        </div>
    )
}
