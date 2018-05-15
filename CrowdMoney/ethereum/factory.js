// import web3 from './web3';
// import CampaignFactory from './build/CampaignFactory.json';
//
// const instance = new web3.eth.Contract(
//   JSON.parse(CampaignFactory.interface),
//   '0x96716213e699018c1151CdCdebd9b221a3Dd1F66'
// );
//
// export default instance;

import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x96716213e699018c1151CdCdebd9b221a3Dd1F66'
);

export default instance;
