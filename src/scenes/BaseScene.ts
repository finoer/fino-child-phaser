import Router from "../router"
import { designWidth, designHeight, resolution, screenWidth, screenHeight } from "../utils"


const designRatio = designWidth / designHeight

console.warn('screenWidth', screenWidth)
console.warn('screenHeight', screenHeight)

// 创建路由， 构建背景，适配规则等
class BaseScene extends Phaser.Scene {
    // 路由
    protected router?: Router
    // 适配缩放比例
    protected zoom: number = 0;
    // 背景坐标与尺寸
    public background = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
    }

    constructor(sceneName: string, isDebug = false) {
        super({ key: sceneName })
    }

    /**
     * lifecircle of create
     */
    private create() {
        debugger
        this.sound.pauseOnBlur = false;
        this.fitScreen()
        this.events.on('destroy', this.dispose, this)
        this.router = new Router(this)
        this.build()
    }

    /**
     * lifecircle of destory
     */
    private dispose() {}

    public build() {}

    /**
     * 屏幕适配
     */
    protected fitScreen() {
        const viewRatio = screenWidth / screenHeight;
        let scrollX = 0
        let scrollY = 0

        if (designRatio > viewRatio) {
            console.warn('以宽为基准做缩放, 内容区域在垂直方向中间, 水平方向占满屏幕')
            this.zoom = screenWidth / designWidth
            const left = 0
            const right = designWidth
            const top = -(screenHeight / this.zoom - designHeight) / 2
            const bottom = top + screenHeight / this.zoom
            this.background = {
                top,
                right,
                bottom,
                left,
                width: designWidth,
                height: screenHeight / this.zoom,
            }
            scrollY = -(screenHeight - this.zoom * designHeight) / 2
        } else {
            console.warn('以高为基准做缩放, 内容区域在水平方向中间, 垂直方向占满屏幕')
            this.zoom = screenHeight / designHeight
            const top = 0
            const bottom = designHeight
            const left = -(screenWidth / this.zoom - designWidth) / 2
            const right = left + screenWidth
            this.background = {
                top,
                right,
                bottom,
                left,
                width: screenWidth / this.zoom,
                height: designHeight,
            }
            scrollX = -(screenWidth - this.zoom * designWidth) / 2 / this.zoom
        }

        this.cameras.main.setOrigin(0, 0)
        this.cameras.main.setScroll(scrollX, scrollY)
        this.cameras.main.setSize(screenWidth * resolution, screenHeight * resolution)
        this.cameras.main.setZoom(this.zoom * resolution)

        // 构建内容区域和背景区域
        this.buildBackground()
    }

    /**
     * 构建内容区域和背景区域
     */
    private buildBackground() {
        const background = this.add.graphics({lineStyle: { color: 0xff0000, width: 5 }});
        background.strokeRect(this.background.left, this.background.top, screenWidth / this.zoom, screenHeight / this.zoom);
        background.setDepth(10)

        const content = this.add.graphics({lineStyle: { color: 0x0000ff, width: 5 }})
        content.strokeRect(0, 0, designWidth, designHeight);
        content.setDepth(10)
    }
}

export default BaseScene
