class DeviceIdentifier {
    constructor() {
        this._userAgent = navigator.userAgent || "";
        this._platform = navigator.platform || "";
    }

    get isAndroid() {
        return /android/i.test(this._userAgent);
    }

    get isIos() {
        return /iPad|iPhone|iPod/.test(this._platform);
    }

    get isMobile() {
        return /android|iphone|kindle|ipad/i.test(this._userAgent);
    }

    get isDesktop() {
        return !this.isMobile
    }
}
let deviceIdentifier = new DeviceIdentifier();
    
let iosInterface = (window.webkit ? window.webkit.messageHandlers : {}); 

export function sendGetGroupsRequest() {
    console.log(deviceIdentifier.isIos)
    //if(deviceIdentifier.isIos){
        console.log('entered')
        iosInterface.sendGetGroupsRequest && iosInterface.sendGetGroupsRequest.postMessage("");
        intializeGlobalVariable()
    //}
}

export function intializeGlobalVariable(){
    console.log(window)
    window??  Object.defineProperties(window, {
        getGroupsResponse: {
            get: () => getGroupsResponse,
        }
    })
}

function getGroupsResponse(response){
    console.log(response)
}