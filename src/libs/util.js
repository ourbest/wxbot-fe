import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - 机器人管理' : '机器人管理';
    window.document.title = title;
};

export default util;