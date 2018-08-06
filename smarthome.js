const { smarthome } = require('actions-on-google');

const homeApp = smarthome({
  key: ''
});

homeApp.onSync(body => {
  //need to pass the requestID back in response
  const response = {
    requestId: body.requestId,
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

  return response;
});

homeApp.onExecute(body => {
  console.log(body.inputs[0].payload.commands[0].execution[0].params.on);
  const response = {
    requestID: body.requestId,
    payload: {
      commands: [
        {
          ids: ['lights'],
          status: 'SUCCESS',
          states: {
            on: body.inputs[0].payload.commands[0].execution[0].params.on
          }
        }
      ]
    }
  };
  return response;
});
module.exports = homeApp;
