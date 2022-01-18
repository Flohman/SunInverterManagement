let currentPower: number;
let lastPowerUpdate: number;
let stopLoop: boolean;

interface PowerSetting {
  lowerBound: number;
  upperBound: number;
  toggle: boolean;
  durationMs: number;
}

const powerSettings: Array<PowerSetting> = [
  {
    lowerBound: -99999,
    upperBound: -1000,
    toggle: false,
    durationMs: 256,
  },
  {
    lowerBound: -999,
    upperBound: -500,
    toggle: false,
    durationMs: 128,
  },
  {
    lowerBound: -499,
    upperBound: -200,
    toggle: false,
    durationMs: 64,
  },
  {
    lowerBound: -199,
    upperBound: -100,
    toggle: false,
    durationMs: 32,
  },
  {
    lowerBound: -99,
    upperBound: -1,
    toggle: false,
    durationMs: 16,
  },
  {
    lowerBound: 0,
    upperBound: 99,
    toggle: true,
    durationMs: 32,
  },
  {
    lowerBound: 100,
    upperBound: 199,
    toggle: true,
    durationMs: 64,
  },
  {
    lowerBound: 200,
    upperBound: 499,
    toggle: true,
    durationMs: 128,
  },
  {
    lowerBound: 500,
    upperBound: 999,
    toggle: true,
    durationMs: 256,
  },
  {
    lowerBound: 1000,
    upperBound: 99999,
    toggle: true,
    durationMs: 512,
  },
];

const wait = async (ms: number) => {
  console.log("Timeout: " + ms);
  return setTimeout(async function () {}, ms);
};

const controlInverterPower = async () => {
  lastPowerUpdate = currentPower;

  while (!stopLoop) {
    let powerSetting = powerSettings.find(
      (setting) =>
        setting.lowerBound < currentPower && setting.upperBound > currentPower
    );

    await setInverterStatus(powerSetting.toggle, powerSetting.durationMs);

    await holdPower();

    lastPowerUpdate = currentPower;
  }
};

const holdPower = async () => {
  while (lastPowerUpdate == currentPower) {
    await setInverterStatus(
      currentPower >= 0 ? false : true,
      currentPower >= 0 ? 16 : 32
    );
    await setInverterStatus(
      currentPower >= 0 ? true : false,
      currentPower >= 0 ? 32 : 16
    );
  }
};

const setInverterStatus = async (toggle: boolean, durationMs: number) => {
  if (lastPowerUpdate == currentPower) {
    //setState("rpi2.0.gpio.4.state"/*GPIO 4*/, toggle );
    await wait(durationMs);
  }
};

(async () => {
  console.log("Start");
  let i = 0;
  while (i < 5) {
    i++;
    // const response = await axios.get('http://192.168.178.82/solar_api/v1/GetPowerFlowRealtimeData.fcgi');
    // const responseData = <FroniusResponse>(response.response.data);
    await wait(311);

    console.log("data fetched");
    if (i == 1) {
      currentPower = 1030;
      controlInverterPower();
    } else if (i == 2) {
      currentPower = 515;
    } else if (i == 3) {
      currentPower = 250;
    } else if (i == 4) {
      currentPower = 120;
    } else if (i == 5) {
      currentPower = 60;
    }
    // setState("0_userdata.0.CurrentTotalPower"/*CurrentTotalPower*/, response.data.Body.Data.Site.P_Grid);
    //response.data.Body.Data.Site.P_PV ? setState("0_userdata.0.PVPower"/*PVPower*/, response.data.Body.Data.Site.P_PV) : setState("0_userdata.0.PVPower"/*PVPower*/, 0 );
    await wait(100);
    //  currentPower = 3;
  }
  stopLoop = true;
  currentPower = 999999;
  // setState("rpi2.0.gpio.4.state"/*GPIO 4*/, false);
})();
