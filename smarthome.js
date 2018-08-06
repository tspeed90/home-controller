const { smarthome } = require('actions-on-google');
let rpi433 = require('rpi-433');

let remoteEmitter = rpi433.emitter({ pin: 22 });
const LIGHT_ON_CODE = 6277231;
const LIGHT_OFF_CODE = 6277230;

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
  const isOn = body.inputs[0].payload.commands[0].execution[0].params.on;

  remoteEmitter.sendCode(isOn ? LIGHT_ON_CODE : LIGHT_OFF_CODE);

  const response = {
    requestID: body.requestId,
    payload: {
      commands: [
        {
          ids: ['lights'],
          status: 'SUCCESS',
          states: {
            on: isOn
          }
        }
      ]
    }
  };
  return response;
});
module.exports = homeApp;
