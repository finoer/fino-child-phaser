import { initPhaserGame } from "./game";
import { debugHelper, isWebglSupported } from "./utils";

 
if(isWebglSupported) {
    initPhaserGame()
}else {
    alert('您的设备不支持该应用, 请升级设备后尝试!') 
}

debugHelper()