'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import web3 from './web3';
// import CampaignFactory from './build/CampaignFactory.json';
//
// const instance = new web3.eth.Contract(
//   JSON.parse(CampaignFactory.interface),
//   '0x96716213e699018c1151CdCdebd9b221a3Dd1F66'
// );
//
// export default instance;

var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), '0x96716213e699018c1151CdCdebd9b221a3Dd1F66');

exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeSIsImluc3RhbmNlIiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVVBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXFCOzs7Ozs7QUFYNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUtBLElBQU0sV0FBVyxJQUFJLGNBQUEsQUFBSyxJQUFULEFBQWEsU0FDNUIsS0FBQSxBQUFLLE1BQU0sMEJBREksQUFDZixBQUEyQixZQUQ3QixBQUFpQixBQUVmLEFBR0Y7O2tCQUFBLEFBQWUiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYmFydG9zemJpbGVqY3p5ay9EZXNrdG9wL2Jsb2NrY2hhaW4vQ3Jvd2RNb25leSJ9