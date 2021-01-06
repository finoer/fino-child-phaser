import { screenWidth, screenHeight, resolution } from '../utils'
// 是否过渡入场
let isTransitionIn = false
// 是否过渡出场
let isTransitionOut = false
// 是否渐变出场
let isFadeOut = false
// 是否渐现入场
let isFadeIn = false

interface ConfigType {
    [props: string]: any
}



class Router{
    public scene: Phaser.Scene
    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.enter()
        this.leave()
    }

    push(nextSceneName: string, data: ConfigType = {}) {
        window.__current_scene_name__ = nextSceneName
        isTransitionIn = data.isTransitionIn || false
        isTransitionOut = data.isTransitonOut || false
        isFadeIn = data.isFadeIn || false
        isFadeOut = data.isFadeOut || false;

        (this as any).scene.transition({
            // 下一个场景的key
            target: nextSceneName,
            // 是否在下面移动
            moveBelow: false,
            // 过渡时间
            duration: 300,
            // 传递给下一个场景的数据
            data,
        })
    }

    // 
    enter() {
        this.scene.events.on('transitionstart', () => {
            // console.warn('transitionstart')
            if (isFadeIn) {
              this.scene.tweens.add({
                targets: this.scene.cameras.main,
                alpha: {
                  from: 0,
                  to: 1,
                },
                duration: 500,
                onCompleteScope: this,
                onComplete: () => {
      
                }
              })
            } else if (isTransitionIn) {
              this.scene.cameras.main.x = screenWidth * resolution
              this.scene.tweens.add({
                targets: this.scene.cameras.main,
                x: 0,
                y: 0,
                duration: 500,
                onCompleteScope: this,
                onComplete: () => {
      
                }
              })
            }
          })
    }

    leave() {
        // @ts-ignore
        this.scene.dispose && this.scene.dispose()
        if (isFadeOut) {
            this.scene.tweens.add({
            targets: this.scene.cameras.main,
            duration: 500,
            onCompleteScope: this,
            onComplete: () => {
  
            }
          })
        } else if (isTransitionOut) {
            this.scene.tweens.add({
            targets: this.scene.cameras.main,
            x: screenWidth * resolution,
            y: 0,
            duration: 500,
            onCompleteScope: this,
            onComplete: () => {
            }
          })
        }
    }
}

export default Router 