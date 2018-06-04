const { smarthome } = require('actions-on-google');

const homeApp = smarthome({
  key: ''
});

homeApp.onSync(body => {
  //need to pass the requestID back in response
  const response = {
    requestId: req.body.requestId,
    payload: {
      devices: [
        {
          id: 'lights',
          type: 'action.devices.types.LIGHT',
          traits: ['action.devices.traits.OnOff'],
          name: {
            name: 'lights'
          },
          willReportState: false
        }
      ]
    }
  };
});

module.exports = homeApp;
