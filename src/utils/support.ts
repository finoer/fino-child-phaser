export const isWebglSupported = getWebglSupported();


function getWebglSupported() {
    const canvas = document.createElement('canvas');

    const context = create3DContext(canvas)

    return context || false
}

function create3DContext(canvas: HTMLCanvasElement, attrs?: any) {
    const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl']

    let context;

    for(let i = 0; i < names.length; i++ ) {
        try {
            context = canvas.getContext(names[i], attrs)
        }catch {

        }

        if(context) {
            break
        }
    }

    return context
}