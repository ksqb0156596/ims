/**
 * Created by Administrator on 2016/10/3.
 */
var React = require('react');

import { Button } from 'antd';
import { Modal } from 'antd';
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;
var _Upload = React.createClass({
    render : function () {
        return <Modal
            title="上传Excel" visible={this.props.visible}
            footer={[
            <Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>取消</Button>,
          ]}
        >
            <Dragger {...this.props.upload}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此进行上传</p>
                <p className="ant-upload-hint">请使用指定模板进行订单上传</p>
            </Dragger>
            <a href="../../../files/importExcel.xls">点击此处下载Excel模板</a>
        </Modal>
    },

});
module.exports = _Upload;
